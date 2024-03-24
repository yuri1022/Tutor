import { Modal,Form,Button } from "react-bootstrap";
import {putCourse} from '../api/course.js';
import TimePicker from 'react-time-picker';
import { useState } from "react";
import moment from 'moment';
import '../assets/scss/timepicker.scss'


const PutCourse = ({ showPutModal, onHide, event }) => {

  const [formData, setFormData] = useState({
    category: event.categoryId,
    name: event.title,
    intro: event.intro,
    link: event.link,
    duration: event.duration,
    startAt: moment(event.start).format('YYYY-MM-DD HH:mm:ss'),
    startAtTime:moment(event.start).format('HH:mm'),
  });

  console.log(formData)


  const handleTimeChange = (value) => {
    const selectedTime = moment(value, 'HH:mm'); // value 是时间选择器的选择值
    const startAtDate = moment(formData.startAtDate).set({
      hour: selectedTime.hours(),
      minute: selectedTime.minutes(),
      second: selectedTime.seconds(),
    });
    
    setFormData((prevData) => ({
      ...prevData,
      startAt: startAtDate._d, // 更新完整的日期时间
    }));
  };
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
    const { startAtTime, ...formDataWithoutTime } = formData;

    await putCourse(formDataWithoutTime);
    console.log(formDataWithoutTime);
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
            <TimePicker
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