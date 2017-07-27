/**
 * Created by jin on 7/25/17.
 */


const webpackMerge = require('webpack-merge');
const webpack              = require('webpack');
const OptimizeJsPlugin = require('optimize-js-plugin');


const commonConfig = require('./webpack.common.js');
const helpers = require('./helpers');


module.exports = function (env) {
    console.log('Webpack env:', env)

    return webpackMerge(commonConfig, {
        /**
         * Developer tool to enhance debugging
         *
         * See: http://webpack.github.io/docs/configuration.html#devtool
         * See: https://github.com/webpack/docs/wiki/build-performance#sourcemaps
         */
        devtool: 'source-map',


        plugins: [

            /**
             * Plugin: DefinePlugin
             * Description: Define free variables.
             * Useful for having development builds with debug logging or adding global constants.
             *
             * Environment helpers
             *
             * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
             */
            // NOTE: when adding more properties make sure you include them in custom-typings.d.ts


            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify('production')
            }),



            new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
                mangle: {
                    keep_fnames: true
                }
            }),


            /**
             * Webpack plugin to optimize a JavaScript file for faster initial load
             * by wrapping eagerly-invoked functions.
             *
             * See: https://github.com/vigneshshanmugam/optimize-js-plugin
             */
            new OptimizeJsPlugin({
              sourceMap: false
            }),

        ]


    })


};
