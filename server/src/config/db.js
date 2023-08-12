const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')
const config = require(__dirname + '/config.js').config

//! MONGO CONFIGURATION  <-- NO TOCAR
async function connectToDatabase() {
    try {
        await mongoose.connect(`mongodb+srv://findhotel:${config.DB_PASS}@${config.DB_USER}.8ocs4hu.mongodb.net/${config.DB_NAME}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conexión exitosa a MongoDB Atlas');
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
}
connectToDatabase();
const db = mongoose.connection;


module.exports = db;