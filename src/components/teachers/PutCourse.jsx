import { Modal,Form,Button } from "react-bootstrap";
import { putCourse } from '../../api/course.js';
import { useEffect, useState } from "react";
import moment from 'moment';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import { useContext } from 'react';
import { AppContext } from "../../App.jsx";
import CalendarIcon from '../../assets/images/svg/icon_calender.svg';
import Swal from "sweetalert2";
import '../../assets/scss/editCourseModal.scss';


const PutCourse = ({ showUpdateModal, onHide, event }) => {
const { state } = useContext(AppContext);
const teacherId = state.logindata.id;
const [courseId ,setCourseId]= useState({
  courseId:event.courseId,
})

  const [formData, setFormData] = useState({
    teacherId: teacherId,
    category: event.categoryId,
    name: event.title,
    intro: event.intro,
    link: event.link,
    duration: event.duration,
    startAt: event.start
  });

 const handleTimeChange = (value) => {
  setFormData({
    ...formData,
    startAt: value,
  });
};

const handleCancelEdit = async() =>{
   const updatedFormData = {
    ...formData,
  };
    try {
    await putCourse(updatedFormData,courseId.courseId);
    console.log(updatedFormData);
      onHide(); 
    } catch (error) {
      console.error('Create course failed:', error);
    }

  onHide();
}

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFormData = {
    ...formData,
    category: [parseInt(formData.category, 10)],
    startAt:moment(formData.startAt),
    duration:parseInt(formData.duration, 10),
  };
  if (updatedFormData.startAt._d.getTime() === event.start.getTime()) {
    return;
    
    }
    try {
    await putCourse(updatedFormData,courseId.courseId);
    console.log(updatedFormData);
          Swal.fire({
            title: 'Success',
            text: '修改課程成功！',
            icon: 'success',
            confirmButtonText: '確定'
            })
      onHide(); 
    } catch (error) {
      console.error('Create course failed:', error);
    }
  };

  return (
    <Modal className="show-put-modal" show={showUpdateModal} onHide={handleCancelEdit} centered>
      <Modal.Header closeButton >
        <Modal.Title className="modal-head-title d-flex">
        </Modal.Title>
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
          
          <Button className="btn-cancel" variant="light" type="button" onClick={handleCancelEdit}>
            取消更改
          </Button>

          <Button className="btn-submit" variant="primary" type="submit" onClick={handleSubmit}>
            確認修改
          </Button>
          </div>

        </Form>
        

      </Modal.Body>


    </Modal>
  );
};

export default PutCourse;