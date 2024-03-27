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
      onHide(); 
    } catch (error) {
      console.error('Create course failed:', error);
    }
  };

  return (
    <Modal show={showPutModal} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title className="modal-head-title"></Modal.Title>
      </Modal.Header>

      <Modal.Body className="modal-body">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="startAt">
            <Form.Label>修改課程時間</Form.Label>
            <div>{event.start.toLocaleString()}</div>
            <DateTimePicker
            value={formData.startAt}
            onChange={handleTimeChange}/>
          </Form.Group>
          
          <Button variant="primary" type="cancel" onClick={onHide}>
            取消
          </Button>

          <Button variant="primary" type="submit">
            確認修改
          </Button>
        </Form>
        

        


      </Modal.Body>


    </Modal>
  );
};

PutCourse.propTypes = {
  showPutModal: PropTypes.bool.isRequired,  
};


export default PutCourse;