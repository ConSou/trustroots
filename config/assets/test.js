'use strict';

var _ = require('lodash'),
    path = require('path'),
    defaultAssets = require(path.resolve('./config/assets/default'));

module.exports = {
  // Override any default asset blocks here or add new blocks
  client: {
    lib: {
      uibModuleTemplates: defaultAssets.client.lib.uibModuleTemplates,
      css: defaultAssets.client.lib.css,
      js: _.union(defaultAssets.client.lib.js, [
        'testutils/angulartics-null.testutil.js'
      ]),
      less: defaultAssets.client.lib.less,
      tests: defaultAssets.client.lib.tests
    },
    less: defaultAssets.client.less,
    js: defaultAssets.client.js,
    views: defaultAssets.client.views
  },
  tests: {
    client: ['modules/*/tests/client/**/*.js'],
    server: ['modules/*/tests/server/**/*.js']
  }
};
