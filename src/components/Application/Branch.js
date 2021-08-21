import React from 'react'
import { Dropdown, DropdownButton } from 'react-bootstrap';
import styles from './Branch.module.css'
import { PencilSquare } from 'react-bootstrap-icons';

export const Branch = () => {
    return (
        <div className={styles.container}>

            <Dropdown onSelect={(e) => console.log(e)}>
                <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary" >
                    Общая категория
                </Dropdown.Toggle>

                <Dropdown.Menu variant="dark">
                    <Dropdown.Item eventKey="Action" active={false}>
                        Все предметы
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                    <Dropdown.Item eventKey="Something else">Something else</Dropdown.Item>
               
                    <Dropdown.Item eventKey="4">Separated link</Dropdown.Item>
                </Dropdown.Menu>    
            </Dropdown>
            <div className={styles.edit}><PencilSquare /></div>



        </div>
    )
}
