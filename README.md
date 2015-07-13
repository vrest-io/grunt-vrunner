# grunt-vrunner

> Runs vREST test cases.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-vrunner --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-vrunner');
```

## The "vrunner" task

### Overview
In your project's Gruntfile, add a section named `vrunner` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  vrunner: {
    options: {
      credentials : {
        email : "<vREST LOGIN EMAIL ID>",
        password : "<vREST LOGIN PASSWORD>"
      },
      url: "<vREST TESTCASE LIST URL>"
    }
  },
});
```

### Options

#### options.credentials.email
Type: `String`

Email ID through which you have registered on vREST

#### options.credentials.password
Type: `String`

Password for your vREST account

#### options.url
Type: `String`

Provide the test case list URL here. You can copy the test case list URL by going to your vREST instance and select Test Cases tab. Now click on "Copy Current Test Case List URL" button in the left hand side and copy the selected URL and paste the URL in this option.