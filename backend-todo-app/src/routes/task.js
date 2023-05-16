const express = require('express')
const router = express.Router()

const TaskController = require('../controllers/taskController')

// Definir rutas
router.get('/', TaskController.rutaTest)
router.get("/getAllTask", TaskController.getAllTask)
router.post("/createTask", TaskController.createTask)
router.put("/updateTask/:id", TaskController.updateTask)
router.delete("/deleteTask/:id", TaskController.deleteTask)

module.exports = router;