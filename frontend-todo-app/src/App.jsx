import { useState, useEffect } from 'react'
import { CreateTask, UpdateTask, ValidateDeleteTask } from './components'
import { Global, Crud } from './helpers/Global'

function App() {
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([])
  const [idTask, setIdTask] = useState()


  useEffect(() => {
    getTask()
  }, [tasks])

  const getTask = async () => {
    try {
      let res = await fetch(`${Global.url}${Crud.listTask}`)
      const tareas = await res.json()
      if (tareas.length !== tasks.length) {
        setTasks(tareas)
      }
    } catch (e) {
      console.error('No se pudieron obtener las tareas:', e)
    }
  }


  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const validateDeleteTask = (id) => {
    setIdTask(id)
    openModal()
  }

  const deleteTask = async (taskId) => {
    try {
      await fetch(`${Global.url}${Crud.deleteTask}${taskId}`, {
        method: "DELETE"
      })
      getTask()
      closeModal()
    } catch (e) {
      console.error('No se pudo eliminar la tarea:', e)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear().toString()

    const formattedDay = day < 10 ? `0${day}` : day
    const formattedMonth = month < 10 ? `0${month}` : month

    return `${formattedDay}/${formattedMonth}/${year}`
  }

  const generateIdsForTasks = (tasks) => {
    let taskIdCounter = 1;
    return tasks.map(task => ({ ...task, id: taskIdCounter++ }));
  }

  const idGenerated = generateIdsForTasks(tasks)

  return (
    <div className='back'>
      <header className='header'>
        <div className='logo'>Anthony Guekdjian</div>
        <nav className='navbar'>
          <ul className='menu'>
            <li><a href="https://weather-app-aguekdjian.vercel.app/" target='_blank'>Weather-App</a></li>
            <li><a href="https://anthonyguekdjian.vercel.app" target='_blank'>Portfolio</a></li>
          </ul>
        </nav>
      </header>
      <main className='main'>
        <section className={tasks.length == 0 ? 'noTask-container' : ""}>
          {tasks.length > 0 ? <table className='hbody-tbody'>
            <thead >
              <tr className='tr'>
                <th className='th-td'>N.</th>
                <th className='th-td'>Title</th>
                <th className='th-td'>Description</th>
                <th className='th-td'>Date created</th>
                <th className='th-td'>Delete Task</th>
              </tr>
            </thead>
            <tbody>
              {
                idGenerated.map(({ id, title, description, created_at, _id }) => {
                  const formattedDate = formatDate(created_at)
                  return (
                    <tr key={_id} className='tr'>
                      <td className='th-td'>{id}</td>
                      <td className='th-td'>{title}</td>
                      <td className='th-td'>{description}</td>
                      <td className='th-td'>{formattedDate}</td>
                      <td className='th-td'>
                        <button onClick={() => validateDeleteTask(_id)}>Delete</button>

                      </td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table> :
            <div className='noTask'>
              <h1>No hay tareas</h1>
            </div>
          }
        </section>
        <div>
          <CreateTask getTask={getTask}></CreateTask>
          <UpdateTask></UpdateTask>
        </div>
        <ValidateDeleteTask showModal={showModal} closeModal={closeModal} taskId={idTask} deleteTask={deleteTask}></ValidateDeleteTask>
      </main>
      <footer></footer>
    </div>
  )
}

export default App
