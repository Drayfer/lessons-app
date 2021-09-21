import React, { useState, useRef } from 'react'
import WeekNow from './Weeks/WeekNow'
import LastWeek from './Weeks/LastWeek'
import { Tabs, Tab } from 'react-bootstrap';
import NextWeek from './Weeks/NextWeek';
import { useApp } from "../../contexts/AppContext"

export default function Week() {
    const { weekTab, setWeekTab } = useApp()
    
    return (
        <div>
            <Tabs
                id="controlled-tab-example"
                activeKey={weekTab}
                onSelect={(k) => setWeekTab(k)}
                className="d-flex justify-content-center bg-light"
            >
                <Tab eventKey="past" title="Прошлая" tabClassName='text-secondary'>
                    <LastWeek />
                </Tab>
                <Tab eventKey="active" title="Текущая" tabClassName='text-secondary'>
                    <WeekNow />
                </Tab>
                <Tab eventKey="future" title="Следующая" tabClassName='text-secondary'>
                <NextWeek />
                </Tab>  
            </Tabs>
        </div>
    )
}
