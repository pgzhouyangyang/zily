const { resolve } = require('path')
const fs = require("fs");

const registerRouter = (app) => {

    fs.readdirSync(__dirname).forEach((i) => {
        const file = __dirname + '/' + i;
        if(fs.statSync(file).isDirectory()){
            fs.readdirSync(file).forEach(item=> {
                const name = item.replace('.js', '');
                const router = require(file + '/' + name)
                app.use('/' + i, router)
            })
        }
    })
}

module.exports =  registerRouter