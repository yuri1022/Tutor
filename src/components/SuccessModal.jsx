import { Modal } from "react-bootstrap";
import PropTypes from 'prop-types';
import '../assets/scss/successmodal.scss';
import CourseIcon from '../assets/images/svg/course-icon.svg';
import DateIcon from '../assets/images/svg/calendar-icon.svg';
import TimeIcon from '../assets/images/svg/time-icon.svg';

const SuccessMessage = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className="modal-head-title"></Modal.Title>
      </Modal.Header>

      <Modal.Body className="modal-body">
        <div className="modal-title">
          <h5 className="title">預約成功！</h5>
        </div>
        
        <div className="modal-class">
          <img className="modal-class-img" src={CourseIcon} alt="Course" />
          <h6 className="modal-class-title">Grace老師</h6>
        </div>
        <div className="modal-date">
          <img className="modal-date-img" src={DateIcon} alt="Date" />
          <h6 className="modal-date-title">2024年1月1日</h6>
        </div>
        <div className="modal-time">
          <img className="modal-time-img" src={TimeIcon} alt="Time" />
          <h6 className="modal-time-title">17:30~18:00</h6>
        </div>

        <button className="close-button btn btn-secondary" onClick={handleClose}>
          至我的課程查看
        </button>
      </Modal.Body>


    </Modal>
  );
};

SuccessMessage.propTypes = {
  show: PropTypes.bool.isRequired,  
  handleClose: PropTypes.func.isRequired,  
};

export default SuccessMessage;