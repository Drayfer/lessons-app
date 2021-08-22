import React from "react"
import Navigation from './Navigation'
import './App.css'
import Sidebar from './Sidebar'
import AddStudent from './Application/AddStudent'
import NewWeek from './Application/NewWeek'

import Week from './Application/Week'
import { AppProvider } from "../contexts/AppContext"
import { Notifications } from 'react-push-notification';
import { Footer } from "./Footer"

export default function Dashboard() {


  return (
    <>
      <AppProvider>
        <Notifications />
        <Navigation style={{ position: 'fixed' }} />
        <div className="d-flex justify-content-between" style={{ minHeight: '100vh' }} >
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
        <Footer />
      </AppProvider>
    </>
  )
}
