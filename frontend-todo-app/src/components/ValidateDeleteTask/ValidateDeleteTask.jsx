import React from 'react'

export default function ValidateDeleteTask({ showModal, closeModal, taskId, deleteTask }) {
    return (
        <>
            {showModal && (
                <div className='modal'>
                    <div className='modal-overlay'>
                        <div className='modal-content'>
                            <h2>¿Estás seguro que quieres eliminar la tarea?</h2>
                            <div className='modal-buttons'>
                                <button className='acept' onClick={() => deleteTask(taskId)}>Aceptar</button>
                                <button className='cancel' onClick={closeModal}>Cancelar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
