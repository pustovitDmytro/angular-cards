'use strict';
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    rigger = require("gulp-rigger"),
    prefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin');

var path = {
    build: {
        html: 'build/',
        js: 'build/js/',
        css: 'build/css/',
        img: 'build/img/',
        fonts: 'build/fonts/'
    },
    src:{
        html:'src/*.html',
        js: 'src/js/main.js',
        style: 'src/style/main.scss',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    libs:{        
        js: 'src/js/libs/**/*.js',
        css: 'src/style/libs/libs.scss'
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/style/**/*.*',
        img: 'src/img/**/*.*',
        fonts: 'src/fonts/**/*.*'
    },
    clean: 'build'
};

gulp.task('js-lib', function() {
        return gulp.src(path.libs.js)
            .pipe(concat('libs.min.js'))
            .pipe(uglify())
            .pipe(gulp.dest(path.build.js));
});

gulp.task('js', function() {
        return gulp.src(path.src.js)
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

gulp.task('watch',function(){
    gulp.watch(path.watch.style,['sass']);
    gulp.watch(path.watch.js,['js']);
    gulp.watch(path.watch.html,['html']);
    gulp.watch(path.watch.img,['img']);
});

gulp.task('build', ['img', 'sass', 'js', 'html', 'js-lib','css-lib']);

gulp.task('default',['build','watch']);