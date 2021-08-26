import React, { useState, useEffect } from 'react'
import { useApp } from "../../contexts/AppContext"
import { store } from 'react-notifications-component';

export const NotesNotification = () => {

    const { options, updateOptions, today } = useApp()
    const [show, setShow] = useState(true)

    useEffect(() => {
        options.notes.map((note, i) => {
            return (
                today > (note.time.seconds ? note.time.toDate() : new Date(note.time))
                && (note.confirm == false || show)
                && store.addNotification({
                    title: 'Напоминание',
                    message: note.text,
                    type: "success",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    onRemoval: (id, removedBy) => {
                        updateOptions(options, options.notes = [...options.notes.filter(n => n.id !== note.id)])
                    }
                })
                && (updateOptions(options, options.notes[i].confirm = true) || setShow(false))
            )
        })
    })

    return (
        <div>

        </div>
    )
}
