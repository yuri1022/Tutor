import { Modal,Form,Button } from "react-bootstrap";
import {createCourse} from '../../api/course.js';
import { useState } from "react";
import DateTimePicker from 'react-datetime-picker';
import moment from "moment";
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import '../../assets/scss/addCourseModal.scss';
import { useContext } from 'react';
import { AppContext } from "../../App.jsx";
import Swal from "sweetalert2";

const AddCourse = ({ showAddModal, onHide ,teacherDetails}) => {

const { state } = useContext(AppContext);
const teacherId = state.logindata.id;

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
  
  const isFormValid = Object.values(formData).every(value => value !== '');
  if (!isFormValid) {
    Swal.fire({
            title: 'Warning!',
            text: '請填寫所有欄位',
            icon: 'warning',
            confirmButtonText: '確定'
            })
    return;
  }
  const updatedFormData = {
    ...formData,
    category: [parseInt(formData.category, 10)],
    startAt:moment(formData.startAt),
    duration:parseInt(formData.duration, 10),
  };

    try {
      await createCourse(updatedFormData);
      console.log(updatedFormData);
      Swal.fire({
            title: 'Success',
            text: '新增課程成功！',
            icon: 'success',
            confirmButtonText: '確定'
            })
      onHide(); 
      // 可以在這裡執行其他需要更新的操作，如重新加載課程列表等
    } catch (error) {
      console.error('Create course failed:', error);
      Swal.fire({
      title: '新增課程失敗!',
      text: error,
      icon: 'error',
      confirmButtonText: '確定'
    });
    }
  };

const categoryMap = {};

teacherDetails.teaching_categories.forEach(category => {
  categoryMap[category.categoryId] = category.Category.name;
});

console.log(categoryMap);

const categoryOption = Object.entries(categoryMap).map(([categoryId, categoryName]) => (
  <option key={categoryId} value={categoryId}>
    {categoryName}
  </option>
));
console.log(categoryOption)

  return (
    <Modal className="show-add-modal" show={showAddModal} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title className="modal-head-title"></Modal.Title>
      </Modal.Header>

    <Modal.Body className="modal-body">
        <Form className="create-form" onSubmit={handleSubmit}>

        <Form.Group className="create-name d-flex" controlId="name">
            <Form.Label>課程名稱</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="create-intro d-flex" controlId="intro">
            <Form.Label>課程介紹</Form.Label>
            <Form.Control
              type="text"
              name="intro"
              value={formData.intro}
              onChange={handleChange}
            />
          </Form.Group>

        <Form.Group className="create-category d-flex" controlId="category">
            <Form.Label>課程類別</Form.Label>
  <Form.Select
    name="category"
    value={formData.category}
    onChange={handleChange}
  >
    <option value="">請選擇類別</option>
  {categoryOption.map((category, index) => (
    <option key={category.key} value={category.key}>
      {category.props.children}
    </option>
  ))}
  </Form.Select>
          </Form.Group>

          <Form.Group className="create-link d-flex" controlId="link">
            <Form.Label>課程連結</Form.Label>
            <Form.Control
              type="text"
              name="link"
              value={formData.link}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="create-duration d-flex" controlId="duration">
            <Form.Label>課程時長</Form.Label>
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

        <Form.Group controlId="startAt" className="create-startat d-flex">
            <Form.Label>課程時段</Form.Label>
            <DateTimePicker
            value={formData.startAt}
             onChange={handleTimeChange} />
          </Form.Group>
          <div className="btn-container d-flex">

          <Button className="btn-cancel" variant="Light" type="cancel" onClick={onHide}>
            取消
          </Button>

          <Button className="btn-submit" variant="primary" type="submit">
            創建課程
          </Button>

          </div>
        </Form>
      </Modal.Body>


    </Modal>
  );
};

export default AddCourse;