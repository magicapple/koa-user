/**
 * Created by jin on 7/17/17.
 */



const gulp         = require('gulp');
const sass         = require('gulp-sass');
const spritesmith  = require('gulp.spritesmith');
const autoprefixer = require('gulp-autoprefixer');
const optimizerCss = require('gulp-clean-css');
const rev          = require('gulp-rev');



const sourcePath = {
    'htmlTemplate'  : '../../backend/src/views/src/**/*',
    'images'        : 'css/images/**/*',
    'imagesSprites' : 'css/images/sprite/icon/**/*',
    'scss'          : 'css/sass/**/*.scss',
    'css'           : 'css/stylesheets'
};

const distPath = {
    'htmlTemplate'                     : '../../backend/src/views/dist/',
    'images'                           : '../dist/css/images/',

    'imagesSprites'                    : 'css/images/sprite/auto-sprite.png',
    'imagesSpritesCssOutput'           : 'css/scss/helpers/_auto_sprite.scss',
    'imagesSpritesOutputReferringPath' : '/static/css/images/sprite/auto-sprite.png',
    'css'                              : '../dist/static/css/stylesheets/',
    'manifest'                         : '../dist/static/rev/'
};




// Html Views
gulp.task('htmlTemplate', function() {
    gulp.src(sourcePath.htmlTemplate)
        .pipe(gulp.dest(distPath.htmlTemplate))
});


// Optimize images
gulp.task('images', function() {
    gulp.src(sourcePath.images)
        .pipe(gulp.dest(distPath.images))
});



gulp.task('sprite', function () {
    var spriteData = gulp.src(sourcePath.imagesSprites).pipe(spritesmith({
        imgName:  distPath.imagesSprites ,
        imgPath: distPath.imagesSpritesOutputReferringPath,
        cssName:  distPath.imagesSpritesCssOutput ,
        cssFormat:  'scss',
        algorithm : 'alt-diagonal',
        padding: 20
    }));
    return spriteData.pipe(gulp.dest(''));
});


// Compile css and automatically prefix stylesheets
gulp.task('sass', [ 'images' ], function() {
    gulp.src(sourcePath.scss)
        .pipe(sass({
            precision       : 10,
            outputStyle     : 'compressed',
            errLogToConsole : true
        }).on('error', sass.logError))
        // .pipe(autoprefixer({
        //     browsers: ['> 5%', 'Last 2 versions'],
        //     cascade: true, //是否美化属性值 默认：true 像这样：
        //     //-webkit-transform: rotate(45deg);
        //     //        transform: rotate(45deg);
        //     remove:true //是否去掉不必要的前缀 默认：true
        // }))
        //.pipe(cleanCss({compatibility: 'ie8'}))
        .pipe(gulp.dest(distPath.css))
});



gulp.task('sass-production', [ 'sprite'], function(done) {

    runSequence('images', function() {
        gulp.src(sourcePath.scss)
            .pipe(sass({
                precision       : 10,
                outputStyle     : 'compressed',
                errLogToConsole : true
            }).on('error', sass.logError))
            // .pipe(autoprefixer({
            //     browsers: ['> 5%', 'Last 2 versions'],
            //     cascade: false
            // }))
            //.pipe(cleanCss({compatibility: 'ie8'}))
            .pipe(rev())
            .pipe(gulp.dest(distPath.css))
            .pipe(rev.manifest('rev-manifest-css.json'))
            .pipe(gulp.dest(distPath.manifest) );
        done();
    });

});



gulp.task('watchSass', ['sass'], function() {
    gulp.watch(sourcePath.scss, ['sass']);
});


