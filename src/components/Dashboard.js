import React from "react"
import Navigation from './Navigation'
import './App.css'

import { Notifications } from 'react-push-notification';
import { Footer } from "./Footer"
import MainContent from "./MainContent"
import { AppProvider } from "../contexts/AppContext"

export default function Dashboard() {

  return (
    <>
      <AppProvider>
        <Notifications />
        <Navigation style={{ position: 'fixed' }} />
        <MainContent />
        <Footer />
      </AppProvider>
    </>
  )
}
