import React, { useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import Navigation from './Navigation'
// import './Dashboard.css'
import './App.css'
import Sidebar from './Application/Sidebar'
import { AppProvider } from "../contexts/AppContext"
import Students from './Application/Students'
import AddStudent from './Application/AddStudent'
import NewWeek from './Application/NewWeek'
import Week from './Application/Week'

export default function Dashboard() {
  const [error, setError] = useState("")
  const history = useHistory()


  return (
    <>
      <AppProvider>
        <Navigation style={{position: 'fixed'}} />
        <div className="d-flex justify-content-between" style={{ minHeight: '100vh' }} >
          <div className="bg-secondary text-center" style={{ minWidth: '300px', background: 'linear-gradient(90deg, #29323C 0%, #485563 100%)' }}>
            <div className='fixed-sidebar'>
            <p className="date-today"><Sidebar /></p>
            <Students />
            <AddStudent />
            <NewWeek />
            
            </div>
 
          </div>

          <div className="bg-light d-flex justify-content-around flex-wrap" style={{ width: '80%' }}>
            <Week />
          </div>
        </div>
      </AppProvider>
    </>
  )
}
