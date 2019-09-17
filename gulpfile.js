"use strict";

let gulp = require("gulp");
let plumber = require("gulp-plumber");
let sourcemap = require("gulp-sourcemaps");
let rename = require("gulp-rename");
let sass = require("gulp-sass");
let postcss = require("gulp-postcss");
let autoprefixer = require("autoprefixer");
let csso = require("gulp-csso");
let terser = require("gulp-terser");
let server = require("browser-sync").create();
let imagemin = require("gulp-imagemin");
let webp = require("gulp-webp");
let del = require("del");

gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("source/css"))
    .pipe(gulp.dest("build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("source/css"))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});

gulp.task("js", function () {
  return gulp.src("source/js/script.js")
    .pipe(sourcemap.init())
    .pipe(terser())
    .pipe(rename("script.min.js"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/js"))
    .pipe(server.stream());
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.scss", gulp.series("css"));
  gulp.watch("source/js/*.js", gulp.series("js"));
  gulp.watch(("source/*.html"), gulp.series("html", "refresh"));
});

gulp.task("html", function () {
    return gulp.src("source/*.html")
        .pipe(gulp.dest("build"));
});


gulp.task("images", function () {
  return gulp.src("source/img/*.{png,svg}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest("source/img"));
});

gulp.task("webp", function () {
  return gulp.src("source/img/*.{png}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("source/img"));
});

gulp.task("copy", function() {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/js/*.js",
    "source/css/*.css",
    "source/*.html"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("build", gulp.series(
  "clean",
  "copy",
  "css",
  "js"
));

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

gulp.task("start", gulp.series(
  "clean",
  "copy",
  "css",
  "js",
  "server"
));
