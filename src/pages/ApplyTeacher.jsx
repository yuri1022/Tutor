import { useState } from "react";
import Navbar from "../components/Navbar";
import ApplyStepProgress from "./steps/applystepprogress";
import ApplyStep1 from "./steps/applystep1";
import ApplyStep2 from "./steps/applystep2";
import ApplyStep3 from "./steps/applystep3";
import ApplyStep4 from "./steps/applystep4";
import PropTypes from 'prop-types';
const ApplyTeacher = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState(''); // 新增這一行
  const [name,setName]= useState('');
  const [nation,setNation]= useState('');
  const [category,setCategory] = useState('');
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
  const onSubmit = () => {
    // 在這裡使用表單資料，例如將資料存儲到 TeacherData 中
    const formData = {
      name,
      nation,
      category,
      introduction,
      teachingStyle,
      videoLink,
      reserveDays,
    };
    console.log('Submitted Data:', formData);
    // 這裡可以進一步將資料送到伺服器，或進行其他適當的處理
  };


    const onNextStep = () => {
    setCurrentStep(currentStep + 1);
  };
    const onPrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);

  };

  return (
    <>
    <Navbar searchTerm={searchTerm} onSearchChange={handleSearchChange} />    
    
    <div className="form col col-12" style={{display:'flex',justifyContent:'center'}}>

    <div className="form-left col col-3" >
    <ApplyStepProgress currentStep={currentStep} />


    </div>


    <div className="form-right col col-9">

      <div className="container " style={{marginTop:"6%"}}>

    {currentStep === 1 && <ApplyStep1 setName={setName} setNation={setNation}  onNextStep={onNextStep} />}
          {currentStep === 2 && <ApplyStep2 setIntroduction={setIntroduction} onNextStep={onNextStep} onPrevious={onPrevious}/>}
          {currentStep === 3 && <ApplyStep3 setCategory={setCategory} setTeachingStyle={setTeachingStyle} setVideoLink={setVideoLink} onNextStep={onNextStep} onPrevious={onPrevious}/>}
           {currentStep === 4 && <ApplyStep4 reserveDays={reserveDays} handleCheckboxChange={handleCheckboxChange}  onSubmit={onSubmit} onPrevious={onPrevious}/>}
    </div>


    </div>

    </div>

    
    </>
  );
};

Navbar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

export default ApplyTeacher;