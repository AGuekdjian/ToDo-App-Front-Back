const connectDB = require('./database/connectDB')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv').config()

connectDB()

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors())

// routes
const TaskRoutes = require('./routes/task')

app.use('/api/task', TaskRoutes)

const port = process.env.PORT

app.listen(port, () => {
    console.log("Servidor corriendo en el puerto: " + port)
})