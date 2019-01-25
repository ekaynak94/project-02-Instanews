const gulp = require("gulp"),
  terser = require("gulp-terser"),
  rename = require("gulp-rename"),
  uglifycss = require("gulp-uglifycss"),
  browserSync = require("browser-sync").create(),
  eslint = require("gulp-eslint"),
  sass = require("gulp-sass"),
  autoprefixer = require("gulp-autoprefixer"),
  prettyError = require("gulp-prettyerror");

//saves a minimized js file in build directory after linting
gulp.task("min-js", function() {
  return gulp
    .src("./js/*.js")
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(terser())
    .pipe(rename({ extname: ".min.js" }))
    .pipe(gulp.dest("./build/js"));
});

//compiles scss files and saves a minimized css file in build directory
gulp.task("min-css", function() {
  return gulp
    .src("./sass/*scss")
    .pipe(prettyError())
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"]
      })
    )
    .pipe(uglifycss())
    .pipe(rename({ extname: ".min.css" }))
    .pipe(gulp.dest("./build/css"));
});

//watches for changes in js files and scss files. Runs tasks to update the minimized versions on change.
gulp.task("watch", function(done) {
  gulp.watch("./js/*.js", gulp.series("min-js"));
  gulp.watch("./sass/*.scss", gulp.series("min-css"));
  done();
});

//reloads browser after changes in css-js files in build and index.hmtl
gulp.task("sync-browser", function(done) {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
  gulp
    .watch(["./build/css/*.css", "./build/js/*.js", "./*html"])
    .on("change", browserSync.reload);
  done();
});

//default behaviour
gulp.task("default", gulp.parallel("sync-browser", "watch"));
