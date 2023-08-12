require('dotenv').config()

const config = {}

config.listablanca = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    undefined
]

config.DB_NAME = process.env.DB_NAME
config.DB_USER = process.env.DB_USER
config.DB_PASS = process.env.DB_PASS
config.PORT = process.env.PORT || 4000


module.exports.config = config