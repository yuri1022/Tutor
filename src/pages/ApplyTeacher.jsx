
import { useState,useContext,useEffect} from "react";
import { Link } from 'react-router-dom';
import ApplyProcess from "../components/applyTeacher/ApplyProcess";
import ApplyTeacherFormMobile from "../components/applyTeacher/mobile/ApplyTeacherForm";
import ApplyTeacherForm from "../components/applyTeacher/ApplyTeacherForm";
import { ApplyTeacherContext, ApplyTeacherProvider } from "../components/applyTeacher/sotre/ApplyTeacherContext";
import PropTypes from 'prop-types';
const ApplyTeacher = () => {
  // 處理表單提交的函式
  return (
    <div className="apply-teacher-context">
      <div className="apply-mb-title display-none-latop">申請成為老師</div>
      <ApplyTeacherProvider>
        <div className="applyContainer d-flex" style={{height:'100%'}}>
            <div  className="left-container col-4">
              <div className="text-center">
                <div className="title mb-10px">填寫表單</div>
                <p>完成時間約三分鐘</p>
              </div>
              <ApplyProcess/>

            </div>
              <div className="right-container col-8">
                <ApplyTeacherForm></ApplyTeacherForm>
              </div>
            </div>
      </ApplyTeacherProvider>
      <div className="mb-start-container d-flex">
        <button className="mb-startbutton btn btn-outline-primary display-none-latop">
        <Link to="/apply/apply_teacher_form" className="text">開始填寫</Link>
      </button>
      </div>



    </div>
  );
};

export default ApplyTeacher;