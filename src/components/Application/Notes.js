import React, { useState } from 'react'

import { useApp } from '../../contexts/AppContext'
import { Button, Modal, Form, CloseButton, ListGroup } from 'react-bootstrap'
import { Bell } from 'react-bootstrap-icons';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ru from 'date-fns/locale/ru';
import styles from './Notes.module.css'
import { NotesNotification } from './NotesNotification';


export const Notes = () => {
    const { options, updateOptions, today } = useApp()
    const [startDate, setStartDate] = useState(new Date());


    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [input, setInput] = useState('');
    const [notes, setNotes] = useState([]);



    const addNote = (e) => {
        e.preventDefault()
        if (input.trim() && startDate > new Date().setMinutes(new Date().getMinutes() + 1)) {
            updateOptions(options, options.notes = [{ id: Date.now(), text: input, time: startDate, confirm: false }, ...options.notes])
            setInput('')
        }

    }

    const deleteNote = id => {
        updateOptions(options, options.notes = [...options.notes.filter(note => note.id !== id)])
        // updateOptions([...options.notes.filter(note => note.id !== id)])
    }

    const ExampleCustomInput = React.forwardRef(({ value, onClick }, ref) => (
        <button className="example-custom-input" onClick={onClick} ref={ref}>
            {value}
        </button>
    ));



    return (
        <div>
            <NotesNotification />
            <div className={styles.btn__nav} onClick={handleShow} >
                <Bell />
                {options.notes.length !== 0 && <span className={styles.countnotes}>{options.notes.length}</span>}
            </div>

            <Modal show={show} onHide={handleClose} size='lg'>
                <Modal.Header closeButton>
                    <Modal.Title>Напоминания</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3 d-flex align-items-center">
                            <Form.Control className='mr-2' type="text" placeholder="Текст напоминания"
                                value={input}
                                onInput={e => setInput(e.target.value)}
                            />
                            <div className='p-0 mr-2'>
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    timeFormat="H:mm"
                                    locale={ru}
                                    minDate={new Date()}
                                    timeIntervals={15}
                                    showTimeSelect
                                    dateFormat="d MMM yyyy, H:mm"
                                />
                            </div>

                            <Button variant="primary" type="submit" size="sm" onClick={e => addNote(e)}>
                                ОК
                            </Button>
                        </Form.Group>
                    </Form>
                    {options.notes.length == 0 && <p className='text-secondary text-center'>Нет записей</p>}
                    <ListGroup>
                        {options.notes.map(note => {
                            return <ListGroup.Item className='d-flex justify-content-between align-items-center' key={note.id}>
                                {/* {showNotification(note.text, note.confirm, note.time)} */}
                                <div>
                                    {/* <span className='text-secondary mr-2' style={{ fontSize: '.8rem' }}>
                                        {new Date(note.id).toLocaleTimeString(navigator.language, {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                    </span> */}
                                    <span>{note.text}</span>    
                                </div>
                                <div>
                                    <span className='text-secondary mr-2' style={{ fontSize: '.8rem' }}>
                                        {note.time.seconds ? note.time.toDate().toLocaleString('ru-RU') : new Date(note.time).toLocaleString('ru-RU')}
                                    </span>
                                    <CloseButton onClick={() => deleteNote(note.id)} />
                                </div>
                                {/* {note.time.seconds ? Date.parse(note.time.toDate()) : new Date(note.time).toLocaleString('ru-RU')}  */}

                            </ListGroup.Item>

                        })}
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}




