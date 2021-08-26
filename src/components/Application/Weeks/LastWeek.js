import React, { useState, useRef, useEffect } from 'react'
import { useApp } from "../../../contexts/AppContext"
import { Modal, Button, Form, CloseButton } from 'react-bootstrap';
import { Calendar2Check, RecordCircleFill } from 'react-bootstrap-icons';
import './LastWeek.css'

export default function LastWeek() {
    const { DAYS, lastWeekDays, students, lightCheck, handleLight, options } = useApp()
    let activeBranch = 0


    return (
        <div className="bg-light d-flex justify-content-around flex-wrap">

            {DAYS
            .map((day, index) => {
                return (    
                    <div className='dayList day-lastweek'>
                        <h3 className="border primary text-body" style={{ background: 'rgb(249, 255, 206)' }}>{day}</h3>
                        <div className="lessons" >
                            <div className='lessons-placeholder'>
                                {

                                    lastWeekDays[index] ? lastWeekDays[index]
                                    .filter(item =>students.find(student => student.id == item.id) && students.find(student => student.id == item.id).branch == options.activeBranch || options.activeBranch == 'Общая категория')
                                    .map((student, i) => {
                                        activeBranch = students.find(st => st.id == student.id) && students.find(st => st.id == student.id).branch
                                        return (
                                            <div onClick={() => handleLight(student.id)}
                                                className={lightCheck == student.id ? 'students-list last-week lightcheck' : 'students-list last-week'}
                                            >
                                                

                                                <span>
                                                <RecordCircleFill
                                                        className='circle'
                                                        style={{
                                                            color: options.activeBranch == 'Общая категория'
                                                                ? (!activeBranch|| activeBranch == 'Общая категория' ? null : (options.branches.find(item => item.id == activeBranch) && options.branches.find(item => item.id == activeBranch).color))
                                                                : options.branches.find(item => item.id == activeBranch).color
                                                        }}
                                                    />
                                                    <span className='student-time'>
                                                        <button className='check-time'>{student.time}</button>
                                                    </span>

                                                    <span className='student-message-btn'>{students.map(s => s.id == student.id && `${s.name} ${(s.lastname && s.lastname !== '') ? s.lastname.slice(0, 1).concat('.') : ''}`)}</span>
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
