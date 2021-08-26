import React, { useState, useRef, useEffect } from 'react'
import { useApp } from '../../contexts/AppContext'
import { Button, Form, Modal } from 'react-bootstrap'
import { SelectBranch } from './SelectBranch'

export default function AddStudent() {

    const { createStudent, options } = useApp()
    const nameRef = useRef()
    const numberRef = useRef()

    const [student, setStudent] = useState({ id: 0, name: '', balance: '' })
    const [branch, setBranch] = useState(String(options.activeBranch))

    useEffect(() => {
        setBranch(String(options.activeBranch))
    }, [options.activeBranch])

    function handleSubmitInput(event) {
        event.preventDefault()
        if (nameRef.current.value.trim() && numberRef.current.value.trim()) {
            if (Number(numberRef.current.value) || Number(numberRef.current.value) === 0) {
                createStudent(nameRef.current.value, Number(numberRef.current.value), branch)
                setStudent({ ...student, name: '', balance: '' })
                setShow(false)
                setBranch(String(options.activeBranch))
                return;
            }
            alert("Введите правильное значение в поле 'Оплаченные уроки'")
        }
    }



    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false)
        setBranch(String(options.activeBranch))
    };
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

                        <Form.Group className="mb-3" controlId="formBranch">
                            <SelectBranch place={branch} func={(e) => setBranch(e)} />
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
        </>
    )
}
