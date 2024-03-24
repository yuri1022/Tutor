import { Modal,Form,Button } from "react-bootstrap";
import {createCourse} from '../api/course.js';
import { useState } from "react";
import DateTimePicker from 'react-datetime-picker';
import moment from "moment";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import { useContext } from 'react';
import { AppContext } from "../App";


const AddCourse = ({ showAddModal, onHide ,teacherDetails}) => {

const { state } = useContext(AppContext);
const teacherId = state.logindata.data.id;

 const [formData, setFormData] = useState({
    teacherId:teacherId,
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
  setFormData({
    ...formData,
    startAt: value,
  });
};

  

  const handleSubmit = async (e) => {
  e.preventDefault();  
  const updatedFormData = {
    ...formData,
    category: [parseInt(formData.category, 10)],
    startAt:moment(formData.startAt).format('YYYY-MM-DD HH:mm:ss')
  };


    try {
    const requestBody = JSON.stringify(updatedFormData)

      await createCourse(requestBody);
      console.log(requestBody);
      onHide(); 
      // 可以在這裡執行其他需要更新的操作，如重新加載課程列表等
    } catch (error) {
      console.error('Create course failed:', error);
    }
  };

const categoryOption = teacherDetails.teaching_categories.map(category => (
  <option key={category.categoryId} value={category.Category.name}>
    {category.Category.name}
  </option>
));
// console.log(categoryOption)

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
    <option key={category.key} value={category.key}> {/* 修改这里 */}
      {category.props.children}
    </option>
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
            <DateTimePicker
            defaultValue={formData.startAt}
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