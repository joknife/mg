var gulp = require('gulp'), // Подключаем Gulp
    sass = require('gulp-sass'); //Подключаем Sass пакет

gulp.task('sass', function(){ // Создаем таск "sass"
    return gulp.src('mg/scss/*.scss') // Берем источник
        .pipe(sass({outputStyle:'compressed'})).on('error', sass.logError) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(gulp.dest('css')) // Выгружаем результата в папку css
});

gulp.task('watch', function() {
    gulp.watch('scss/*.scss', ['sass']); // Наблюдение за sass файлами
    // Наблюдение за другими типами файлов
});

gulp.task('default',['watch']);