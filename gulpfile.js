var     postcss = require('gulp-postcss'),
        gulp = require('gulp'),
        browserSync = require('browser-sync'),
        autoprefixer = require('autoprefixer-core'),
        csswring = require('csswring'),
        atImport = require("postcss-import"),
        cssnext = require("cssnext"),
        concat = require("gulp-concat"),
        uglify = require("gulp-uglify"),
        imagemin = require('gulp-imagemin');

var jsFiles =  [
    'bower_components/jquery/dist/jquery.js',
    'bower_components/bootstrap/dist/js/bootstrap.js',
    'bower_components/classie/classie.js',
    'bower_components/jquery-easing/jquery.easing.js',
    'src/js/main.js'
];


// CSS
gulp.task('css', function () {
    var processors = [
        atImport,
        cssnext,
        autoprefixer({browsers: ['last 2 version', 'safari 5', 'ie 9', 'ios 6', 'android 4']}),
        csswring({map: true, removeAllComments: true})
    ];
    return gulp.src('./src/css/main.css')
        .pipe(postcss(processors))
        .pipe(gulp.dest('./dist/css'));
});

// JS
gulp.task('js', function() {
    return gulp.src(jsFiles)
        .pipe(concat('main.js'))
        //.pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

// HTML
gulp.task('html', function (){
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist/'));
});

// IMG
gulp.task('imagemin', function() {
    return gulp.src(['src/img/*.jpg', 'src/img/*.gif', 'src/img/*.png', 'src/img/*.svg'])
        //.pipe(changed('dist/img'))
        .pipe(imagemin({
            optimizationLevel: 5,
            svgoPlugins: [{removeViewBox: false}]
        }))
        .pipe(gulp.dest('dist/img'));
});

// Data

// Watch
gulp.task('watch', function () {
    gulp.watch(['./src/**/*.html'], ['html']);
    gulp.watch(['./src/css/**/*.css'], ['css']);
    gulp.watch('src/js/**/*.js', ['js']);
});

// Web server
gulp.task('browser-sync', function() {
    browserSync(['./dist/**/*.css', './dist/**/*.js', './dist/**/*.html'], {
        server: {
            baseDir: "./dist"
        }
    });
});


// tasks
gulp.task('default', ['css', 'js', 'html', 'watch', 'browser-sync']);
