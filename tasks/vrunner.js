/*
 * grunt-vrunner
 * http://vrest.io
 *
 * Copyright (c) 2015 vREST Team
 * Licensed under the MIT license.
 */

'use strict';

var vrunner = require('vrunner'), chalk = require('chalk');

module.exports = function(grunt) {

  grunt.registerTask('vrunner', 'Runs vREST test cases.', function() {
    var done = this.async();
    var over = function(err,dontExit){
      if(!err) err = 'An unknown glitch found.';
      if(!Array.isArray(err)) err = [err];
      err.forEach(function(error){
        console.log(error);
      });
      if(!dontExit) done();
    };
    var options = this.options();
    var Runner = (new vrunner(options));
    Runner.run(function(err,report,remarks){
      if(err) over(err);
      else {
        grunt.log.ok('EXECUTION OF ALL TEST CASES SUCCESSFULLY COMPLETED.');
        console.log(remarks,report);
        done();
      }
    });
    Runner.on('testcase',function(pass,tc,trtc){
      if(pass){
        grunt.log.writeln(tc.method+' --> '+tc.url+' --> '+chalk.green('PASSED'));
      } else if(pass === false){
        grunt.log.writeln(tc.method+' --> '+tc.url+' --> '+chalk.red.bold('FAILED'));
      } else {
        grunt.log.writeln(tc.method+' --> '+tc.url+' --> '+chalk.cyan('NOT_EXECUTED'));
      }
    });
    Runner.on('error',function(err){
      grunt.log.error();
      over(err);
    });
    Runner.on('warning',function(warning){
      console.log(chalk.yellow('WARNING'));
      over(warning,true);
    });
  });
};
