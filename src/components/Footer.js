import React from 'react'
import styles from './Footer.module.css'
import { useApp } from "../contexts/AppContext"

export const Footer = () => {

    const { students, options } = useApp()

    const currentLessons = students.reduce((sum, current) => { 
        return Object.values(current.day).reduce((s, c) => c.time !== 'none' ? s + 1 : s, 0) + sum
    }, 0)

    return (
        <div className={styles.container}>
        <div style={{marginRight: '1rem'}}>На этой неделе: {currentLessons}</div>
        <div>Всего проведено: {options.countLessons}</div>
        </div>
    )
}
