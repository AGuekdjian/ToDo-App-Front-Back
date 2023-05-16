const mongoose = require('mongoose')
require('dotenv').config()

const user = process.env.DB_USER
const password = process.env.DB_PASSWORD

const connectDB = async () => {
    try {
        mongoose.set("strictQuery", true)
        await mongoose.connect(`mongodb+srv://${user}:${password}@clustertask.bzcqxz7.mongodb.net/`)
        console.log('Conexion exitosa a base de datos!')
    } catch (e) {
        throw new Error('No se a podido conectar a la base de datos ' + e)
    }
}

module.exports = connectDB