/*
 * grunt-vrunner
 * http://vrest.io
 *
 * Copyright (c) 2015 vREST Team
 * Check license file for full license details
 */

'use strict';

var vrunner = require('vrunner'), 
    chalk = require('chalk');

module.exports = function(grunt) {

  //adds right side padding
  var rpad = function(str, totalSize, padChar){

    if(!padChar) padChar = ' ';
    if(str.length >= totalSize) return str;
    else {
      for(var i = str.length; i < totalSize; i++){
        str += padChar;
      }
      return str;
    }
  };

  var getMethodName = function(method){

    if(method === "GET") return chalk.blue.bold(method) + '    ';
    else if(method === "POST") return chalk.bold(method) + '   ';
    else if(method === "PUT") return chalk.green.bold(method) + '    ';
    else if(method === "PATCH") return chalk.magenta.bold(method) + '  ';
    else if(method === "DELETE") return chalk.red.bold(method) + ' ';
    else return chalk.bold(method) + ' ';
  };

  grunt.registerTask('vrunner', 'Runs vREST test cases.', function() {

    var done = this.async();
    var over = function(err, dontExit){
      if(!err) err = 'An unknown glitch found.';
      if(!Array.isArray(err)) err = [err];
      err.forEach(function(error){
        console.log(error);
      });
      if(!dontExit) done();
      grunt.fail.warn(new Error(err));
    };
    
    var options = this.options(),
        index = 1, totalTime = 0, startTime = (new Date()).getTime();

    var Runner = (new vrunner(options));

    Runner.run(function(err, report, remarks){

      if(err) over(err);
      else {
        console.log(remarks, report);
        //console.log("Total Execution Time: " + totalTime);
        console.log("Total Time: " + ((new Date()).getTime() - startTime) + 'ms');
        if(report.failed) over('Some of the test cases have failed.');
        else done();
      }
    });

    
    Runner.on('testcase', function(pass, tc, trtc){

      var prefix = rpad(index + '.', 5) + getMethodName(tc.method);
      index++;
      totalTime += trtc.executionTime;
      if(pass){
        grunt.log.writeln(prefix + chalk.green.bold(tc.summary || tc.url) + ' (' + trtc.executionTime + 'ms) ');
      } else if(pass === false){
        grunt.log.writeln(prefix + chalk.red.bold(tc.summary || tc.url) + ' (' + trtc.executionTime + 'ms) ');
      } else {
        grunt.log.writeln(prefix + chalk.cyan.bold('[Not Executed] ' + (tc.summary || tc.url)) + ' (' + trtc.executionTime + 'ms) ');
      }
    });

    Runner.on('error', function(err){

      grunt.log.error();
      over(err);
    });

    Runner.on('log', function(message, level){

      if(!level) level = 'info';
      message = '>> ' + message;
      if(level === 'error') message = chalk.red.bold(message);
      else message = chalk.blue.bold(message);
      console.log(message);
    });

    Runner.on('warning', function(warning){
      //console.log(chalk.yellow('WARNING'));
      //over(warning, true);
    });
  });
};
