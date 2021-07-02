import React, {useState, useEffect} from 'react'
import { useApp } from "../../contexts/AppContext"

export default function Sidebar() {

    const { getTodayLogo } = useApp()
    
    return (
        <>
            <p className="date-today pt-4">{getTodayLogo()}</p>       
        </>
    )
}
