const gulp = require("gulp");
const babel = require("gulp-babel");
const ts = require("gulp-typescript");
const tsProject = ts.createProject("tsconfig.json");

gulp.task("babel", function () {

	gulp.src("src/**/*.js")
		.pipe(babel({
			presets: ["es2015", "stage-3"]
		}))
		.on("error", console.error.bind(console))
		.pipe(gulp.dest("dist/"));
});

gulp.task("ts", function () {
	return tsProject.src()
		.pipe(tsProject())
		.js.pipe(gulp.dest("dist"));
});


gulp.task("default", ["babel", "ts"]);
gulp.watch("src/**/*.js", ["babel"]);
gulp.watch("src/**/*.ts", ["ts"]);
gulp.watch("src/**/*.tsx", ["ts"]);