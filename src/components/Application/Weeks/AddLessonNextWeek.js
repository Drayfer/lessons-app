import React, { useState } from 'react'
import './../AddLesson.css'
import { useApp } from '../../../contexts/AppContext'
import { Button, Modal } from 'react-bootstrap'
import { PlusCircle } from 'react-bootstrap-icons';

export default function AddLessonNextWeek({ index }) {
    const { setLessons, DAYS, nextWeekDays, students, options } = useApp()

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    const [selectNames, setSelectNames] = useState([])

    function changeClass(event, id) {
        event.target.className === 'student-item' ? event.target.className = 'student-item choose' : event.target.className = 'student-item'
        selectNames.includes(id) ? setSelectNames([...selectNames.filter(item => item !== id)]) : setSelectNames([...selectNames, id])
    }

    function showRes(event) {
        event.preventDefault()
        handleClose()
        setLessons(selectNames, index, 1)
        setSelectNames([])

    }
    return (
        <>
            <PlusCircle className="create-lesson-btn" onClick={handleShow} />


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{DAYS[index]}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul className='choose-students-list'>
                        {nextWeekDays
                        .filter(student => students.find(st => st.id == student.id).branch == options.activeBranch || options.activeBranch == 'Общая категория')
                        .map(student => {
                            if (student.day[index].time === 'none'
                                // && students.find(s => s.id === student.id).hasOwnProperty('hide') === false
                                && students.find(s => s.id === student.id).hide !== true
                            ) {
                                return <li className='student-item' key={student.id} onClick={(event) => changeClass(event, student.id)}>
                                    {students.map(s => s.id === student.id && (s.lastname ? `${s.name} ${s.lastname}` : `${s.name}`) )}
                                    {/* {`${student.name} `}
                                   // {student.lastname && student.lastname} */}
                                   
                                </li>
                            } else return null

                        })}
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={showRes}>
                        Добавить
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}