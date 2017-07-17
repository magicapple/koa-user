/**
 * Created by jin on 7/17/17.
 */



var gulp         = require('gulp');
var runSequence  = require('run-sequence');
var spritesmith  = require('gulp.spritesmith');
var sass         = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleanCss     = require('gulp-clean-css');
var rev          = require('gulp-rev');



var sourcePath = {
    'docs'          : '../backend/docs/*.html',
    'module'        : 'node_modules/bootstrap/**/*',
    'module2'       : 'node_modules/font-awesome/**/*',
    'html'          : 'src/app/page/**/*.html',
    'images'        : 'src/assets/**/*',
    'imagesSprites' : 'src/assets/sprite/icon/**/*',
    'scss'          : 'src/sass/**/*.scss',
    'css'           : 'css'
};

var distPath = {
    'docs'                             : './static/docs/',
    'module'                           : './static/node_modules/bootstrap/',
    'module2'                          : './static/node_modules/font-awesome/',
    'html'                             : './static/resources/templates/web',
    'images'                           : './static/assets/',
    'imagesSprites'                    : './static/assets/sprite/auto-sprite.png',
    'imagesSpritesOutputReferringPath' : '/static/assets/sprite/auto-sprite.png',
    'imagesSpritesCssOutput'           : './static/css/helpers/_auto_sprite.scss',
    'css'                              : './static/css/',
    'manifest'                         : './static/rev/'
};

