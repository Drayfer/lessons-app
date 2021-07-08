import React from "react"
import Navigation from './Navigation'
// import './Dashboard.css'
import './App.css'
import Sidebar from './Application/Sidebar'

import Students from './Application/Students'
import AddStudent from './Application/AddStudent'
import NewWeek from './Application/NewWeek'
import Week from './Application/Week'
import { AppProvider } from "../contexts/AppContext"


export default function Dashboard() {



  return (
    <>
      <AppProvider>
        <Navigation style={{ position: 'fixed' }} />
        <div className="d-flex justify-content-between" style={{ minHeight: '100vh' }} >
          <div className="bg-secondary text-center" style={{ minWidth: '300px', background: 'linear-gradient(90deg, #29323C 0%, #485563 100%)' }}>
            <div className='fixed-sidebar'>   
            <p className="date-today"><Sidebar /></p>
                <Students />
                <AddStudent />
                <NewWeek />
            </div>

          </div>

          <div style={{ width: '100%' }} >
            <Week />
          </div>
        </div>
      </AppProvider>
    </>
  )
}
