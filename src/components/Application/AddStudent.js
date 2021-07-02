import React, { useState, useRef } from 'react'
import { useApp } from '../../contexts/AppContext'
import './AddStudent.css'
import { Button, Form, Modal } from 'react-bootstrap'

export default function AddStudent() {

    const { createStudent } = useApp()
    const nameRef = useRef()
    const numberRef = useRef()

    const [student, setStudent] = useState({ id: 0, name: '', balance: '' })
    const [messageShow, setMessageShow] = useState(false)

    function handleSubmitInput(event) {
        event.preventDefault()
        if (nameRef.current.value.trim() && numberRef.current.value.trim()) {
            if (!Number(numberRef.current.value)) {
                alert("Введите правильное значение в поле 'Оплаченные уроки'")
                return;
            }
            createStudent(nameRef.current.value, Number(numberRef.current.value))
            setStudent({ ...student, name: '', balance: '' })
            setMessageShow(false)
            setShow(false)
        } else {
            setMessageShow(true)
        }
    }



    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button variant="outline-secondary" className="text-light" onClick={handleShow}>
                Добавить студента
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Добавить студента</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmitInput}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Имя ученика</Form.Label>
                            <Form.Control type="text" placeholder="Имя ученика" ref={nameRef} required />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Оплаченные уроки:</Form.Label>
                            <Form.Control type="text" placeholder="5" ref={numberRef} required />
                        </Form.Group>
                        <Button variant="primary" type='submit'>
                        Сохранить
                    </Button>
                    </Form>
                </Modal.Body>
             
            </Modal>
            {/* 
            <Button className="btn btn-outline-secondary bg-secondary text-light" onClick={() => setIsOpen(!isOpen)}>Добавить студента</Button>
            {isOpen && (<div className="modal1">
                <div className='modal-body'>
                <Button className='btn btn-danger float-right' onClick={() => setIsOpen(!isOpen)}>&times;</Button>

                </div>

            </div>)} */}

            {/* {isOpen && (<div className="modal1">
                <div className="modal-body">
                    <button className='close-btn' onClick={() => setIsOpen(!isOpen)}>&times;</button>
                    <div><span className='student-name'>{student.name}</span> <span className='student-name uroki'>{student.balance}</span>
                        <span>{student.balance ? <span className='student-name uroki'>уроков</span> : null}</span>
                    </div>
                    <form className='modal-content' onSubmit={handleSubmitInput}>
                        <div>
                            <label htmlFor='text'>Имя ученика:</label>
                            &nbsp;
                            <input autoFocus type='text' placeholder='Имя ученика' value={student.name} onChange={event => setStudent({ ...student, name: event.target.value })} />
                        </div>
                        <div>
                            <label htmlFor='text'>Оплаченные уроки:</label>
                            &nbsp;
                            <input type='text' placeholder='5' value={student.balance} onChange={event => setStudent({ ...student, balance: event.target.value })} />
                        </div>
                        {messageShow ? <p className='warning-message-addstudent'>* заполните необходимые поля</p> : null}
                        <button className='student-submit' type='submit' onClick={handleSubmitInput}>Добавить</button>
                    </form>

                </div>
            </div>)} */}
        </>
    )
}
