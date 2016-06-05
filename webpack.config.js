var path = require('path');
var webpack = require('webpack');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
    .filter(function (x) {
        return ['.bin'].indexOf(x) === -1
    })
    .forEach(function (mod) {
        nodeModules[mod] = 'commonjs ' + mod
    });

module.exports = {
    devtool: 'source-map',
    entry: [
        path.join(__dirname, 'src/server.js')
    ],
    target: 'node',
    module: {
        loaders: [{
            test: /\.js$/,
            include: [
                path.join(__dirname, "src")
            ],
            loader: 'babel'
        },{ 
            test: /\.ts$/, 
            loader: 'babel-loader!ts-loader' 
        }]
    },
    resolve: {
        extensions: ['', '.js', '.ts'],
        root: [
            path.join(__dirname, 'node_modules'),
            path.join(__dirname, 'src')
        ]
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'server.js',
        devtoolModuleFilenameTemplate: function(info){
            return "file:///"+info.absoluteResourcePath;
        }
    },
    externals: nodeModules
};
