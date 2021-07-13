import React, { useState, useRef, useEffect } from 'react'
import { useApp } from "../../../contexts/AppContext"
import { Modal, Button, Form, CloseButton } from 'react-bootstrap';
import './LastWeek.css'

export default function LastWeek() {
    const { DAYS, lastWeekDays } = useApp()


    return (
        <div className="bg-light d-flex justify-content-around flex-wrap">

            {DAYS.map((day, index) => {
                return (
                    <div className={(new Date()).getDay() - 1 === index ? "dayList active" : `dayList`}>
                        <h3 className="border primary text-body" style={(new Date()).getDay() - 1 === index ? { background: '#b1e6a9' } : { background: '#DAEAD7' }}>{day}</h3>
                        <div className="lessons" >
                            <div className='lessons-placeholder'>
                                {

                                    lastWeekDays[index] ? lastWeekDays[index].map(a => {

                                        return (
                                            <div className='students-list'>

                                                <span>
                                                    <span className='student-time'>
                                                        {a.time}
                                                    </span>
                                                
                                                    <span className='student-message-btn'>{a.name}</span>
                                                </span>
                                                <span>
                                                    1
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
