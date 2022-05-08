const gulp = require("gulp");
const rename = require("gulp-rename");
const sass = require("gulp-sass");
const autoPrefixer = require("gulp-autoprefixer");
const cssComb = require("gulp-csscomb");
const cmq = require("gulp-merge-media-queries");
const cleanCss = require("gulp-clean-css");
(browserSync = require("browser-sync").create()), (reload = browserSync.reload);

gulp.task("scss", function () {
  return gulp
    .src(["src/scss/**/*.scss"])
    .pipe(sass())
    .pipe(autoPrefixer())
    .pipe(cssComb())
    .pipe(cmq({ log: true }))
    .pipe(gulp.dest("src/css"))
    .pipe(
      rename({
        suffix: ".min",
      })
    )
    .pipe(cleanCss())
    .pipe(gulp.dest("src/css"));
});

gulp.task("serve", function () {
  // Serve files from the root of this project
  browserSync.init({
    server: {
      baseDir: ".",
    },
  });

  gulp.watch("src/scss/**/*.scss", gulp.series("scss")).on("change", reload);
  gulp.watch("src/css/**/*.css").on("change", reload);
  gulp.watch("src/js/**/*.js").on("change", reload);
  gulp.watch("*.html").on("change", reload);
});
