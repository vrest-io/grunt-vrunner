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
  
  //add right side padding
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
        //grunt.log.ok('EXECUTION OF ALL TEST CASES SUCCESSFULLY COMPLETED.');
        console.log(remarks,report);
        done();
      }
    });
    
    var index = 1;
    Runner.on('testcase',function(pass,tc,trtc){
      //console.log(trtc.);
      var prefix = rpad(index + '.', 5) + getMethodName(tc.method);
      index++;
      if(pass){
        grunt.log.writeln(prefix + chalk.green.bold(tc.summary || tc.url) + ' (' + trtc.executionTime + 'ms) ');
      } else if(pass === false){
        grunt.log.writeln(prefix + chalk.red.bold(tc.summary || tc.url) + ' (' + trtc.executionTime + 'ms) ');
      } else {
        grunt.log.writeln(prefix + chalk.cyan.bold('[Not Executed] ' + (tc.summary || tc.url)) + ' (' + trtc.executionTime + 'ms) ');
      }
    });
    
    Runner.on('error',function(err){
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

    Runner.on('warning',function(warning){
      //console.log(chalk.yellow('WARNING'));
      //over(warning,true);
    });
  });
};
