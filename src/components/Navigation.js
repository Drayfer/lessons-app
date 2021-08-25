import { Nav } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import React, { useState, useEffect } from "react"
import { Gear } from 'react-bootstrap-icons'
import { Modal, Button, Form, CloseButton } from 'react-bootstrap';
import { useApp } from "../contexts/AppContext"
import { Notes } from './Application/Notes'


export default function Navigation() {

    const { options, updateOptions } = useApp()
    const { currentUser, logout } = useAuth()

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [optionsNotification, setOptionsNotification] = useState();

    useEffect(() => {
        setOptionsNotification(options)
    })



    const handleSubmit = (e) => {
        e.preventDefault()
        updateOptions(optionsNotification)
        handleClose()
    }

    return (
        <>
            {optionsNotification && (
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Настройки</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={handleSubmit}>
                        <Modal.Body>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" checked={optionsNotification.notification}
                                    onChange={() => setOptionsNotification(optionsNotification, optionsNotification.notification = !optionsNotification.notification)}
                                    label={optionsNotification.notification ? 'Выключить уведомления' : 'Включить уведомления'}
                                />
                            </Form.Group>
                            {optionsNotification.notification && (
                                <>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>За сколько минут до урока уведомлять</Form.Label>
                                        <Form.Control type="text" value={optionsNotification.minutes}
                                            onChange={(e) => setOptionsNotification(optionsNotification, optionsNotification.minutes = +e.target.value)}
                                        />

                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Громкость уведомления</Form.Label>
                                        <input className='w-100' type="range" min="0" max="100" value={optionsNotification.volume}
                                            onChange={(e) => setOptionsNotification(optionsNotification, optionsNotification.volume = +e.target.value)}
                                        />
                                    </Form.Group>
                                </>
                            )
                            }
                            <Form.Group className="mb-3">
                                <Form.Label>Сбросить счетчик уроков: {options.countLessons}</Form.Label>
                                <Button className='ml-2' variant="outline-danger" size="sm" onClick={() => {
                                    setOptionsNotification(optionsNotification, optionsNotification.countLessons = 0)
                                }
                                }>Сброс</Button>
                            </Form.Group>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" type='submit'>
                                Сохранить
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal>
            )}




            <Nav className='d-flex justify-content-end bg-dark'>
                <Nav.Item>
                    <div className='focus-text text-white pt-2 pl-2 pr-2' ><Notes /></div>
                    {/* <Nav.Link className='focus-text text-white'><Notes /></Nav.Link> */}
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className='focus-text text-white' onClick={handleShow}><Gear /></Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className='focus-text text-white' href="/update-profile">{currentUser.email}</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className='focus-text text-white' onClick={logout}>Выйти</Nav.Link>
                </Nav.Item>
            </Nav>
        </>
    )
}
