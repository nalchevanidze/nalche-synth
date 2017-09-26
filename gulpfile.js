const gulp = require("gulp");
const babel = require("gulp-babel");
const sass = require("gulp-sass");

gulp.task("babel", function () {
    gulp.src("src/**/*.js")
        .pipe(babel({ presets: ["es2015", "stage-3"]}))
        .on("error", console.error.bind(console))
        .pipe(gulp.dest("dist/"));

});

// gulp.task("sass", function () {
//     return gulp.src("src/**/*.scss")
//         .pipe(sass().on("error", sass.logError))
//         .pipe(gulp.dest("dist/"));
// });

gulp.task("default", ["babel","sass"]);
gulp.watch("src/**/*.js", ["babel"]);
gulp.watch("src/**/*.scss", ["sass"]);