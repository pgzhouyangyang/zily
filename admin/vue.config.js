
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                "@": resolve("src")
            }
        }
    },
    devServer: {
        proxy: {
          '/api': {
            target: 'http://localhost:8083/admin/',
            changeOrigin: true,
            pathRewrite: { 
                '^/api': '/'
            },
           
          },
          '/uploads': {
            target: 'http://localhost:8083/',
            changeOrigin: true,
            pathRewrite: { 
                // '^/upload': '/'
            }
          }
        }
      }
}