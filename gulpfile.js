'use strict';
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    rigger = require("gulp-rigger"),
    prefixer = require('gulp-autoprefixer'),
    del = require('del'),
    imagemin = require('gulp-imagemin');

var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/',
        data: 'build/data/'
    },
    src:{
        html:'src/*.html',
        js: 'src/js/main.js',
        style: 'src/style/main.*',
        img: 'src/img/**/*.*',
        data: 'src/data/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    libs:{        
        js: 'src/js/libs/libs.js',
        css: 'src/style/libs/libs.*'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.*',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*',
        data: 'src/data/**/*.*'
    },
    clean: './build'
};

gulp.task('js-lib', function() {
    gulp.src(path.libs.js)
    .pipe(rigger())
    .pipe(gulp.dest(path.build.js));
});

gulp.task('js', function() {
    gulp.src(path.src.js)
    .pipe(rigger())
    .pipe(gulp.dest(path.build.js));
});

gulp.task('sass',function(){
    gulp.src(path.src.style)
        .pipe(sass().on('error',sass.logError))
        .pipe(prefixer())
        .pipe(gulp.dest(path.build.css));
});

gulp.task('css-lib',function(){
    gulp.src(path.libs.css)
        .pipe(sass().on('error',sass.logError))
        .pipe(gulp.dest(path.build.css));
});

gulp.task('html',function(){
    gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
});

gulp.task('img', function () {
    gulp.src(path.src.img) 
        .pipe(imagemin())
        .pipe(gulp.dest(path.build.img))
});

gulp.task('data',function(){
    gulp.src(path.src.data)
        .pipe(gulp.dest(path.build.data))
});

gulp.task('watch',function(){
    gulp.watch(path.watch.style,['sass']);
    gulp.watch(path.watch.js,['js']);
    gulp.watch(path.watch.html,['html']);
    gulp.watch(path.watch.img,['img']);
    gulp.watch(path.libs.js,['js-lib']);
    gulp.watch(path.libs.css,['css-lib']);
    gulp.watch(path.watch.data,['data']);
});



gulp.task('clean', function () {
  return del([path.clean]);
});

gulp.task('build', ['img', 'sass', 'js', 'html', 'js-lib','css-lib','data']);

gulp.task('default',['clean','build','watch']);