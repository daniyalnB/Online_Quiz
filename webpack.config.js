const path = require("path");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const zlib = require("zlib");

let mode = "development";
let target = "web";
const plugins = [
	new CleanWebpackPlugin(),
	new MiniCssExtractPlugin(),
	new HtmlWebpackPlugin({
		template: "./src/index.html",
		favicon: './src/favicon.ico'
	}),
	new CompressionPlugin({
		filename: "[path][base].gz",
		algorithm: "gzip",
		test: /\.js$|\.css$|\.html$/,
		threshold: 10240,
		minRatio: 0.8,
	}),
];

if (process.env.NODE_ENV === "production") {
	mode = "production";
	// Temporary workaround for 'browserslist' bug that is being patched in the near future
	target = "browserslist";
}

if (process.env.SERVE) {
	// We only want React Hot Reloading in serve mode
	plugins.push(
		new ReactRefreshWebpackPlugin({
			overlay: false,
		})
	);
}

module.exports = {
	// mode defaults to 'production' if not set
	mode: mode,

	// This is unnecessary in Webpack 5, because it's the default.
	// However, react-refresh-webpack-plugin can't find the entry without it.
	entry: "./src/index.js",

	// output: {
	// 	// output path is required for `clean-webpack-plugin`
	// 	filename: "[name].bundle.js",
	// 	path: path.resolve(__dirname, "dist"),
	// 	// this places all images processed in an image folder
	// 	assetModuleFilename: "images/[hash][ext][query]",
	// },
	 output: {
    // output path is required for `clean-webpack-plugin`
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    // this places all images processed in an image folder
    assetModuleFilename: "images/[hash][ext][query]",
  },

	module: {
		rules: [
			// {
			//   test: /\.(s[ac]|c)ss$/i,
			//   use: [
			//     {
			//       loader: MiniCssExtractPlugin.loader,
			//       // This is required for asset imports in CSS, such as url()
			//       options: { publicPath: "" },
			//     },
			//     "css-loader",
			//     "postcss-loader",
			//     // according to the docs, sass-loader should be at the bottom, which
			//     // loads it first to avoid prefixes in your sourcemaps and other issues.
			//     "sass-loader",
			//   ],

			// },

			{
				test: /\.s?css$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					"resolve-url-loader",
					"postcss-loader",
					"sass-loader",
				],
			},
			{
				test: /\.(png|jpe?g|gif|svg|webp)$/i,
				/**
				 * The `type` setting replaces the need for "url-loader"
				 * and "file-loader" in Webpack 5.
				 *
				 * setting `type` to "asset" will automatically pick between
				 * outputing images to a file, or inlining them in the bundle as base64
				 * with a default max inline size of 8kb
				 */
				type: "asset",

				/**
				 * If you want to inline larger images, you can set
				 * a custom `maxSize` for inline like so:
				 */
				// parser: {
				//   dataUrlCondition: {
				//     maxSize: 30 * 1024,
				//   },
				// },
			},
			// `ts` and `tsx` files are parsed using `ts-loader`
      { 
        test: /\.(ts|tsx)$/, 
        loader: "ts-loader" 
      },
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				loader: "babel-loader",
			},
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: {
					// without additional settings, this will reference .babelrc
					loader: "babel-loader",
					options: {
						/**
						 * From the docs: When set, the given directory will be used
						 * to cache the results of the loader. Future webpack builds
						 * will attempt to read from the cache to avoid needing to run
						 * the potentially expensive Babel recompilation process on each run.
						 */
						cacheDirectory: true,
					},
				},
			},
		],
	},
	performance: {
		hints: false,
	},

	plugins: plugins,

	target: target,

	devtool: "source-map",

	resolve: {
		extensions: [".js", ".jsx", ".ts", ".tsx"],
	},

	// required if using webpack-dev-server
	devServer: {
		// contentBase: "./dist",
		// static: "./dist",
		// hot: true,
		historyApiFallback: true,
		hot: true,
		static: {
			directory: path.join(__dirname, "./src"),
		},
		// port: 3000,
		compress: true,
	},
};
