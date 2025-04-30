import { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FaTrash, FaUndo } from 'react-icons/fa';

function ButtonWithConfirm({ onConfirm, taskId, type, setIsLoading }) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleConfirm = () => {
      setIsLoading(true);
      onConfirm(taskId, setIsLoading);
      setShow(false);
    };
  
    return (
      <>
        <Button
          variant={ type === "Delete" ? "outline-danger": "outline-info" }
          size="sm"
          onClick={() => setShow(true)}
          title={ type === "Delete" ? "Delete": "Restore" }
        >
          { type === "Delete" ? <FaTrash /> : <FaUndo /> }
        </Button>
  
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Confirm {type}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to {type.toLowerCase()} this task?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant={ type === "Delete" ? "danger": "info" } onClick={handleConfirm}>
              {type}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  export default ButtonWithConfirm;