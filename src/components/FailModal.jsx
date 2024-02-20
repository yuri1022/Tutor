import { Modal } from "react-bootstrap";
import PropTypes from 'prop-types';

const FailMessage = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>預約失敗</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>恭喜你!</p>
      </Modal.Body>

      <Modal.Footer>
        <button className="btn btn-secondary" onClick={handleClose}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

FailMessage.propTypes = {
  show: PropTypes.bool.isRequired,  
  handleClose: PropTypes.func.isRequired,  
};

export default FailMessage;