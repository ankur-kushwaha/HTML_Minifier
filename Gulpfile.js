'use strict';

var _ = require('lodash')
  , config = {}
  , gulp = require('gulp')
  , path = require('path')
  , $, key;

$ = require('gulp-load-plugins')({
  pattern: [
  'browser-sync',
  'del',
  'gulp-*',
  'karma',
  'main-bower-files',
  'multi-glob',
  'plato',
  'run-sequence',
  'streamqueue',
  'uglify-save-license',
  'wiredep',
  'yargs'
  ]
});

var config={};
config.buildDir="build/";
config.appDir="app";
config.appFontFiles = path.join(config.appDir, '**/*.+(eot|otf|svg|ttf|woff|woff2)');
config.appImageFiles = path.join(config.appDir, '**/*.+(jpg|png)');
config.appMarkupFiles = path.join(config.appDir, '**/*.html');
config.appScriptFiles = path.join(config.appDir, '**/*.js');
config.appStyleFiles = path.join(config.appDir, '**/*.css');

// delete build directory
  gulp.task('clean', function () {
    return $.del(config.buildDir);
  });
  
gulp.task('minify',['clean'],function(){
	  gulp.src(config.appMarkupFiles)
      .pipe($.htmlmin({collapseWhitespace: true, removeComments: true}))
      .pipe(gulp.dest(config.buildDir));
	  
	  gulp.src(config.appStyleFiles)
	  .pipe($.cssmin())
	  .pipe(gulp.dest(config.buildDir));   
	  
	  gulp.src(config.appScriptFiles)
      .pipe($.uglify({
        preserveComments: $.uglifySaveLicense
      }))
      .pipe(gulp.dest(config.buildDir));
	  
	  gulp.src(config.appImageFiles)
      .pipe($.imagemin())
      .pipe(gulp.dest(config.buildDir));   
	  
	 return gulp.src(config.appFontFiles)
      .pipe(gulp.dest(config.buildDir));
	  
  })

gulp.task('default', ['dev']);
