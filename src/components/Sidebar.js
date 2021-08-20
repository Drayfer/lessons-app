import React from 'react'
import Data from './Application/Data'
import Students from './Application/Students'


const Sidebar = () => {
    return (
        <div>
            <p className="date-today"><Data /></p>
            <Students />
        </div>
    )
}

export default Sidebar