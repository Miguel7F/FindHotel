const express = require('express');
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')

global.app = express()
global.config = require(__dirname + '/config/config.js').config

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

//! MONGO CONFIGURATION  <-- NO TOCAR
async function connectToDatabase() {
    try {
        await mongoose.connect(`mongodb+srv://${config.DB_NAME}:${config.DB_PASS}@${config.DB_USER}.8ocs4hu.mongodb.net/`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to the database');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}

connectToDatabase();

app.listen(config.PORT, function () {
    console.log('Servidor funcionando por el puerto ' + config.PORT)
})