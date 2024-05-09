import { useEffect, useState } from 'react';
import './Toast.css';
import { Col, Row } from 'react-bootstrap';
import Toast from 'react-bootstrap/Toast';
import { useSelector } from 'react-redux';

export default GenericToast;

function GenericToast() { 
    const [show, setShow] = useState(false);
    const toast = useSelector((state: any) => state.toast);

    useEffect(() => {
        if(toast.content !== ''){ setShow(true) }
    }, [toast]);


    return (
        <Row className="toast-cst-container">
          <Col xs={11}>
            <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
              <Toast.Header>
                <span className="me-auto">{toast.content}</span>
              </Toast.Header>
            </Toast>
          </Col>
        </Row>
      );
}