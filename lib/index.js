const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const concat = require('gulp-concat');
const stylus = require('gulp-stylus');
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');

module.exports = (bundle, options) => {
  options = Object.assign({
    svgPaths: [],
    sourceMap: true,
    stylus: true,
    postcss: true
  }, options);

  return bundle.src('css')
  .pipe(gulpif(options.sourceMap, sourcemaps.init()))
  .pipe(gulpif(options.stylus, stylus()))
  .pipe(concat(bundle.name + '.min.css'))
  .pipe(gulpif(options.postcss, postcss([
    require('postcss-import')(),
    require('postcss-each'),
    require('postcss-for'),
    require('postcss-calc')(),
    require('postcss-nested'),
    require('pobem'),
    require('postcss-media-minmax')(),
    require('postcss-custom-media'),
    require('postcss-css-variables')(),
    require('lost')(),
    require('postcss-svg')({
      paths: options.svgPaths,
      defaults: '[fill-opacity]: 1',
      svgo: true
      // debug: true
    }),
    autoprefixer({
      browsers: ['ie >= 10', 'last 2 versions', 'opera 12.1', '> 2%']
    })
  ])))
  .pipe(gulpif(options.sourceMap, sourcemaps.write()))
  .pipe(concat(bundle.name + '.min.css'))
};
