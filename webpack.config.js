const path = require('path')
const webpack=require('webpack')

module.exports = {
    optimization: { splitChunks: { cacheGroups: { commons: { name: 'commons', chunks: 'initial', minChunks: 2 } } } },


    mode: 'development',
    entry: {
        index:'./src/index.js',
        registration: './src/registration.js',
        profile: './src/profile.js',
        discover: './src/discover.js',
        create:'./src/create.js',
        admin: './src/admin.js',
        settings: './src/settings.js',
        redirectToProfile:'./src/redirectToProfile.js'
    },
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: '[name].bundle.js'
    },
    
    watch:true
}