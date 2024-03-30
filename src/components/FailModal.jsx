import { Modal } from "react-bootstrap";
import PropTypes from 'prop-types';
import '../assets/scss/failmodal.scss'

const FailModal = ({ show, handleClose,errorMessage }) => {
return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className="modal-head-title"></Modal.Title>
      </Modal.Header>

      <Modal.Body className="modal-body">
        <div className="modal-title">
          <h5 className="title">預約失敗！</h5>
        </div>
        
        <div className="modal-fail">
          <p className="fail-message">
            {errorMessage}
          </p>
        </div>

      </Modal.Body>


    </Modal>
  );
};

FailModal.propTypes = {
  show: PropTypes.bool.isRequired,  
  handleClose: PropTypes.func.isRequired,  
};

export default FailModal;