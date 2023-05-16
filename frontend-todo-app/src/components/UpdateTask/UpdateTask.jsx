import React, { useRef } from 'react'
import { Global, Crud } from '../../helpers/Global'

export default function UpdateTask({ getTask }) {
    const newTitle = useRef(null)
    const newDescription = useRef(null)

    const handleUpdateTask = async (e) => {
        e.preventDefault()
        // let title = newTitle.current.value.trim()
        // let description = newDescription.current.value.trim()
        // if (title === "" && description === "" && !title && !description) return

        // const newTask = {
        //     title,
        //     description
        // }

        // try {
        //     await fetch(`${Global.url}${Crud.updateTask}${_id}`, {
        //         method: "POST",
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(newTask)
        //     })
        //     getTask()
        //     newTitle.current.value = ''
        //     newDescription.current.value = ''
        // } catch (error) {
        //     console.error('Ha ocurrido un error al crear la tarea:', error);
        // }
    }
    return (
        <section className='updateTask'>
            <form className='form' onSubmit={handleUpdateTask} id='form'>
                <input type="text" placeholder='Title' name='title' ref={newTitle} />
                <input type="text" placeholder='Description' name='description' ref={newDescription} />
                <button type='submit'>Updated Task</button>
            </form>
        </section>
    )
}
