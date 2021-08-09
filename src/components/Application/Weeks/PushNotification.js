import React, { useState, useEffect } from 'react'
import { useApp } from "../../../contexts/AppContext"
import addNotification from 'react-push-notification';


export default function PushNotification() {
    const { DAYS, students, checkLesson, leaveMessage, deleteWeekLesson, options } = useApp()
    const [nameNotification, setNameNotification] = useState(true)
    const [nTime, setNTime] = useState(true)

    const notification = (name) => {
        // eslint-disable-next-line no-lone-blocks

      
            // console.log(name, 'eeee')
            addNotification({
                title: 'Скоро урок',
                subtitle: name,
                message: `${name} - через ${options.minutes} минут!`,
                theme: 'darkblue',
                native: true // when using native, your OS will handle theming.
            })
        


    }


    // const showNot = (name) => {
    //     if (nTime) {
    //         notification(name)
    //         setTimeout(() => setNTime(false), 5000)
    //     } else {
    //         setNTime(true)
    //     }
    // }

    const [alarm, setAlarm] = useState('../../../assets/audio/sounds/222.mp3')

    useEffect(() => {
        const a = require('../../../assets/audio/sounds/222.mp3')
        setAlarm(new Audio(a.default))
        const x = new Audio(a.default)
        // x.play()
        // console.log(x)
    }, [])

    const [play, setPlay] = useState(true)

    const playSound = () => {
        // alarm.volume = +options.volume / 100
        
    }

    useEffect(() => {
        const dayIndex = new Date().getDay() - 1 === -1 ? 6 : new Date().getDay() - 1

        students.map((student, i) => {
            if(options.notification) {
                const dateB = new Date()
                let dif
    
                if (student.day[dayIndex].time !== 'none') {
    
                    dateB.setHours(student.day[dayIndex].time.slice(0, 2))
                    dateB.setMinutes(student.day[dayIndex].time.slice(3))
                    dif = (dateB - new Date()) / 1000 / 60
                    dif <= 0 && dif > -2 && setPlay(true)
                    // dif <= 30 && dif > 0 && play && (console.log(`Урок с ${student.name}`) || setPlay(false))
                    dif <= +options.minutes && dif > 0 && play && ((notification(student.name) || alarm.play()) && setPlay(false))
    
                    console.log(play)
                }
            }
           
        }
        
        )

    })

    return (
        <div>

        </div>
    )
}
