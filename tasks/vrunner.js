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
    var done = this.async(), Runner = new vrunner(this.options());

    Runner.on('over',function(err){
      if(typeof err !== 'string') err = JSON.stringify(err);
      grunt.fail.warn(new Error(err));
    });
    Runner.on('done',done);

    Runner.run();
  });
};
