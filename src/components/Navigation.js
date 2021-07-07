import { Nav } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import React from "react"


export default function Navigation() {

    const { currentUser, logout } = useAuth()

    return (
        <>
            <Nav className='d-flex justify-content-end bg-dark'>
                <Nav.Item>
                    <Nav.Link className='focus-text text-white' href="/update-profile">{currentUser.email}</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link className='focus-text text-white' onClick={logout}>Выйти</Nav.Link>
                </Nav.Item>
            </Nav>
        </>
    )
}
