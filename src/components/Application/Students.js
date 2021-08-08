import React, { useState } from 'react'
import { useApp } from '../../contexts/AppContext'
import { Modal, Button, CloseButton, Form, Tabs, Tab } from 'react-bootstrap';
import { ChatDots, Phone } from 'react-bootstrap-icons';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import { BookmarkPlusFill, ShieldFillMinus } from 'react-bootstrap-icons';

export default function Students() {
    const [id, setId] = useState()


    const [index, setIndex] = useState(0)
    const [showOptions, setShowOptions] = useState(false);
    const [showBalance, setShowBalance] = useState();
    const [showName, setShowName] = useState();
    const [place, setPlace] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [skype, setSkype] = useState();
    const [note, setNote] = useState();
    const [hide, setHide] = useState();

    const [key, setKey] = useState('active');

    function resetMessage() {

        setShow(!show)
        messageReset(students[index])
        // students[index].message = ''
        setIndex(0)
    }


    const { students,
        deleteStudent,
        changeLessons,
        messageReset,
        updateUser,
        hideUsers
    } = useApp()



    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // const handleOptions = (i) => {
    //     setShowOptions(true)
    //     setIndex(i)
    //     setPlace(i)
    //     setShowName(students[i].name)
    //     setShowBalance((students[i].showBalance === undefined || students[i].showBalance === false) ? false : true)
    //     setPhone(students[i].phone)
    //     setEmail(students[i].email)
    //     setSkype(students[i].skype)
    //     setNote(students[i].note)
    //     setHide(students[i].hide)
    // }

    const handleOptions = (id, i) => {
        const currentStudent = students.find(student => student.id === id)
        setShowOptions(true)
        setIndex(i)
        setId(id)
        setPlace(i)
        setShowName(currentStudent.name)
        setShowBalance((currentStudent.showBalance === undefined || currentStudent.showBalance === false) ? false : true)
        setPhone(currentStudent.phone)
        setEmail(currentStudent.email)
        setSkype(currentStudent.skype)
        setNote(currentStudent.note)
        setHide(currentStudent.hide)
    }

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

            <Modal show={showOptions} onHide={() => setShowOptions(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Профиль студента</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <label className='mr-2'>Имя:</label>
                        <input type='text' value={showName} onChange={(e) => setShowName(e.target.value)} />
                        <br />
                        <input className='mr-2 mt-3' type='checkbox' checked={showBalance} onChange={(e) => setShowBalance(!showBalance)} />
                        <span>Скрыть баланс ученика</span>
                        <br />
                        <input className='mr-2 mt-3' type='checkbox' checked={hide} onChange={(e) => setHide(!hide)} />
                        <span>Отправить в отпуск</span>
                        <br />
                        <label className='mt-3'>Положение в списке:</label>
                        <select class="form-select" aria-label="Default select example" value={place} onChange={e => setPlace(e.target.value)}>
                            {/* <option selected>Выбрать место</option> */}
                            {students.filter(student => key == 'active' ? (student.hide == false || !student.hide) : student.hide == true).map((s, i) => {
                                return (
                                    <option value={i}>{i === index ? `${i + 1} - текущее положение` : i + 1}</option>
                                )
                            })}
                        </select>
                        <label className='mr-2'>Телефон:</label>
                        <input className='mt-3' type='text' value={phone} onChange={(e) => setPhone(e.target.value)} />
                        <br />
                        <label className='mr-2'>E-mail:</label>
                        <input className='mt-3' type='text' value={email} onChange={(e) => setEmail(e.target.value)} />
                        <br />
                        <label className='mr-2'>Skype:</label>
                        <input className='mt-3' type='text' value={skype} onChange={(e) => setSkype(e.target.value)} />
                        <br />
                        <label className='mt-3'>Заметки:</label>
                        <Form.Control
                            as="textarea"
                            placeholder="Напишите здесь"
                            value={note}
                            style={{ height: '150px' }}
                            onChange={(e) => setNote(e.target.value)}
                        />

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowOptions(false)}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={() => {
                        updateUser(id, showBalance, showName, place, phone, email, skype, note, hide)
                        setShowOptions(false)
                        setPlace(false)
                        if (hide) {
                            hideUsers(id)
                        }
                    }}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>

            <h1 className="text-light">Студенты - {students.filter(student => student.hide !== true).length}</h1>

            <Tabs
                id="students"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="d-flex justify-content-center mb-1 border-0"
            >
                <Tab eventKey="active" title={<BookmarkPlusFill />} tabClassName={key == 'active' ? 'text-secondary' : 'text-white'}>
                    <ul className='students-list-container' style={{ }}>
                        {students.filter(student => student.hide == false || !student.hide).map((student, i) => <li draggable="true" key={student.id} className="students-list" style={{ minHeight: '38px' }}>
                            <div className='student-list-info'>
                                <span onClick={() => {
                                    setIndex(i)
                                    handleShow()
                                }

                                } className={student.message ? `blink2` : `noblink`}> {student.message ? <ChatDots /> : ''}
                                    &nbsp;
                                </span>
                                <span className="index-student">{i + 1}. </span>

                                {/* <span className="student-name-index" > {student.name} </span> */}
                                <span className='student-message-btn' onClick={() => handleOptions(student.id, i)}>{student.name}</span>
                            </div>
                            <div className="student-list-controls">
                                <span className={student.balance > 0 ? 'student-balance' : 'student-balance minus-balance'}
                                >{(student.showBalance === undefined || student.showBalance === false) && student.balance}</span>

                                <span className="student-list-buttons">
                                    {
                                        (student.showBalance === undefined || student.showBalance === false) &&
                                        <span className="setect-btn">
                                            <button className='arrow-btn' onClick={() => changeLessons('up', student.id)}>&#9650;</button>
                                            <button className='arrow-btn' onClick={() => changeLessons('down', student.id)}> &#9660;</button>
                                        </span>
                                    }

                                    <span className="ml-3">
                                        <CloseButton onClick={() => deleteStudent(student.id)} />
                                    </span>
                                </span>

                            </div>
                        </li>
                        )}
                    </ul>
                </Tab>
                <Tab eventKey="hide" title={<ShieldFillMinus />} tabClassName={key == 'hide' ? 'text-secondary' : 'text-white'}>
                    <ul className='students-list-container'>
                        {students.filter(student => student.hide === true).map((student, i) => <li draggable="true" key={student.id} className="students-list" style={{ minHeight: '38px', backgroundColor: '#DCE8FA' }}>
                            <div className='student-list-info'>
                                <span onClick={() => {
                                    setIndex(i)
                                    handleShow()
                                }

                                } className={student.message ? `blink2` : `noblink`}> {student.message ? <ChatDots /> : ''}
                                    &nbsp;
                                </span>
                                <span className="index-student">{i + 1}. </span>

                                {/* <span className="student-name-index" > {student.name} </span> */}
                                <span className='student-message-btn' onClick={() => handleOptions(student.id, i)}>{student.name}</span>
                            </div>
                            <div className="student-list-controls">
                                <span className={student.balance > 0 ? 'student-balance' : 'student-balance minus-balance'}
                                >{(student.showBalance === undefined || student.showBalance === false) && student.balance}</span>

                                <span className="student-list-buttons">
                                    {
                                        (student.showBalance === undefined || student.showBalance === false) &&
                                        <span className="setect-btn">
                                            <button className='arrow-btn' onClick={() => changeLessons('up', student.id)}>&#9650;</button>
                                            <button className='arrow-btn' onClick={() => changeLessons('down', student.id)}> &#9660;</button>
                                        </span>
                                    }

                                    <span className="ml-3">
                                        <CloseButton onClick={() => deleteStudent(student.id)} />
                                    </span>
                                </span>

                            </div>
                        </li>
                        )}
                    </ul>
                </Tab>
            </Tabs>

        </>
    )
}
