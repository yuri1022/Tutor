import { useState } from "react";
import Navbar from "../components/Navbar";
import { Button,Form } from 'react-bootstrap';

const ApplyTeacher = () => {
  const [introduction, setIntroduction] = useState('');
  const [teachingStyle, setTeachingStyle] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [reserveDays, setReserveDays] = useState({
    Mon: false,
    Tue: false,
    Wed: false,
    Thu: false,
    Fri: false,
    Sat: false,
    Sun: false,
  });

  // 處理 checkbox 改變的函式
  const handleCheckboxChange = (day) => {
    setReserveDays((prevReserveDays) => ({
      ...prevReserveDays,
      [day]: !prevReserveDays[day],
    }));
  };

  // 處理表單提交的函式
  const handleSubmit = () => {
    // 在這裡使用表單資料，例如將資料存儲到 TeacherData 中
    const formData = {
      introduction,
      teachingStyle,
      videoLink,
      reserveDays,
    };
    console.log('Submitted Data:', formData);
    // 這裡可以進一步將資料送到伺服器，或進行其他適當的處理
  };


  return (
    <>
  <Navbar />
    <div className="container .col.col-lg-9" style={{marginTop:"6%"}}>
    <Form className="form-introduction" style={{margin:"1% 0 1% 0"}}>Your Introduction</Form>
    <textarea className="form-control" value={introduction} onChange={(e)=> setIntroduction(e.target.value)} rows="3"></textarea>
    <Form className="form-teaching-style" style={{margin:"1% 0 1% 0"}}>Your Teaching Style</Form>
    <textarea className="form-control" value={teachingStyle} onChange={(e)=> setTeachingStyle(e.target.value)} rows="3"></textarea>
    <Form className="form-class-link" style={{margin:"1% 0 1% 0"}}>課程視訊連結</Form>
    <textarea className="form-control" value={videoLink} onChange={(e) => setVideoLink(e.target.value)} rows="1"></textarea>
    <h6 className="form-reserve-date" style={{margin:"1% 0 1% 0"}}>開放預約</h6>
    <div className="reserve-date" style={{ display: "flex" }}>
          {/* 用 map 來動態生成 checkbox */}
          {Object.keys(reserveDays).map((day) => (
            <div className="form-check" key={day}>
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id={`flexCheck${day}`}
                checked={reserveDays[day]}
                onChange={() => handleCheckboxChange(day)}
              />
              <label className="form-check-label" htmlFor={`flexCheck${day}`}>
                {day}
              </label>
            </div>
          ))}
        </div>
    <Button className="submit"style={{margin:"1% 0 1% 0"}} onClick={handleSubmit}>Submit</Button>


    </div>
    </>
  );
};

export default ApplyTeacher;