import { useState,useContext,useEffect} from "react";
import ApplyProcess from "../components/applyTeacher/ApplyProcess";
import ApplyTeacherForm from "../components/applyTeacher/ApplyTeacherForm";
import { ApplyTeacherContext, ApplyTeacherProvider } from "../components/applyTeacher/sotre/ApplyTeacherCotext";
const ApplyTeacher = () => {
  const [introduction, setIntroduction] = useState('');
  const [teachingStyle, setTeachingStyle] = useState('');
  const [videoLink, setVideoLink] = useState('');
  const [country,setCountry] = useState('');
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
    <div className="apply-teacher-context">
      <div className="topbar d-flex flex-row-reverse">
        X
      </div>
      <ApplyTeacherProvider>
        <div className="applyContainer d-flex .col.col-lg-9" style={{marginTop:"6%"}}>
            <div  className="left-container" style={{width:"30%"}}>1
              <div className="text-center">
                <div className="title mb-10px">填寫表單</div>
                <p>完成時間約三分鐘</p>
              </div>
              <ApplyProcess/>
            
            </div>
            <div  style={{width:"70%"}}>
              <div className="right-container">
                <ApplyTeacherForm></ApplyTeacherForm>
              </div>
            </div>
        </div>
      </ApplyTeacherProvider>

      {/* <div className="reserve-date" style={{ display: "flex" }}>
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
      </div> */}
    </div>
  );
};

export default ApplyTeacher;