/*
 * grunt-vrunner
 * http://vrest.io
 *
 * Copyright (c) 2015 vREST Team
 * Check license file for full license details
 */

'use strict';

var vrunner = require('vrunner');

module.exports = function(grunt) {

  grunt.registerTask('vrunner', 'Runs vREST test cases.', function() {
    var opts = this.options(), done = this.async();
    opts.exitOnDone = false;
    var Runner = new vrunner(opts);

    Runner.on('done',done);

    Runner.run();
  });
};
