import { Modal,Form,Button } from "react-bootstrap";
import {createCourse} from '../api/course.js';
import { useState } from "react";
import TimePicker from 'react-time-picker';
import moment from "moment";

const AddCourse = ({ showAddModal, onHide ,teacherDetails}) => {
 const [formData, setFormData] = useState({
    category: '',
    name: '',
    intro: '',
    link: '',
    duration: '',
    startAt: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

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

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createCourse(formData);
      console.log(formData);
      onHide(); 
      // 可以在這裡執行其他需要更新的操作，如重新加載課程列表等
    } catch (error) {
      console.error('Create course failed:', error);
    }
  };

const categoryOption = teacherDetails.teaching_categories
  .flatMap(categories => categories.Category.name)
  .map((category, index) => (
    <span className="self-teacher-item" key={index}>{category}</span>
  ));

  return (
    <Modal show={showAddModal} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title className="modal-head-title"></Modal.Title>
      </Modal.Header>

 <Modal.Body className="modal-body">
        <Form onSubmit={handleSubmit}>


        <Form.Group controlId="name">
            <Form.Label>課程名稱</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="intro">
            <Form.Label>課程介紹</Form.Label>
            <Form.Control
              type="text"
              name="intro"
              value={formData.intro}
              onChange={handleChange}
            />
          </Form.Group>

        <Form.Group controlId="category">
            <Form.Label>類別</Form.Label>
  <Form.Select
    name="category"
    value={formData.category}
    onChange={handleChange}
  >
    <option value="">請選擇類別</option>
    {categoryOption.map((category, index) => (
      <option key={index} value={category}>{category}</option>
    ))}
  </Form.Select>
          </Form.Group>

          <Form.Group controlId="link">
            <Form.Label>課程連結</Form.Label>
            <Form.Control
              type="text"
              name="link"
              value={formData.link}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="duration">
            <Form.Label>時長</Form.Label>
  <Form.Select
  name="duration"
  value={formData.duration}
  onChange={handleChange}
>
  <option value="">請選擇時長</option>
  <option value="30">30 分鐘</option>
  <option value="60">60 分鐘</option>
</Form.Select>


          </Form.Group>

        <Form.Group controlId="startAt">
            <Form.Label>時段</Form.Label>
            <TimePicker
            value={formData.startAtTime}
             onChange={handleTimeChange} />
          </Form.Group>

          <Button variant="primary" type="submit">
            創建課程
          </Button>
        </Form>
      </Modal.Body>


    </Modal>
  );
};

export default AddCourse;