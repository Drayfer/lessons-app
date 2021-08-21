import React from 'react'
import styles from './Footer.module.css'
import { useApp } from "../contexts/AppContext"

export const Footer = () => {

    const { students, lastWeekDays, nextWeekDays, options, weekTab } = useApp()

    let currentLessons = 0;
    const hideStudents = students.reduce((sum, current) => { 
        return current.hide ? sum + 1 : sum
    }, 0);
    const activeStudents = students.reduce((sum, current) => { 
        return !current.hide ? sum + 1 : sum
    }, 0);

    switch(weekTab) {
        case 'active': 
            currentLessons = students.reduce((sum, current) => { 
                return Object.values(current.day).reduce((s, c) => c.time !== 'none' ? s + 1 : s, 0) + sum
            }, 0);
            break;
        case 'past':
            currentLessons = Object.values(lastWeekDays).reduce((sum, current) => {
                return current.reduce((s, c) =>  s + 1, 0) + sum
            }, 0);
            break;
        case 'future':
            currentLessons = nextWeekDays.reduce((sum, current) => { 
                return Object.values(current.day).reduce((s, c) => c.time !== 'none' ? s + 1 : s, 0) + sum
            }, 0);
            break;
        default: currentLessons = 0
    }




console.log(hideStudents)
    return (
        <div className={styles.container}>
        <div style={{marginRight: '1rem'}}>Студенты активные: {activeStudents}</div>
        <div style={{marginRight: '1rem'}}>В отпуске: {hideStudents}</div>
        <div style={{marginRight: '1rem'}}> {weekTab === 'active' ? 'На этой неделе: ': weekTab === 'past' ? 'На прошлой неделе: ' : 'На следующей неделе: '} {currentLessons}</div>
        <div>Всего проведено: {options.countLessons}</div>
        </div>
    )
}
