/** @format */

import { useState, forwardRef, useImperativeHandle } from 'react'
import { Button, Modal } from 'react-bootstrap'

const Togglable = forwardRef((props, ref) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = {
        display: visible ? 'none' : '',
        textAlign: 'center',
    }

    const toggleVisibility = () => {
        setVisible(!visible)
    }

    useImperativeHandle(ref, () => {
        return {
            toggleVisibility,
        }
    })

    return (
        <div className="container">
            <div style={hideWhenVisible}>
                <Button variant="primary" onClick={toggleVisibility}>
                    {props.buttonLabel}
                </Button>
            </div>

            <Modal show={visible} onHide={toggleVisibility} centered size="lg">
                {props.children}

                <Modal.Footer className="d-flex justify-content-center">
                    <Button variant="secondary" onClick={toggleVisibility}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
})

Togglable.displayName = 'Togglable'

export default Togglable
