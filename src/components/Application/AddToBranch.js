import React, { useState } from 'react'
import './AddLesson.css'
import { useApp } from '../../contexts/AppContext'
import { Button, Modal } from 'react-bootstrap'
import { PlusCircle } from 'react-bootstrap-icons';

export default function AddToBranch() {
    const { students, addToBranch } = useApp()

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [ids, setIds] = useState([])

    function changeClass(event) {
        event.target.className === 'student-item' ? event.target.className = 'student-item choose' : event.target.className = 'student-item'
    }

    function showRes(event) {
        event.preventDefault()
        handleClose()
        addToBranch(ids)
        setIds([])

    }
    return (
        <>
           
            <PlusCircle className="create-lesson-btn" onClick={handleShow}/>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Без категории</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <ul className='choose-students-list'>
                        {students.filter(student => student.hide === false || !student.hide).map(student => {
                            if(student.branch == 'Общая категория' || !student.branch) {
                                return <li className='student-item' key={student.id} onClick={(event) => {
                                    changeClass(event)
                                    ids.includes(student.id) 
                                    ? setIds([...ids.filter(item => item != student.id)])
                                    : setIds([...ids.concat(student.id)])
                                }}>
                    
                                    {student.name}
                                    {student.lastname && ` ${student.lastname}`}
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