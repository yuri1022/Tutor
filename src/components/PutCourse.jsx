import { Modal,Form,Button } from "react-bootstrap";
import { putCourse } from '../api/course.js';
import { useEffect, useState } from "react";
import moment from 'moment';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import { useContext } from 'react';
import { AppContext } from "../App";
import PropTypes from 'prop-types';
import '../assets/scss/editCourseModal.scss';
import CalendarIcon from '../assets/images/svg/icon_calender.svg'


const PutCourse = ({ showPutModal, onHide, event }) => {
const { state } = useContext(AppContext);
const teacherId = state.logindata.data.id;
const [courseId ,setCourseId]= useState({
  courseId:event.courseId,
})

// console.log(courseId.courseId);

  const [formData, setFormData] = useState({
    teacherId: teacherId,
    category: event.categoryId,
    name: event.title,
    intro: event.intro,
    link: event.link,
    duration: event.duration,
    startAt: event.start
  });


  useEffect(()=>{
    
  },[state])

 const handleTimeChange = (value) => {
  setFormData({
    ...formData,
    startAt: value,
  });
};

  // console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFormData = {
    ...formData,
    category: [parseInt(formData.category, 10)],
    startAt:moment(formData.startAt),
    duration:parseInt(formData.duration, 10),
  };


    try {
    await putCourse(updatedFormData,courseId.courseId);
    console.log(updatedFormData);
      onHide(); 
    } catch (error) {
      console.error('Create course failed:', error);
    }
  };

  return (
    <Modal className="show-put-modal" show={showPutModal} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title className="modal-head-title"></Modal.Title>
      </Modal.Header>

      <Modal.Body className="modal-body">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="startAt">
            <Form.Label><h4>修改課程時間</h4></Form.Label>
            <div className="time-container">
              <img src={CalendarIcon} alt="時間" />
              {event.start.toLocaleString()}
              </div>
              <div className="timepicker-container">
            <DateTimePicker
            value={formData.startAt}
            onChange={handleTimeChange}/>

              </div>
           
          </Form.Group>
          <div className="btn-container d-flex">
          
          <Button className="btn-cancel" variant="Light" type="cancel" onClick={onHide}>
            取消更改
          </Button>

          <Button className="btn-submit" variant="primary" type="submit">
            確認修改
          </Button>
          </div>

        </Form>
        

      </Modal.Body>


    </Modal>
  );
};

PutCourse.propTypes = {
  showPutModal: PropTypes.bool.isRequired,  
};


export default PutCourse;