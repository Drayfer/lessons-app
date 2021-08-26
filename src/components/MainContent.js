import React from "react"
import './App.css'
import Sidebar from './Sidebar'
import AddStudent from './Application/AddStudent'
import NewWeek from './Application/NewWeek'

import Week from './Application/Week'
import { useApp } from "../contexts/AppContext"

export default function MainContent() {

  const { handleLight } = useApp()
  return (
    <>
      <div className="d-flex justify-content-between" style={{ minHeight: '100vh' }} onClick={e => typeof(e.target.className) == 'string' && !e.target.className.includes('students-list') && handleLight('')}>
        <div className="bg-secondary text-center" style={{ minWidth: '300px', background: 'linear-gradient(90deg, #29323C 0%, #485563 100%)' }}>
          <div className='fixed-sidebar' style={{ paddingBottom: '2rem' }}>
            <Sidebar />
            <AddStudent />
            <NewWeek />
          </div>
        </div>
        <div style={{ backgroundColor: '#f8f9fa' }} >
          <Week />
        </div>
      </div>
    </>
  )
}
