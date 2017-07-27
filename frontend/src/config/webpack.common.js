/**
 * Created by jin on 7/24/17.
 */


const path                 = require('path');
const webpack              = require('webpack');
const {CommonsChunkPlugin} = require('webpack').optimize;
const {CheckerPlugin}      = require('awesome-typescript-loader')
// const {AotPlugin}          = require('@ngtools/webpack');


const helpers = require('./helpers');
const AOT = process.env.BUILD_AOT || false;

const vendorLibraryFromChunks = [
    "login", "home"
]

console.log('---------- Angular Build Using AOT:', AOT, ' ----------')

module.exports = {
    entry: {
        "polyfills": ["./ts/polyfills.ts"],
        "login": [ AOT ? './ts/page/login.ts' : './ts/page/login.ts' ],
        "home": [ AOT ? './ts/page/home.ts' : './ts/page/home.ts' ]
    },

    /**
     * Options affecting the output of the compilation.
     *
     * See: http://webpack.github.io/docs/configuration.html#output
     */

    output: {
        /**
         * The output directory as absolute path (required).
         *
         * See: http://webpack.github.io/docs/configuration.html#output-path
         */
        path: path.join(process.cwd(), "../dist/js"),

        /**
         * Specifies the name of each output file on disk.
         * IMPORTANT: You must not specify an absolute path here!
         *
         * See: http://webpack.github.io/docs/configuration.html#output-filename
         */
        filename: "[name].bundle.js",

        /**
         * The filename of the SourceMaps for the JavaScript files.
         * They are inside the output.path directory.
         *
         * See: http://webpack.github.io/docs/configuration.html#output-sourcemapfilename
         */
        sourceMapFilename: '[file].map',

        /** The filename of non-entry chunks as relative path
         * inside the output.path directory.
         *
         * See: http://webpack.github.io/docs/configuration.html#output-chunkfilename
         */
        chunkFilename: "[id].chunk.js"
    },

    resolve : {
        "extensions" : [ ".ts",  ".js" ],
        "modules"    : [ "./node_modules" ],
        "symlinks"   : true  // Whether to resolve symlinks to their symlinked location. Default: true. https://webpack.js.org/configuration/resolve/
    },

    module: {

        rules: [

            /**
             * Typescript loader support for .ts
             *
             * Component Template/Style integration using `angular2-template-loader`
             * Angular 2 lazy loading (async routes) via `ng-router-loader`
             *
             * `ng-router-loader` expects vanilla JavaScript code, not TypeScript code. This is why the
             * order of the loader matter.
             *
             * See: https://github.com/s-panferov/awesome-typescript-loader
             * See: https://github.com/TheLarkInn/angular2-template-loader
             * See: https://github.com/shlomiassaf/ng-router-loader
             */

            {
                test: /\.ts$/,
                loaders: [{
                    loader: 'awesome-typescript-loader',
                    options: { configFileName: helpers.root( 'tsconfig.json') }
                } , 'angular2-template-loader' ],
                exclude: [/\.(spec|e2e)\.ts$/]
            },

            /*{
                "test"   : /\.ts$/,
                "loader" : "@ngtools/webpack"
            }*/

            /**
             * Raw loader support for *.html
             * Returns file content as string
             *
             * See: https://github.com/webpack/raw-loader
             */
            {
                test: /\.(html|css)$/,
                loader : "raw-loader"
            },


            /**
             * Json loader support for *.json files.
             *
             * See: https://github.com/webpack/json-loader
             */
            {
                test   : /\.json$/,
                loader : "json-loader"
            },


        ]
    },

    plugins       : [

        /**
         * Plugin: ContextReplacementPlugin
         * Description: Provides context to Angular's use of System.import
         *
         * See: https://webpack.github.io/docs/list-of-plugins.html#contextreplacementplugin
         * See: https://github.com/angular/angular/issues/11580
         */

        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)@angular/,
            helpers.root('./'), // location of your src
            {
                /**
                 * Your Angular Async Route paths relative to this root directory
                 */

            } // a map of your routes
        ),


        new CommonsChunkPlugin({
            minChunks : 2,
            async     : "common"
        }),


        /**
         * This enables tree shaking of the vendor modules
         */
        new CommonsChunkPlugin({
            name      : "vendor",
            chunks    : vendorLibraryFromChunks,
            minChunks: module => /node_modules/.test(module.resource),
        }),

        new CommonsChunkPlugin({
            name: ['manifest'],
            minChunks: Infinity,
        }),



        /**
         * Plugin: ForkCheckerPlugin
         * Description: Do type checking in a separate process, so webpack don't need to wait.
         *
         * See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
         */
        new CheckerPlugin(),

        /*new AotPlugin({
            "mainPath"             : "./ts/page/webIndex.ts",
            "hostReplacementPaths" : {
                "environments/environment.ts" : "./ts/environments/environment.ts"
            },
            "exclude"              : [],
            "tsConfigPath"         : "./tsconfig.aot.json",
            "skipCodeGeneration"   : true
        })*/

    ]
};
