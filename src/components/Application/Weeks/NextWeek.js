import React, { useState, useRef, useEffect } from 'react'
import { useApp } from "../../../contexts/AppContext"
import { Modal, Button, Form, CloseButton, Alert } from 'react-bootstrap';
import Time from '../Time'
import AddLessonNextWeek from './AddLessonNextWeek'
import './NextWeek.css'



export default function NextWeek() {

    const [showAlert, setShowAlert] = useState(false);

    const [value, setValue] = useState('')
    const messageRef = useRef()
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [name, setName] = useState('')
    const [id, setId] = useState(0)

    const [i, setI] = useState([])

    const { DAYS, deleteWeekLesson, nextWeekDays, copyPreviousSchedule, students } = useApp()


    useEffect(() => {
        setI(nextWeekDays)
    }, [nextWeekDays]);

    function createMessage(student) {
        handleShow()
        setName(student.name)
        setId(student.id)
        setValue(student.message)
    }

    function handleButton() {
        copyPreviousSchedule()
        setShowAlert(true)
    }



    return (
        <>
            <div>
                <Alert show={showAlert} variant="success">
                    <Alert.Heading>Расписание прошлой недели скопировано.</Alert.Heading>
                    <hr />
                    <div className="d-flex justify-content-end">
                        <Button onClick={() => setShowAlert(false)} variant="outline-success">
                            Хорошо, закрыть
                        </Button>
                    </div>
                </Alert>
                <div className='d-flex justify-content-end bg-light pt-2'>
                {!showAlert && <span className='btn btn-outline-secondary btn-sm mr-3' onClick={() => handleButton(true)}>Скопировать расписание прошлой недели</span>}
                </div>
            </div>


            <div className="bg-light d-flex justify-content-around flex-wrap">
                {DAYS.map((day, index) => {
                    return (
                        <div className='dayList day-nextweek'>
                            <h3 className="border primary text-body" style={{ background: 'rgb(202, 240, 247)' }}>{day}</h3>
                            <div className="lessons" >
                                <div className='lessons-placeholder'>
                                    {i.slice().filter(a => a.day[index].time !== 'none')
                                    .sort((a, b) => +a.day[index].time.replace(':', '') - +b.day[index].time.replace(':', ''))
                                    .map((student, i) => {
                                        if (student.day[index].time !== 'none') {
                                            return (<div className='students-list'>

                                                <span>
                                                    <span className='student-time next-week'>
                                                        <Time
                                                            hours={student.day[index].time}
                                                            student={student}
                                                            day={day}
                                                            nextWeek={true}
                                                        />
                                                    </span>

                                                    <span className='student-message-btn' onClick={() => createMessage(student)}>{students.map(s => s.id == student.id && s.name)}</span>
                                                </span>

                                                <span>
                                                    <CloseButton onClick={() => deleteWeekLesson(student, index, 1)} />
                                                </span>
                                            </div>
                                            )
                                        } else return null

                                    })}

                                </div>
                                <AddLessonNextWeek index={index} />
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
