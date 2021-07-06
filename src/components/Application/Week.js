import React, { useState, useRef } from 'react'
import { useApp } from "../../contexts/AppContext"
import { Modal, Button, Form, Card } from 'react-bootstrap';
import Time from './Time'
import AddLesson from './AddLesson'


export default function Week() {



    const messageRef = useRef()
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [name, setName] = useState('')
    const [id, setId] = useState(0)

    const { DAYS, students, checkLesson, leaveMessage, deleteWeekLesson } = useApp()

    function createMessage(student) {
        // return <h1 className='abs'>!!!!!!!!</h1>
        handleShow()
        setName(student.name)
        setId(student.id)

    }

    function sendMessage(e) {
        e.preventDefault()
        leaveMessage(messageRef.current.value, id)
        handleClose()
    }


    return (
        <>
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

                    <div className="dayList">
                        <h2 className="border primary text-body" style={{background:'#DAEAD7'}}>{day}</h2>
                        <div className="lessons" >
                            <div className='lessons-placeholder'>
                                {students.slice().sort((a, b) => a.day[index].time.slice(0, 2) - b.day[index].time.slice(0, 2)).map((student, i) => {
                                    if (student.day[index].time !== 'none') {
                                        return (<div className='students-list'>

                                            <span>

                                                <Time
                                                    hours={student.day[index].time}
                                                    student={student}
                                                    day={day}

                                                />
                                                <span> <input className='student-message-btn' type='checkbox' checked={student.day[String(index)].ok} onChange={() => checkLesson(student.id, index)} /> </span>
                                                &nbsp;

                                            </span>
                                            <span className='student-message-btn' onClick={() => createMessage(student)}>{student.name}</span>
                                            <span>
                                                <Button variant="outline-secondary p-0 pr-1 pl-1" onClick={() => {
                                                deleteWeekLesson(student, index)

                                                }}>&times;</Button>
                                            </span>
                                        </div>
                                        )
                                    }

                                })}

                            </div>
                            <AddLesson index={index} />
                        </div>
                    </div>
                )
            })}
        </>
    )
}
