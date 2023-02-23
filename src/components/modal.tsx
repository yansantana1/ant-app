import React from 'react';
import {Modal, Button} from "react-bootstrap";
import {Ant} from "../entities/ant";

function ModalComponent(props:any) {
    return (
        <Modal
            {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Body>
                <h4>{props.ant.name}</h4><br/>
                <p>
                    <b>LENGTH: </b>{props.ant.length}<br/>
                    <b>WEIGHT: </b>{props.ant.weight}<br/>
                    <b>COLOR: </b>{props.ant.color}
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalComponent;