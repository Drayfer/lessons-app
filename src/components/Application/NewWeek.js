import React, { useState } from 'react'
import { useApp } from '../../contexts/AppContext'
import { Modal, Button } from 'react-bootstrap';

export default function NewWeek() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {

        const update = window.confirm('Вы точно хотите обновить?')
        if (update) {
            setShow(true)
            updateWeek()
        }
    };

    const { updateWeek } = useApp()

    return (
        <>
            <Button variant="outline-success" className='mt-3' onClick={handleShow}>
                Новая неделя
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Обновление данных</Modal.Title>
                </Modal.Header>
                <Modal.Body>Данные на новую неделю обновлены!</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleClose}>
                        Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
