import React, { useState } from 'react'
import { useApp } from '../../contexts/AppContext'
import { Modal, Button, CloseButton, Form, Tabs, Tab } from 'react-bootstrap';
import { ChatDots, NutFill, Phone } from 'react-bootstrap-icons';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';
import { BookmarkPlusFill, CalendarMinusFill, RecordCircleFill } from 'react-bootstrap-icons';
import { Branch } from './Branch';
import { SelectBranch } from './SelectBranch';
import AddToBranch from './AddToBranch'


export default function Students() {
    const [id, setId] = useState()
    let filter = 0


    const [index, setIndex] = useState(0)
    const [showOptions, setShowOptions] = useState(false);
    const [showBalance, setShowBalance] = useState();
    const [showName, setShowName] = useState();
    const [showLastName, setShowLastName] = useState();
    const [place, setPlace] = useState();
    const [phone, setPhone] = useState();
    const [email, setEmail] = useState();
    const [skype, setSkype] = useState();
    const [note, setNote] = useState();
    const [hide, setHide] = useState();
    const [branch, setBranch] = useState('Общая категория');

    const [key, setKey] = useState('active');

    function resetMessage() {

        setShow(!show)
        messageReset(id)
        // students[index].message = ''
        setIndex(0)
    }


    const { students,
        deleteStudent,
        changeLessons,
        messageReset,
        updateUser,
        hideUsers,
        lightCheck,
        handleLight,
        options
    } = useApp()



    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    const handleOptions = (id, i) => {
        const currentStudent = students.find(student => student.id === id)
        setShowOptions(true)
        setIndex(i)
        setId(id)
        setPlace(i)
        setShowName(currentStudent.name)
        setShowLastName(currentStudent.lastname)
        setShowBalance((currentStudent.showBalance === undefined || currentStudent.showBalance === false) ? false : true)
        setPhone(currentStudent.phone)
        setEmail(currentStudent.email)
        setSkype(currentStudent.skype)
        setNote(currentStudent.note)
        setHide(currentStudent.hide)
        setBranch(currentStudent.branch === undefined ? 'Общая категория' : currentStudent.branch)
    }

    const changeBranche = e => setBranch(e)


    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Напоминание</Modal.Title>
                </Modal.Header>
                {/* <Modal.Body>{students.length > 0 && id !== undefined && students.find(s => s.id == id).message}</Modal.Body> */}
                <Modal.Body>{students.length > 0 && id !== undefined && students.find(s => s.id == id) !== undefined && students.find(s => s.id == id).message}</Modal.Body>
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
                        <input type='text' value={showName} placeholder='Имя' onChange={(e) => setShowName(e.target.value)} />
                        &nbsp;
                        <input type='text' value={showLastName} placeholder='Фамилия' onChange={(e) => setShowLastName(e.target.value)} />
                        <br />
                        <div className='mt-2'><SelectBranch func={changeBranche} place={branch} /></div>
                        <input className='mr-2 mt-3' type='checkbox' checked={showBalance} onChange={(e) => setShowBalance(!showBalance)} />
                        <span>Скрыть баланс ученика</span>
                        <br />
                        <input className='mr-2 mt-3' type='checkbox' checked={hide} onChange={(e) => setHide(!hide)} />
                        <span>Отправить в отпуск</span>
                        <br />
                        <label className='mt-3'>Положение в списке:</label>
                        <select class="form-select" aria-label="Default select example" value={place} onChange={e => setPlace(e.target.value)}>
                            {/* <option selected>Выбрать место</option> */}
                            {students.filter(student => key === 'active' ? (student.hide === false || !student.hide) : student.hide === true).map((s, i) => {
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
                        updateUser(id, showBalance, showName, showLastName, branch, place, phone, email, skype, note, hide)
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

            {/* <h1 className="text-light">Студенты - {students.filter(student => student.hide !== true).length}</h1> */}

            <Branch />
            <Tabs
                id="students"
                activeKey={key}
                onSelect={(k) => setKey(k)}
                className="d-flex justify-content-center mb-1 border-0"
            >
                <Tab eventKey="active" title={<BookmarkPlusFill />} tabClassName={key == 'active' ? 'text-secondary' : 'text-white'}>
                    <ul className='students-list-container'>
                        {filter = students.filter(student => student.hide == false || !student.hide)
                            .filter(student => options.activeBranch == student.branch
                                || (options.activeBranch == 'Общая категория')
                            )
                            .map((student, i) => <li
                                draggable="true"
                                key={student.id}
                                className={lightCheck == student.id ? 'students-list lightcheck' : 'students-list'}
                                style={{ minHeight: '38px' }}
                                onClick={() => handleLight(student.id)}
                            >
                                <div className='student-list-info'>
                                    <span onClick={(e) => {
                                        e.stopPropagation()
                                        setId(student.id)
                                        handleShow()
                                    }

                                    } className={student.message ? `blink2` : `noblink`}> {student.message ? <ChatDots /> : ''}
                                        &nbsp;
                                    </span>
                                    <span className="index-student">
                                        <RecordCircleFill
                                            className='circle'

                                            style={{
                                                color: options.activeBranch == 'Общая категория'
                                                    ? (!student.branch || student.branch == 'Общая категория' ? null : (options.branches.find(item => item.id == student.branch) && options.branches.find(item => item.id == student.branch).color))
                                                    : options.branches.find(item => item.id == student.branch).color
                                            }}
                                        />
                                    </span>

                                    {/* <span className="student-name-index" > {student.name} </span> */}
                                    <span className='student-message-btn' onClick={(e) => {
                                        e.stopPropagation()
                                        handleOptions(student.id, i)
                                    }}>{`${student.name} ${(student.lastname !== undefined && student.lastname !== '') ? student.lastname.slice(0, 1).concat('.') : ''}`}</span>
                                </div>
                                <div className="student-list-controls">
                                    <span className={student.balance > 0 ? 'student-balance' : 'student-balance minus-balance'}
                                    >{(student.showBalance === undefined || student.showBalance === false) && student.balance}</span>

                                    <span className="student-list-buttons">
                                        {
                                            (student.showBalance === undefined || student.showBalance === false) &&
                                            <span className="setect-btn">
                                                <button className='arrow-btn' onClick={(e) => {
                                                    e.stopPropagation()
                                                    changeLessons('up', student.id)
                                                }}>&#9650;</button>
                                                <button className='arrow-btn' onClick={(e) => {
                                                    e.stopPropagation()
                                                    changeLessons('down', student.id)
                                                }}> &#9660;</button>
                                            </span>
                                        }

                                        <span className="ml-3">
                                            <CloseButton onClick={(e) => {
                                                e.stopPropagation()
                                                deleteStudent(student.id)
                                            }} />
                                        </span>
                                    </span>

                                </div>
                            </li>
                            )
                        }
                    </ul>


                    {<div className='students-list-container'>
                        {filter == 0 && <p className='text-light mt-3'>Нет студентов</p>}
                        {options.activeBranch != 'Общая категория'
                            && students.filter(student => student.hide === false || !student.hide)
                                .filter(student => student.branch == 'Общая категория' || !student.branch)
                                .length !== 0
                            && <div style={{ marginTop: '-1rem', color: 'white' }}><AddToBranch /></div>}
                    </div>}

                </Tab>
                <Tab eventKey="hide" title={<CalendarMinusFill />} tabClassName={key == 'hide' ? 'text-secondary' : 'text-white'}>
                    <ul className='students-list-container'>
                        {students.filter(student => student.hide === true)
                        .filter(student => options.activeBranch == student.branch
                            || (options.activeBranch == 'Общая категория')
                        )
                        .map((student, i) => <li
                            draggable="true"
                            key={student.id}
                            className='students-list'
                            style={{ minHeight: '38px', backgroundColor: '#DCE8FA' }}

                        >

                            <div className='student-list-info'>
                                <span onClick={(e) => {
                                    e.stopPropagation()
                                    setIndex(i)
                                    setId(student.id)
                                    handleShow()
                                }

                                } className={student.message ? `blink2` : `noblink`}> {student.message ? <ChatDots /> : ''}
                                    &nbsp;
                                </span>
                                <span className="index-student">
                                        <RecordCircleFill
                                            className='circle'

                                            style={{
                                                color: options.activeBranch == 'Общая категория'
                                                    ? (!student.branch || student.branch == 'Общая категория' ? null : (options.branches.find(item => item.id == student.branch) && options.branches.find(item => item.id == student.branch).color))
                                                    : options.branches.find(item => item.id == student.branch).color
                                            }}
                                        />
                                    </span>

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
                                            <button className='arrow-btn' onClick={(e) => {
                                                e.stopPropagation()
                                                changeLessons('up', student.id)
                                            }}>&#9650;</button>
                                            <button className='arrow-btn' onClick={(e) => {
                                                e.stopPropagation()
                                                changeLessons('down', student.id)
                                            }}> &#9660;</button>
                                        </span>
                                    }

                                    <span className="ml-3">
                                        <CloseButton onClick={(e) => {
                                            e.stopPropagation()
                                            deleteStudent(student.id)
                                        }} />
                                    </span>
                                </span>

                            </div>
                        </li>
                        )}
                    </ul>
                </Tab>
            </Tabs>

        </div>
    )
}
