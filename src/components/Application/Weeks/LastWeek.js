import React, { useState, useRef, useEffect } from 'react'
import { useApp } from "../../../contexts/AppContext"
import { Modal, Button, Form, CloseButton } from 'react-bootstrap';
import { Calendar2Check } from 'react-bootstrap-icons';
import './LastWeek.css'

export default function LastWeek() {
    const { DAYS, lastWeekDays, students, lightCheck, handleLight } = useApp()


    return (
        <div className="bg-light d-flex justify-content-around flex-wrap">

            {DAYS.map((day, index) => {
                return (
                    <div className='dayList day-lastweek'>
                        <h3 className="border primary text-body" style={{ background: 'rgb(249, 255, 206)' }}>{day}</h3>
                        <div className="lessons" >
                            <div className='lessons-placeholder'>
                                {

                                    lastWeekDays[index] ? lastWeekDays[index].map((student, i) => {

                                        return (
                                            <div onClick={() => handleLight(student.id)}
                                                className={lightCheck == student.id ? 'students-list last-week lightcheck' : 'students-list last-week'}
                                            >


                                                <span>
                                                    <span className='student-time'>
                                                        <button className='check-time'>{student.time}</button>
                                                    </span>

                                                    <span className='student-message-btn'>{
                                                        students.find(s => s.id == student.id) &&
                                                        `${students.find(s => s.id == student.id).name} 
                                                        ${(students.find(s => s.id == student.id).lastname !== undefined && students.find(s => s.id == student.id).lastname !== '')
                                                            ? students.find(s => s.id == student.id).lastname.slice(0, 1).concat('.')
                                                            : ''}`
                                                    }</span>
                                                </span>
                                                <span>
                                                    <Calendar2Check />
                                                </span>
                                            </div>
                                        )
                                    }) : ''

                                }

                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
