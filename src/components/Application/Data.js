import React from 'react'
import { useApp } from "../../contexts/AppContext"

export default function Data() {

    const { getTodayLogo } = useApp()
    
    return (
        <>
            <p className="date-today pt-4 small">{getTodayLogo()}</p>       
        </>
    )
}
