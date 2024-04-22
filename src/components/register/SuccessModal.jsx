import { Modal } from "react-bootstrap";
import PropTypes from 'prop-types';
import CourseIcon from '../../assets/images/svg/course-icon.svg';
import DateIcon from '../../assets/images/svg/calendar-icon.svg';
import TimeIcon from '../../assets/images/svg/time-icon.svg';
import { Link } from "react-router-dom";
import { useContext } from 'react';
import { AppContext } from "../../App";

const SuccessMessage = ({ show, handleClose, successReservationData }) => {
  const { state } = useContext(AppContext);
  const id = state.logindata.data.id
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className="modal-head-title"></Modal.Title>
      </Modal.Header>

      <Modal.Body className="modal-body">
        <div className="modal-title">
          <h5 className="success-title">預約成功！</h5>
        </div>
        
        <div className="modal-class">
          <img className="modal-class-img" src={CourseIcon} alt="Course" />
          <h6 className="modal-class-title">{successReservationData.courseName}</h6>
        </div>
        <div className="modal-date">
          <img className="modal-date-img" src={DateIcon} alt="Date" />
          <h6 className="modal-date-title">{successReservationData.date}</h6>
        </div>
        <div className="modal-time">
          <img className="modal-time-img" src={TimeIcon} alt="Time" />
          <h6 className="modal-time-title">{successReservationData.time}</h6>
        </div>
      <Link to={`/student/${id}`}>
        <button className="close-button btn btn-secondary">
          至我的課程查看
        </button>
        </Link>

      </Modal.Body>


    </Modal>
  );
};

SuccessMessage.propTypes = {
  show: PropTypes.bool.isRequired,  
  handleClose: PropTypes.func.isRequired,
  successReservationData: PropTypes.shape({
    courseName: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired, 
    time: PropTypes.string.isRequired, 
  }).isRequired,
};

export default SuccessMessage;