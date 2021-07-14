import React, { useState, useRef } from 'react'
import WeekNow from './Weeks/WeekNow'
import LastWeek from './Weeks/LastWeek'
import { Tabs, Tab } from 'react-bootstrap';
import NextWeek from './Weeks/NextWeek';

export default function Week() {

    const [key, setKey] = useState('active');
    // className="bg-light d-flex justify-content-around flex-wrap" style={{ width: '100%' }}
    return (
        <div >
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
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
