import React, { useState, useRef, useEffect } from 'react'
import { useApp } from "../../../contexts/AppContext"
import { Modal, Button, Form, CloseButton } from 'react-bootstrap';
import Time from '../Time'
import AddLesson from '../AddLesson'
import './WeekNow.css'



export default function NextWeek() {
    const [value, setValue] = useState('')
    const messageRef = useRef()
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [name, setName] = useState('')
    const [id, setId] = useState(0)

    const [i, setI] = useState([])

    const { DAYS, students, checkLesson, leaveMessage, deleteWeekLesson, nextWeekDays } = useApp()

   
    useEffect(() => {
        setI(nextWeekDays)
        }, [nextWeekDays]);

    function createMessage(student) {
        handleShow()
        setName(student.name)
        setId(student.id)
        setValue(student.message)
    }

    function sendMessage(e) {
        e.preventDefault()
        leaveMessage(messageRef.current.value, id)
        handleClose()
    }

    console.log(nextWeekDays)
    return (
        <div className="bg-light d-flex justify-content-around flex-wrap">
           
            {DAYS.map((day, index) => {
                return (

                    // <div className="dayList">
                    <div className={(new Date()).getDay() - 1 === index ? "dayList active" : `dayList`}>
                        <h3 className="border primary text-body" style={(new Date()).getDay() - 1 === index ? { background: '#b1e6a9' } : { background: '#DAEAD7' }}>{day}</h3>
                        <div className="lessons" >
                            <div className='lessons-placeholder'>
                                {i.slice().filter(a => a.day[index].time !== 'none').sort((a, b) => a.day[index].time.slice(0, 2) - b.day[index].time.slice(0, 2)).map((student, i) => {
                                    if (student.day[index].time !== 'none') {
                                        return (<div className={student.day[String(index)].ok ? 'students-list-checked' : 'students-list'}>

                                            <span>
                                                <span className='student-time'>
                                                    <Time
                                                        hours={student.day[index].time}
                                                        student={student}
                                                        day={day}
                                                    />
                                                </span>
                                            
                                                <span className='student-message-btn' onClick={() => createMessage(student)}>{student.name}</span>
                                            </span>

                                            <span>
                                                <CloseButton onClick={() => deleteWeekLesson(student, index)} />
                                            </span>
                                        </div>
                                        )
                                    } else return null

                                })}

                            </div>
                            <AddLesson index={index} />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
