import React, { useState } from 'react'
import { useApp } from "../../contexts/AppContext"
import { Modal, Button } from 'react-bootstrap';

import './Time.css'

export default function Time({ day, student, hours, nextWeek=false }) {

    const { sendTime } = useApp()


    const [time, setTime] = useState(hours)
    



    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    function createTime() {
        sendTime(time, student, day, nextWeek)
        handleClose()
        // setTime(hours)
        
    }

    function setStudentTime(arrow) {
        let partTime
        function formatTimeHours(time) {
            if (time > 24) {
                time = '1'
            } if (time < 10) {
                time = `0${time}`
            } if (time < 1) {
                time = 24
            }
            return time
        }

        function formatTimeMinute(time) {
            if (time === 0) {
                time = '00'
            }
            if (time < 0) {
                time = '45'
            }
            if (time === 60) {
                time = '00'
            }
            return time
        }

        switch (arrow) {

            case 'hourPlus':
                partTime = parseInt(time.slice(0, 2)) + 1
                setTime(`${formatTimeHours(partTime)}:${time.slice(3, 5)}`)
                break;
            case 'hourMinus':
                partTime = parseInt(time.slice(0, 2)) - 1
                setTime(`${formatTimeHours(partTime)}:${time.slice(3, 5)}`)
                break;
            case 'minutePlus':
                partTime = parseInt(time.slice(3, 5)) + 15
                setTime(`${time.slice(0, 2)}:${formatTimeMinute(partTime)}`)
                break;
            case 'minuteMinus':
                partTime = parseInt(time.slice(3, 5)) - 15
                setTime(`${time.slice(0, 2)}:${formatTimeMinute(partTime)}`)
                break;
            default:
                break;
        }

    }


    return (
        <>


            <button className="hour-btn" onClick={handleShow}>{hours}</button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{day}</Modal.Title>
                </Modal.Header>
                <Modal.Body className='d-flex flex-column align-items-center'>
                    
                    <h2 className='student-name-time'>{student.name}</h2>

                    <h3>Старое время: {hours}</h3>
                    <div className='modal-content-time' >
                        <div className='time-elem'>
                            <button className="arrow-time" onClick={() => setStudentTime('hourPlus')}>&#9650;</button>
                            <div>{time.slice(0, 2)}</div>
                            <button className="arrow-time" onClick={() => setStudentTime('hourMinus')}>&#9660;</button>
                        </div>
                        <div className='time-elem'><div>:</div></div>
                        <div className='time-elem'>
                            <button className="arrow-time" onClick={() => setStudentTime('minutePlus')}>&#9650;</button>
                            <div>{time.slice(3, 6)}</div>
                            <button className="arrow-time" onClick={() => setStudentTime('minuteMinus')}>&#9660;</button>
                        </div>

                    </div>
              
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={createTime}>
                        Обновить
                    </Button>
                </Modal.Footer>
            </Modal>


            {/* <button>{hours}</button> */}


            {/* {isOpen && (<div className="modal-time">
            <div className="modal-body-time">
            <button className='close-btn' onClick={() => setIsOpen(!isOpen)}>&times;</button>
                <h2>{day}</h2>
                <h2 className='student-name-time'>{student.name}</h2>
            
                
               <div className='modal-content-time' >
                <div className='time-elem'>
                    <button className="arrow-time" onClick={() => setStudentTime('hourPlus')}>&#9650;</button>
                    <div>{time.slice(0, 2)}</div>
                    <button className="arrow-time" onClick={() => setStudentTime('hourMinus')}>&#9660;</button>
                </div>
                <div className='time-elem'><div>:</div></div>
                <div className='time-elem'>
                    <button className="arrow-time" onClick={() => setStudentTime('minutePlus')}>&#9650;</button>
                    <div>{time.slice(3, 6)}</div>
                    <button className="arrow-time" onClick={() => setStudentTime('minuteMinus')}>&#9660;</button>
                </div>
                
               </div>
               <div className="button-time"><button className='student-submit' onClick={() => createTime()}>Обновить</button></div>
               
            </div>
            
        </div>)} */}
        </>
    )
}