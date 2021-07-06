import React, { useState, useEffect } from 'react'
import { useApp } from '../../contexts/AppContext'
import { Modal, Button } from 'react-bootstrap';

export default function Students() {

    const [index, setIndex] = useState(0)
    const [messageBlick, setMessageBlick] = useState('icon-message')


    function resetMessage() {
        setShow(!show)
        messageReset(students[index])
        // students[index].message = ''
        setIndex(0)
    }


    useEffect(() => {
        const interval = setInterval(() => {
            messageBlick === 'icon-message' ? setMessageBlick('icon-message hide') : setMessageBlick('icon-message')
        }, 500);
        return () => clearInterval(interval)
    }, [messageBlick]);


    const { students,
        deleteStudent,
        changeLessons,
        messageReset } = useApp()



        const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);


    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Напоминание</Modal.Title>
                </Modal.Header>
                <Modal.Body>{students.length > 0 && students[index].message}</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => {
                        handleClose()
                        resetMessage()
                    }}>
                        Прочитано
                    </Button>
                </Modal.Footer>
            </Modal>

            <h1 className="pb-4 text-light">Студенты - {students.length}</h1>
            <ul className='students-list-container'>
                {students.map((student, index) => <li draggable="true" key={student.name} className="students-list">
                    <span onClick={() => {
                        handleShow()
                        setIndex(index)
                    }

                    } className={student.message ? `${messageBlick}` : null}> </span>
                    <span className="index-student">{index + 1}. </span>
                    <span className="student-name-index" > {student.name} </span>
                    <span className={student.balance > 0 ? 'student-balance' : 'student-balance minus-balance'}>{student.balance}</span>


                    <span className="setect-btn">
                        <button className='arrow-btn' onClick={() => changeLessons('up', student.id)}>&#9650;</button>
                        <button className='arrow-btn' onClick={() => changeLessons('down', student.id)}> &#9660;</button>
                    </span>


                    {/* <button className='students-list-delete' onClick={() => deleteStudent(student.id)}>&times;</button> */}
                    <Button variant="outline-secondary p-0 pr-1 pl-1" onClick={() => deleteStudent(student.id)}>&times;</Button>
                </li>
                )}
            </ul>
        </>
    )
}
