import { Modal } from "react-bootstrap";
import PropTypes from 'prop-types';
import '../assets/scss/failmodal.scss'

const FailMessage = ({ show, handleClose }) => {
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
            Office ipsum you must be muted. We whos waste seat product finish attached ourselves dear globalize. Crack plan individual reference those driving feature problem native. Red-flag no-brainer can game day cost. Brainstorming territories pants beef mint drive live well building.
          </p>
        </div>

      </Modal.Body>


    </Modal>
  );
};

FailMessage.propTypes = {
  show: PropTypes.bool.isRequired,  
  handleClose: PropTypes.func.isRequired,  
};

export default FailMessage;