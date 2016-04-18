var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({
    	scope: ['dependencies', 'devDependencies', 'peerDependencies'],
    	rename: {
    		"gulp-sass": "sass",
    		"gulp-watch": "watch",
            "browser-sync": "browser",
            "gulp-util": "gutil"
    	}
    }),
    browse = require("browser-sync"),
    googleCdn = require("gulp-google-cdn");

var buildFolder = 'build/',
    path = {
        build: { 
            root: buildFolder,
            html: buildFolder,
            files: buildFolder + 'files/',
            js: buildFolder + 'js/',
            img: buildFolder + 'images/',
            video: buildFolder + 'video/',
            css: buildFolder + 'css/',
            fonts: buildFolder + 'fonts/',
            main: buildFolder + 'index.html'
        },
        src: { 
            html: ['src/**/*.html'], 
            css: 'src/css/',
            files: 'src/files/*.*',
            style: 'src/css/main.scss',
            img: 'src/images/*.*',
            video: 'src/video/*.*',
            sprite: 'src/images/sprite/*.*',
            js: 'src/js/**/*.*',
            fonts: 'src/fonts/**/*.*'
        },
        watch: { 
            html: ['src/**/*.html'], 
            style: ['src/css/*-custom.*', 'src/css/_custom*'],
            files: 'src/files/*.*',
            img: 'src/images/*.*',
            sprite: 'src/sprite/*.*',
            js: 'src/js/**/*.*',
            fonts: 'src/fonts/**/*.*'
        }
    },
    config = {
        server: {
            baseDir: buildFolder
        },
        tunnel: false,
        host: 'localhost',
        port: 9000,
        open:  false
    };

gulp.task('style:build', function () {
    //makeSprite();

    gulp.src(path.src.style) 
        .pipe(plugins.sass())
        .pipe(gulp.dest(path.build.css));
});

gulp.task('image:build', function () {
    gulp.src(path.src.img) 
        .pipe(gulp.dest(path.build.img));
});

gulp.task('files:build', function () {
    gulp.src(path.src.files) 
        .pipe(gulp.dest(path.build.files));
});

gulp.task('video:build', function () {
    gulp.src(path.src.video) 
        .pipe(gulp.dest(path.build.video));
});

gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(gulp.dest(path.build.html));
});

gulp.task('cdn', function () {
    gulp.src(path.build.main)
        .pipe(googleCdn('bower.json'))
        .pipe(gulp.dest(path.build.root));
});

gulp.task('js:build', function() {
    gulp.src(path.src.js)
        .pipe(gulp.dest(path.build.js))
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

gulp.task('watch', function(){
    for(var watchPath in path.watch) {
        plugins.watch(path.watch[watchPath], function(event, cb) {
            gulp.start('build');
            gulp.start('browse:reload');
        });
    }
});

gulp.task('clean', function (cb) {
    return gulp.src(path.build.root + '*')
            .pipe(plugins.clean());
});

gulp.task('browse', function () {
    browse(config);
});

gulp.task('browse:reload', function () {
    browse.reload({stream: true});
});

gulp.task('build', [
    'style:build',
    'image:build',
    'js:build',
    'html:build'
]);

gulp.task('default', ['build', 'browse', 'watch']);
