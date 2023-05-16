import React, { useRef } from 'react'
import { Global, Crud } from '../../helpers/Global'

export default function CreateTask({ getTask }) {
    const createTitle = useRef(null)
    const createDescription = useRef(null)

    const createTask = async (e) => {
        e.preventDefault()
        let title = createTitle.current.value.trim()
        let description = createDescription.current.value.trim()
        if (title === "" && description === "" && !title && !description) return

        const newTask = {
            title,
            description
        }

        try {
            await fetch(`${Global.url}${Crud.createTask}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newTask)
            })
            getTask()
            createTitle.current.value = ''
            createDescription.current.value = ''
        } catch (error) {
            console.error('Ha ocurrido un error al crear la tarea:', error);
        }
    }
    return (
        <section className='createTask'>
            <form className='form' onSubmit={createTask} id='form'>
                <input type="text" placeholder='Title' name='title' ref={createTitle} />
                <input type="text" placeholder='Description' name='description' ref={createDescription} />
                <button type='submit'>Create Task</button>
            </form>
        </section>
    )
}
