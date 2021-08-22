import React, { useState, useEffect } from 'react'
import { Dropdown, CloseButton, Modal, Button } from 'react-bootstrap';
import styles from './Branch.module.css'
import { PencilSquare, PlusCircle, RecordCircleFill } from 'react-bootstrap-icons';
import { useApp } from '../../contexts/AppContext'


export const Branch = () => {
    const { options, updateOptions } = useApp()


    const [show, setShow] = useState(false);
    const handleClose = () => {
        // setList2(options.branches)
        setList(options.branches)
        setShow(false)
    }



    const handleShow = () => setShow(true);

    const [list2, setList2] = useState([]);
    const [list, setList] = useState([]);

    useEffect(() => {
        setList2(options.branches)
        setList(options.branches)
    }, [options.branches, show]);

    function addBranch() {
        if (list.length === 0 || (list.length !== 0 && list[list.length - 1].branch !== '')) {
            setList2([...list2.concat({
                id: Date.now(),
                branch: '',
                color: '#444444'
            })])

            setList([...list.concat({
                id: Date.now(),
                branch: '',
                color: '#444444'
            })])
        }
    }

    return (
        <div className={styles.container}>

            <Dropdown onSelect={(e) => updateOptions(options, options.activeBranch = e)}>
                <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary" className={styles.dropdown}>
                    <RecordCircleFill 
                    className={styles.circle}
                    style={{ color: options.activeBranch !== 'Общая категория' ? options.branches.find(item => item.branch === options.activeBranch && item).color : '#6d6d6d' }} 
                    />
                    {options.activeBranch}
                </Dropdown.Toggle>

                <Dropdown.Menu variant="dark">
                    <Dropdown.Item eventKey="Общая категория" active={false}>
                        Общая категория
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    {

                        options.branches.length !== 0 &&
                        options.branches.map(branch => {
                            return <Dropdown.Item eventKey={branch.branch}>
                                <RecordCircleFill style={{ color: branch.color}} className={styles.circle} />
                                {branch.branch}
                            </Dropdown.Item>
                        })
                    }
                </Dropdown.Menu>
            </Dropdown>

            <div className={styles.edit} onClick={handleShow}><PencilSquare /></div>


            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Редактирование предметов</Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.modal_body}>

                    {
                        list.length !== 0 && list2.map((branch, index) => {
                            return <div key={branch}>
                                <input type='text' placeholder='Введите предмет' value={list[index].branch} onChange={e => {
                                    setList([...list], [...list.map((item, i) => item.id == list[index].id ? item.branch = e.target.value : item)])

                                }} />
                                <input type='color' value={list[index].color} onChange={e => setList(list, list[index].color = e.target.value)} />
                                <CloseButton onClick={() => {
                                    setList([...list.filter(item => item.id !== list[index].id)])
                                    setList2([...list2.filter(item => item.id !== list2[index].id)])
                                    options.activeBranch == list[index].branch && updateOptions(options, options.activeBranch = 'Общая категория')
                                }} />
                            </div>
                        })
                    }


                    <PlusCircle className={styles.add_btn} onClick={addBranch} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>

                        Закрыть
                    </Button>
                    <Button variant="primary" onClick={() => {

                        // setList([...list.filter(item => item.branch.length !== 0)])
                        updateOptions(options, options.branches = list)

                        handleClose()
                    }}>
                        Сохранить
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
