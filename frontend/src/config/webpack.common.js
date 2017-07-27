/**
 * Created by jin on 7/24/17.
 */


const path                 = require('path')
const webpack              = require('webpack')
const {CommonsChunkPlugin} = require('webpack').optimize;
const AssetsPlugin         = require('assets-webpack-plugin')
const {CheckerPlugin}      = require('awesome-typescript-loader')
const ngcWebpack           = require('ngc-webpack')

const helpers = require('./helpers')


const vendorLibraryFromChunks = [
    "login", "home"
]

const distPath = {
    assetsPluginPath: '../dist/rev-manifest',
    assetsPluginFilename : 'rev-manifest-js.json'
}


module.exports = function (env) {

    console.log('---------- Webpack env:', env)

    const AOT = env === 'aot'?  true : false
    const isDev = env === 'dev'?  true : false

    console.log('---------- Angular Build Using AOT:', AOT, ' ----------')


    return {
        entry: {
            "polyfills": ["./ts/polyfills.ts"],
            "login": [ AOT ? './ts/page/login.aot.ts' : './ts/page/login.ts' ],
            "home": [ AOT ? './ts/page/home.aot.ts' : './ts/page/home.ts' ]
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
            filename: isDev ?  "[name].bundle.js" : "[name].[chunkhash].bundle.js"  ,

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
            chunkFilename: isDev ?  "[id].chunk.js" : '[name].[chunkhash].chunk.js'
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
                        options: { configFileName: helpers.root( 'tsconfig.aot.json') }
                    } , 'angular2-template-loader' ],
                    exclude: [/\.(spec|e2e)\.ts$/]
                },


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
                'process.env.NODE_ENV': isDev ? JSON.stringify('development') : JSON.stringify('production')
            }),




            new AssetsPlugin({
                path: helpers.root(distPath.assetsPluginPath),
                filename: distPath.assetsPluginFilename,
                prettyPrint: true,
                processOutput : function (assets) {
                    let output = {}
                    for (const prop in assets) {
                        if (Object.prototype.hasOwnProperty.call(assets, prop)) {
                            output[prop + '.bundle.js'] = assets[prop].js
                        }
                    }
                    return JSON.stringify(output, null, 2)
                }
            }),

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


            /**
             * Plugin: ForkCheckerPlugin
             * Description: Do type checking in a separate process, so webpack don't need to wait.
             *
             * See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
             */
            new CheckerPlugin(),




            new CommonsChunkPlugin({
                minChunks : 2,
                async     : "common"
            }),


            new CommonsChunkPlugin({
                name: 'polyfills',
                chunks: ['polyfills']
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





            new ngcWebpack.NgcWebpackPlugin({
                /**
                 * If false the plugin is a ghost, it will not perform any action.
                 * This property can be used to trigger AOT on/off depending on your build target (prod, staging etc...)
                 *
                 * The state can not change after initializing the plugin.
                 * @default true
                 */
                disabled: !AOT,
                tsConfig: helpers.root('tsconfig.aot.json'),
                /**
                 * A path to a file (resource) that will replace all resource referenced in @Components.
                 * For each `@Component` the AOT compiler compiles it creates new representation for the templates (html, styles)
                 * of that `@Components`. It means that there is no need for the source templates, they take a lot of
                 * space and they will be replaced by the content of this resource.
                 *
                 * To leave the template as is set to a falsy value (the default).
                 *
                 * TIP: Use an empty file as an overriding resource. It is recommended to use a ".js" file which
                 * usually has small amount of loaders hence less performance impact.
                 *
                 * > This feature is doing NormalModuleReplacementPlugin for AOT compiled resources.
                 *
                 * ### resourceOverride and assets
                 * If you reference assets in your styles/html that are not inlined and you expect a loader (e.g. url-loader)
                 * to copy them, don't use the `resourceOverride` feature as it does not support this feature at the moment.
                 * With `resourceOverride` the end result is that webpack will replace the asset with an href to the public
                 * assets folder but it will not copy the files. This happens because the replacement is done in the AOT compilation
                 * phase but in the bundling it won't happen (it's being replaced with and empty file...)
                 *
                 * @default undefined
                 */
                resourceOverride: helpers.root('config/resource-override.js')
            }),

        ]
    }
}
