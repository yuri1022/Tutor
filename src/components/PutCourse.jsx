import { Modal,Form,Button } from "react-bootstrap";
import {putCourse} from '../api/course.js';
import TimePicker from 'react-time-picker';
import { useState } from "react";
import moment from 'moment';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';


const PutCourse = ({ showPutModal, onHide, event }) => {

  const [formData, setFormData] = useState({
    category: event.categoryId,
    name: event.title,
    intro: event.intro,
    link: event.link,
    duration: event.duration,
    startAt: event.start
  });

  console.log(formData)


 const handleTimeChange = (value) => {
  setFormData({
    ...formData,
    startAt: value,
  });
};

  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFormData = {
    ...formData,
    category: [parseInt(formData.category, 10)],
    startAt:moment(formData.startAt).format('YYYY-MM-DD HH:mm:ss')
  };


    try {
    const requestBody = JSON.stringify(updatedFormData)

    await putCourse(requestBody);
    console.log(requestBody);
      onHide(); 
      // 可以在這裡執行其他需要更新的操作，如重新加載課程列表等
    } catch (error) {
      console.error('Create course failed:', error);
    }
  };

  return (
    <Modal show={showPutModal} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title className="modal-head-title"></Modal.Title>
      </Modal.Header>

      <Modal.Body className="modal-body">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="startAt">
            <Form.Label>修改課程時間</Form.Label>
            <div>{event.start.toLocaleString()}</div>
            <DateTimePicker
            value={formData.startAtTime}
             onChange={handleTimeChange} />
          </Form.Group>

          <Button variant="primary" type="submit">
            確認修改
          </Button>
        </Form>
        

        


      </Modal.Body>


    </Modal>
  );
};

export default PutCourse;