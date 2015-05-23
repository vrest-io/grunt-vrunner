/*
 * grunt-vrunner
 * http://vrest.io
 *
 * Copyright (c) 2015 vREST Team
 * Licensed under the MIT license.
 */

'use strict';

var vrunner = require('vrunner');

module.exports = function(grunt) {

  grunt.registerTask('vrunner', 'Runs vREST test cases.', function() {
    var done = this.async();
    var over = function(err){
      if(!err) err = 'An unknown glitch found.';
      if(!Array.isArray(err)) err = [err];
      err.forEach(function(error){
        console.log(error);
      });
      done();
    };
    var options = this.options();
    (new vrunner(options)).run(function(err,report){
      if(err) over(err);
      else {
        grunt.log.ok('ALL TEST CASES SUCCESSFULLY COMPLETED.');
        console.log(report);
        done();
      }
    });
  });
};
