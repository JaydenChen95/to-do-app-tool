import { Modal, Button } from 'react-bootstrap';

function ErrorDialog({ show, onClose, title = 'Error', message = 'Something went wrong!' }) {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} data-testid="error-dialog-close-button">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ErrorDialog;