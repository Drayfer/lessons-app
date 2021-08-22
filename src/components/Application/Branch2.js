import React, { useState, useEffect } from 'react'
import { Dropdown, CloseButton, Modal, Button } from 'react-bootstrap';
import styles from './Branch.module.css'
import { PencilSquare, PlusCircle, RecordCircleFill } from 'react-bootstrap-icons';
import { useApp } from '../../contexts/AppContext'
import { SelectBranch } from './SelectBranch';


export const Branch2 = () => {
    const { options, updateOptions, deleteStudentsBranch } = useApp()
    const [categories, setCategories] = useState(options.branches);
    const [editClick, setEditClick] = useState('');
    const [addCategory, setAddCategory] = useState(false);
    const [inputCategory, setInputCategory] = useState('');


    const [show, setShow] = useState(false);
    const handleClose = () => {
        setEditClick('')
        setShow(false)
    }



    const handleShow = () => setShow(true);


    useEffect(() => {
        setCategories(options.branches)
    }, [show]);

    const changeBranche = e => {
        updateOptions(options, options.activeBranch = e)
    }

    return (
        <div className={styles.container}>
            <SelectBranch func={changeBranche} place={options.activeBranch} />

            {/* <Dropdown onSelect={(e) => updateOptions(options, options.activeBranch = e)}>
                <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary" className={styles.dropdown}>
                    <RecordCircleFill
                        className={styles.circle}
                       style={{ color: options.activeBranch !== 'Общая категория' ? options.branches.find(item => item.id == options.activeBranch).color : '#6d6d6d' }}
                    />
                    {options.activeBranch == 'Общая категория' ? options.activeBranch : options.branches.find(item => item.id == options.activeBranch).branch}
                 
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
            </Dropdown> */}

            <div className={styles.edit} onClick={() => setShow(true)}><PencilSquare /></div>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Редактирование предметов</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.modal_body}>

                    {
                        categories.map(branch => {
                            return <div>
                                {
                                    branch.id !== editClick ? branch.branch : <input type='text' value={branch.branch} onChange={e => setCategories([...categories], [...categories.find(item => item.id == branch.id).branch = e.target.value])} />
                                }
                                {
                                    branch.id !== editClick ? <Button onClick={() => setEditClick(branch.id)}>Ред</Button> : <Button onClick={() => setEditClick('')}>Ок</Button>
                                }

                                <input type='color' value={branch.color} onChange={e => {

                                    setCategories([...categories], [...categories.find(item => item.id == branch.id).color = e.target.value])
                                }} />
                                <CloseButton onClick={() => {
                                    setCategories([...categories.filter(item => item.id !== branch.id)])
                                    options.activeBranch == branch.id && updateOptions(options, options.activeBranch = 'Общая категория')
                                    deleteStudentsBranch(branch.id)
                                }} />
                            </div>
                        })
                    }

                    {
                        addCategory
                        && <div>
                            <input value={inputCategory} placeholder='Введите название' onChange={e => {
                                setInputCategory(e.target.value)
                            }} />
                            <Button onClick={() => {
                                setCategories([...categories.concat({
                                    id: Date.now(),
                                    branch: inputCategory,
                                    color: '#444444'
                                })])
                                setInputCategory('')
                                setAddCategory(false)
                            }}>Ок</Button>
                        </div>


                    }
                    <PlusCircle className={styles.add_btn} onClick={() => setAddCategory(true)} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>

                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={() => {
                        updateOptions(options, options.branches = categories)
                        setCategories(options.branches)
                        handleClose()
                    }}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
