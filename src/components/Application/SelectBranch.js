import React from 'react'
import { Dropdown, CloseButton, Modal, Button } from 'react-bootstrap';
import { useApp } from '../../contexts/AppContext'
import styles from './Branch.module.css'
import { RecordCircleFill } from 'react-bootstrap-icons';

export const SelectBranch = ( {func, place} ) => {

    const { options } = useApp()

    return (
        <Dropdown onSelect={(e) => func(e)}>
            <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary" className={styles.dropdown}>
                <RecordCircleFill
                    className={styles.circle}
                    style={{ color: place !== 'Общая категория' ? options.branches.find(item => item.id == place).color : '#6d6d6d' }}
                />
                {/* {options.activeBranch == 'Общая категория' ? options.activeBranch : options.branches.find(item => item.id == options.activeBranch).branch} */}
                {place == 'Общая категория' ? place : options.branches.find(item => item.id == place).branch}
            </Dropdown.Toggle>

            <Dropdown.Menu variant="dark">
                <Dropdown.Item eventKey="Общая категория" active={false}>
                    Общая категория
                </Dropdown.Item>
                <Dropdown.Divider />
                {

                    options.branches.length !== 0 &&
                    options.branches.map(branch => {
                        return <Dropdown.Item eventKey={branch.id}>
                            <RecordCircleFill style={{ color: branch.color }} className={styles.circle} />
                            {branch.branch}
                        </Dropdown.Item>
                    })
                }
            </Dropdown.Menu>
        </Dropdown>
    )
}
