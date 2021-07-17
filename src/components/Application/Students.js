import React, { useState } from 'react'
import { useApp } from '../../contexts/AppContext'
import { Modal, Button, CloseButton } from 'react-bootstrap';
import { ChatDots } from 'react-bootstrap-icons';
import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';

export default function Students() {

    const [index, setIndex] = useState(0)
    const [showOptions, setShowOptions] = useState(false);
    const [showBalance, setShowBalance] = useState();
    const [showName, setShowName] = useState();

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
     } = useApp()



    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleOptions = (index) => {
        setShowOptions(true)
        setIndex(index)
        setShowName(students[index].name)
        setShowBalance((students[index].showBalance === undefined || students[index].showBalance === false) ? false : true )
      
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
                    <Modal.Title>Настройки</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                       
                      
                        <label>Изменить имя </label>
                        <br />
                        <input type='text' value={showName} onChange={(e) => setShowName(e.target.value) } /> 
                        <br />
                        <input type='checkbox' checked={showBalance} onChange={(e) => setShowBalance(!showBalance) } style={{marginTop: '20px'}}/> 
                        &nbsp;
                        <span>Скрыть баланс ученика</span>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowOptions(false)}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={() => {
                        updateUser(students[index].id, showBalance, showName)
                        setShowOptions(false)
                    }}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>

            <h1 className="pb-4 text-light">Студенты - {students.length}</h1>
            <ul className='students-list-container'>
                {students.map((student, index) => <li draggable="true" key={student.name} className="students-list" style={{minHeight: '38px'}}>
                    <div className='student-list-info'>
                        <span onClick={() => {
                            handleShow()    
                            setIndex(index)
                        }

                        } className={student.message ? `blink2` : `noblink`}> {student.message ? <ChatDots /> : ''}
                            &nbsp;
                        </span>
                        <span className="index-student">{index + 1}. </span>

                        {/* <span className="student-name-index" > {student.name} </span> */}
                        <span className='student-message-btn' onClick={() => handleOptions(index)}>{student.name}</span>
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
        </>
    )
}
