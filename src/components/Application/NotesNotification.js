import React, { useState, useEffect } from "react"
import { useApp } from "../../contexts/AppContext"
import { store } from "react-notifications-component"
import addNotification from "react-push-notification"

export const NotesNotification = () => {
	const { options, updateOptions, today } = useApp()
	const [show, setShow] = useState(true)

    const [alarm, setAlarm] = useState('../../../assets/audio/sounds/notification.mp3')

    useEffect(() => {
        const a = require('../../assets/audio/sounds/notification.mp3')
        setAlarm(new Audio(a.default))
    }, [])

	useEffect(() => {
		options.notes.map((note, i) => {
			return (
				today >
					(note.time.seconds ? note.time.toDate() : new Date(note.time)) &&
				(note.confirm == false || show) &&
				store.addNotification({
					title: `Напоминание`,
					//  от ${new Date(note.id).toLocaleTimeString(navigator.language, {
					//     hour: '2-digit',
					//     minute:'2-digit'
					// })}
					//   `,
					message: note.text,
					type: "success",
					insert: "top",
					container: "top-right",
					animationIn: ["animate__animated", "animate__fadeIn"],
					animationOut: ["animate__animated", "animate__fadeOut"],
					onRemoval: (id, removedBy) => {
						updateOptions(
							options,
							(options.notes = [...options.notes.filter(n => n.id !== note.id)])
                        )
					},
                }) &&
                alarm.play() &&
				(updateOptions(options, (options.notes[i].confirm = true)) ||
                    setShow(false)
                )
			)
		})
	})

    // const [play, setPlay] = useState(true)

	// const notification = text => {
	// 	// eslint-disable-next-line no-lone-blocks
	// 	addNotification({
	// 		title: "Напоминание",
	// 		// subtitle: name,
	// 		message: text,
	// 		theme: "darkblue",
	// 		native: true, // when using native, your OS will handle theming.
	// 	})
    // }
    

	// useEffect(() => {
	// 	options.notes.map(note => {
    //         return (
        
	// 			today >
	// 				(note.time.seconds ? note.time.toDate() : new Date(note.time)) &&
	// 			(note.confirm == false || show) &&
	// 			play &&
	// 			(notification(note.text) || alarm.play()) &&
    //             (
    //                 setPlay(false)
    //                 // console.log(today)
    //             )
                
	// 		)
	// 	})
    // })
	return <div></div>
}
