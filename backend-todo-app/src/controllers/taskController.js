const Task = require('../models/task')

const taskController = {}

taskController.rutaTest = (req, res) => {
    res.status(200).send('Test success')
}

taskController.createTask = (req, res) => {
    let params = req.body

    if (!params.title || !params.description) {
        return res.status(400).json({
            status: "error",
            message: "Faltan datos por enviar",
        })
    }

    Task.find({
        $or: [
            { title: params.title.toLowerCase() }
        ]
    }).exec(async (error, tareas) => {

        if (error) return res.status(500).json({ status: "error", message: "Error en la consulta de tareas" });

        if (tareas && tareas.length >= 1) {
            return res.status(200).send({
                status: "success",
                message: "La tarea ya existe"
            })
        }

        let task_to_save = new Task(params);

        task_to_save.save((error, taskStored) => {
            if (error || !taskStored) return res.status(500).send({ status: "error", "message": "Error al guardar la tarea" });

            return res.status(200).json({
                status: "success",
                message: "Tarea creada correctamente",
                task: taskStored
            })
        })
    })
}

taskController.getAllTask = (req, res) => {
    Task.find({})
        .then((tasks) => {
            res.json(tasks)
        })
        .catch((err) => {
            res.status(500).json({ message: 'Ocurrió un error al obtener las tareas' + err })
        })
}

taskController.updateTask = (req, res) => {
    const taskId = req.params.id

    Task.findByIdAndUpdate(taskId, req.body, { new: true }, (err, taskUpdated) => {
        if (err) {
            console.log(err)
            res.status(500).json({ message: 'Ocurrió un error al actualizar la tarea' })
        } else {
            if (!taskUpdated) res.status(404).json({ message: 'La tarea no existe' })
            res.json(taskUpdated)
        }
    })

}

taskController.deleteTask = (req, res) => {
    const taskId = req.params.id

    Task.findByIdAndDelete(taskId, (err, taskDeleted) => {
        if (err) {
            console.log(err)
            res.status(500).json({ message: 'Ocurrió un error al eliminar la tarea' })
        } else {
            if (!taskDeleted) res.status(404).json({ message: 'La tarea no existe' })
            res.json("Task delete")
        }
    })
}

module.exports = taskController