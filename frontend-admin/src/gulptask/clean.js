/**
 * Created by jin on 7/17/17.
 */



const gulp = require('gulp');
const del = require( 'del');


const distPath = {
    'distAll'  : '../dist',
    'htmlTemplate'  : '../dist',

    'stylesheets' : './css/stylesheets/**/*',
    'autoSprite' : './css/images/sprite/auto-sprite.*',

    'tsCompileToJs' : './.awcache/**/*',
    'tsCompileJsBuild' : './jsoutput-temp-prodution/**/*',
    'tsSourceWithHtmlTpl' : './tssource-temp-prodution/**/*'

};

gulp.task('clean', function() {
    del.sync([
        distPath.distAll,
        distPath.stylesheets,
        distPath.autoSprite,
        distPath.tsCompileToJs

    ], {force:true});
});



