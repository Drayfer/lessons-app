import React, { useState, useRef, useEffect } from 'react'
import { useApp } from "../../../contexts/AppContext"
import { Modal, Button, Form, CloseButton } from 'react-bootstrap';
import { Calendar2Check } from 'react-bootstrap-icons';
import Time from '../Time'
import AddLesson from '../AddLesson'
import './WeekNow.css'



export default function WeekNow() {
    const [value, setValue] = useState('')
    const messageRef = useRef()
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [name, setName] = useState('')
    const [id, setId] = useState(0)
    

    const { DAYS, students, checkLesson, leaveMessage, deleteWeekLesson } = useApp()

    const [i, setI] = useState([])
    useEffect(() => {
        setI(students)
        }, [students]);

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
    return (
        <div className="bg-light d-flex justify-content-around flex-wrap">
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Оставить напоминание о {name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={sendMessage}>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control
                                as="textarea"
                                placeholder="Напишите здесь"
                                ref={messageRef}
                                style={{ height: '150px' }}
                                value={value}
                                onChange={e => setValue(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" type='submit'>
                            Сохранить
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>


            {DAYS.map((day, index) => {
                return (

                    // <div className="dayList">
                    <div className={(new Date()).getDay() - 1 === index ? "dayList active" : `dayList`}>
                        <h3 className="border primary text-body" style={(new Date()).getDay() - 1 === index ? { background: '#b1e6a9' } : { background: '#DAEAD7' }}>{day}</h3>
                        <div className="lessons" >
                            <div className='lessons-placeholder'>
                                {i.slice().filter(a => a.day[index].time !== 'none')
                                .sort((a, b) => (
                                    +a.day[index].time.replace(':', '') - +b.day[index].time.replace(':', '')
                                ))
                                .map((student, i) => {
                                    if (student.day[index].time !== 'none') {
                                        return (<div className={student.day[String(index)].ok ? 'students-list-checked' : 'students-list'}>
        
                                            <span>
                                                <span className='student-time'>
                                                    {student.day[index].ok 
                                                    ? <button className='hour-btn check-time'>{student.day[index].time}</button>
                                                    : <Time
                                                    hours={student.day[index].time}
                                                    student={student}
                                                    day={day}
                                                /> }
                                                </span>
                                                <span> <input className='student-message-btn' type='checkbox' checked={student.day[String(index)].ok} onChange={() => checkLesson(student.id, index)} /> </span>
                                                &nbsp;
                                                <span className='student-message-btn' onClick={() => createMessage(student)}>{student.name}</span>
                                            </span>

                                            <span>
                                               {student.day[index].ok ? <Calendar2Check /> : <CloseButton onClick={() => deleteWeekLesson(student, index)} />}
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
