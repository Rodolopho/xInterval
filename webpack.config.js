const path=require('path');
//const bootstrap=require('bootstrap');

module.exports={
	entry:'./app/src/main.js',
	devtool:'inline-source-map',
	output:{
		filename:"xInterval.js",
		path:path.resolve(__dirname,'app','dist'),
	},
	devServer:{
		contentBase:"./app/site/",
	},

};//EOModuleExports