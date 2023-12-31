const { disableNotifications } = require('laravel-mix')
const mix = require('laravel-mix')
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
disableNotifications()
mix.js('resources/js/app.js', 'public/js')
    .react()
    .postCss("resources/css/app.css", "public/css", [
        require("tailwindcss"),
    ])
    .sass('resources/sass/app.scss', 'public/css')
    .options({
        processCssUrls: false
    });
// mix.browserSync('127.0.0.1:8000')
mix.js('resources/js/landing.js', 'public/js')
    .react()
    .postCss("resources/css/app-landing.css", "public/css", [
        require("tailwindcss"),
    ])
    .sass('resources/sass/app-landing.scss', 'public/css')
