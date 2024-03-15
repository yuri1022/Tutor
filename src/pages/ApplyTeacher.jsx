
import { useState,useContext,useEffect} from "react";
import { Link } from 'react-router-dom';
import ApplyProcess from "../components/applyTeacher/ApplyProcess";
import ApplyTeacherFormMobile from "../components/applyTeacher/mobile/ApplyTeacherForm";
import ApplyTeacherForm from "../components/applyTeacher/ApplyTeacherForm";
import { ApplyTeacherContext, ApplyTeacherProvider } from "../components/applyTeacher/sotre/ApplyTeacherCotext";
import PropTypes from 'prop-types';
const ApplyTeacher = () => {
  // 處理表單提交的函式
  return (
    <div className="apply-teacher-context">
      <div className="mt-10px display-none-latop">申請成為老師</div>
      <ApplyTeacherProvider>
        <div className="applyContainer d-flex .col.col-lg-9" style={{marginTop:"6%"}}>
            <div  className="left-container" >
              <div className="text-center">
                <div className="title mb-10px">填寫表單</div>
                <p>完成時間約三分鐘</p>
              </div>
              <ApplyProcess/>

            </div>
            <div  className="clearout"  style={{width:"70%"}}>
              <div className="right-container " >
                <ApplyTeacherForm></ApplyTeacherForm>
              </div>
            </div>
        </div>
      </ApplyTeacherProvider>
      <button className="btn btn-outline-primary display-none-latop ">
        <Link to="/apply/apply_teacher_form">開始撰寫</Link>
      </button>


    </div>
  );
};

export default ApplyTeacher;