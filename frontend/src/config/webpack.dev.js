/**
 * Created by jin on 7/25/17.
 */


const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');


module.exports = webpackMerge(commonConfig, {
    /**
     * Developer tool to enhance debugging
     *
     * See: http://webpack.github.io/docs/configuration.html#devtool
     * See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
     */
    devtool: 'cheap-module-source-map',


    plugins: [
    ],

    devServer: {
        historyApiFallback: true,
        stats: 'minimal'
    }
});
