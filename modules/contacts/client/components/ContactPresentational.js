import React from 'react';
import PropTypes from 'prop-types';
import { Trans, withTranslation } from 'react-i18next';
import Avatar from '@/modules/users/client/components/Avatar.component';

export function ContactPresentational({ t, className, contact, avatarSize=128, hideMeta=false, situation, onClickRemove }) {

  const { username, displayName, locationFrom, locationLiving } = contact.user;
  return (
    <div className={className}>
      <Avatar user={contact.user} size={avatarSize} />
      <h4>
        <a href={`/profile/${username}`}>{displayName}</a>
      </h4>
      {locationLiving && <div>
        <i className="icon-fw icon-building text-muted"></i>
        <small>
          <Trans locationLiving={locationLiving}>
            Lives in <a href={`/search?location=${locationLiving}`}>{{ locationLiving }}</a>
          </Trans>
        </small>
      </div>}
      {locationFrom && <div>
        <i className="icon-fw icon-home text-muted"></i>
        <small>
          <Trans locationFrom={locationFrom}>
            From <a href={`/search?location=${locationFrom}`}>{{ locationFrom }}</a>
          </Trans>
        </small>
      </div>}
      {!hideMeta && <small className="text-muted">
        {contact.confirmed === true && t('Since {{created, MMM D, YYYY}}', { created: new Date(contact.created) })}
        {contact.confirmed === false && t('Requested {{created, MMM D, YYYY}}', { created: new Date(contact.created) })}
      </small>}
      {/* Authenticated user requested this connection */}
      {situation === 'unconfirmedFromMe' && <div className="contact-confirm">
        <small className="text-warning"><em>{t('Contact request sent and pending.')}</em></small>
        <a className="btn btn-xs btn-primary" onClick={onClickRemove}>{t('Revoke Request')}</a>
      </div>}
      {/* Authenticated user received this request */}
      {situation === 'unconfirmedToMe' && <div className="contact-confirm">
        <small><em>{t('You received a contact request.')}</em></small>
        <a className="btn btn-xs btn-primary" href={`/contact-confirm/${contact._id}`}>
          {t('Confirm Request')}
        </a>
        <a className="btn btn-xs btn-warn" onClick={onClickRemove}>
          {t('Delete Request')}
        </a>
      </div>}
    </div>
  );
}

ContactPresentational.propTypes = {
  t: PropTypes.func.isRequired,
  className: PropTypes.string,
  contact: PropTypes.object.isRequired,
  avatarSize: PropTypes.number,
  situation: PropTypes.string.isRequired,
  hideMeta: PropTypes.bool,
  onClickRemove: PropTypes.func.isRequired
};

export default withTranslation('contact')(ContactPresentational);
