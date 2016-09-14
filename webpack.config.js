module.exports = {
	entry: "./src/App.js",
	output: {
		filename: "public/bundle.js"
	},
	module: {
		// preLoaders: [
  //     		{
  //     			test: /\.js$/, 
  //     			loader: "eslint-loader", 
  //     			exclude: /node_modules/}
  //   	],
		loaders: [
			{ 
				test: /.js$/, 
				loader: 'babel-loader',
				query: {
					"presets": ["react", "es2015"]
				},
				exclude: /node_modules/
			}
		]
	}
};