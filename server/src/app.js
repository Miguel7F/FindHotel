const express = require('express');
const cors = require('cors')
const morgan = require('morgan')
const db = require('./config/db');
const routes = require('./routes')
const config = require(__dirname + '/config/config.js').config

const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"))

app.all('*', function (request, response, next) {
    var whitelist = request.headers.origin;
    response.header('Access-Control-Allow-Origin', whitelist)
    response.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,HEAD');
    response.header('Access-Control-Allow-Headers', " authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    response.header("Access-Control-Allow-Credentials", "true");
    next()
})

app.use(cors({
    origin: function (origin, callback) {
        console.log(origin)
        if (!origin) return callback(null, true)

        if (config.listablanca.indexOf(origin) === -1) {
            return callback('error de cors', false)
        }
        return callback(null, true)
    }
}))

routes.forEach((route) => {
    app.use("/", route);
});

app.listen(config.PORT, function () {
    console.log('Servidor funcionando por el puerto ' + config.PORT)
})