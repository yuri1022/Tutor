import { Card } from 'react-bootstrap';
import '../assets/scss/studentsrank.scss'
import RankingImg from '../assets/images/svg/ranking.svg';
import Rank1 from '../assets/images/svg/rank1.svg';
import Rank2 from '../assets/images/svg/rank2.svg';
import Rank3 from '../assets/images/svg/rank3.svg';
import { useTeacherContext } from './teachercontext';
import axios from 'axios';
import { useState,useContext,useEffect } from 'react';
import { AppContext } from "../App";

const BestStudents = () => {
  const { teacherData } = useTeacherContext();
  const bestStudent = teacherData.students || [];
  const api = 'http://34.125.232.84:3000';
  const [studentRank, setstudentRank] = useState(null);
  const { state } = useContext(AppContext);


  useEffect(() => {
    // console.log(bestStudent);
  }, [bestStudent]);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const studentId = state.logindata.data.id;
        // console.log(state.logindata.data.id) 
        const token = localStorage.getItem('token');
        const response = await axios.get(`${api}/student/${studentId}`, { headers: { Authorization: `Bearer ${token}` } });
        setstudentRank(response.data.data)
        return response.data.data; 
        
           
      } catch (error) {
        if (error.response) {
            console.error("Server error:", error.response.status, error.response.data);
        } else if (error.request) {
            console.error("No response from server");
        } else {
            console.error("Request failed:", error.message);
        }
        throw error; 
    }
    };

    fetchStudentData();
  }, [state.logindata]);

useEffect(() => {
  if (studentRank) {
    // console.log(studentRank.studyRank);
    // console.log(studentRank.studyHours);
    // 其他相關操作
  }
}, [studentRank]);


  return (
    
  <div className="container-ranking-list d-flex col-12">

  <Card style={{width:'90%'}}>
    <div className="ranking-list-title">
      <img className="card-rank-img" src={RankingImg} alt="" />
      <h3 className="card-title">學習時數總排行</h3>
    </div>

  <div className="best-rank-container">
  {bestStudent.map((student,index) => (
          <div className="student-container" key={student.studentId} style={{ display: 'flex', alignItems: 'center',height:'3.5rem',paddingLeft:'1.125rem',paddingRight:'1.125rem',justifyContent:'space-between'}}>
        
        <div className="student-rank" style={{width:'2.625rem',textAlign:'center',marginRight:'1rem'}}> {index === 0 ? (
        <img src={Rank1} alt={`Rank ${index + 1}`} />
      ) : index === 1 ? (
        <img src={Rank2} alt={`Rank ${index + 1}`} />
      ) : index === 2 ? (
        <img src={Rank3} alt={`Rank ${index + 1}`} />
      ) : (
        index + 1
      )}            
          </div>

        <div className="student-info" style={{display:'flex',flex:'1'}}>

        <div className="img-container" style={{maxWidth:'3.5rem',maxHeight:'3.5rem',marginRight:'0.7rem'}}>
          <img src={student.User.avatar} alt={student.User.name} style={{width:'2rem',height:'2rem',borderRadius:'50%'}}/>
        </div>
        <div className="student-name" style={{padding:'2px',fontWeight:'700'}} >{student.User.name} </div>

        </div>

        <div className="student-time" style={{padding:'2px'}}>{student.studyHours}hr</div>
        
       
    </div>
        ))}
  </div>


        <div className="student-self-rank" style={{ padding: '2px' }}>
  {state.logindata.data ? (
    <>
      {studentRank ? (
        <>
        <div className="student-container" style={{ display: 'flex', alignItems: 'center',height:'3.5rem',paddingLeft:'1.125rem',paddingRight:'1.125rem',justifyContent:'space-between'}}>
        
        <div className="student-rank" style={{width:'2.625rem',textAlign:'center',marginRight:'1rem'}}> {studentRank.studyRank === 1 ? (
        <img src={Rank1} alt={`Rank1`} />
      ) : studentRank.studyRank === 2? (
        <img src={Rank2} alt={`Rank 2`} />
      ) : studentRank.studyRank === 3? (
        <img src={Rank3} alt={`Rank 3`} />
      ) : (
        studentRank.studyRank
      )}            
          </div>

        <div className="student-info" style={{display:'flex',flex:'1'}}>

        <div className="img-container" style={{maxWidth:'3.5rem',maxHeight:'3.5rem',marginRight:'0.7rem'}}>
          <img src={studentRank.avatar} alt={studentRank.name} style={{width:'2rem',height:'2rem',borderRadius:'50%'}}/>
        </div>
        <div className="student-name" style={{padding:'2px',fontWeight:'700'}} >{studentRank.name} </div>

        </div>

        <div className="student-time" style={{padding:'2px'}}>{studentRank.studyHours}hr</div>
        
       
    </div>

        </>
      ) : (
        <div>Loading...</div>
      )}
    </>
  ) : (
    <div className='logout' style={{height:'3.5rem',display:'flex',justifyContent:'center'}}>
      <div className='logout-text' style={{display:'flex',alignItems:'center'}}>Please login to see yourself study hours</div>
      </div>
  )}
</div>

  </Card>

  </div>
  );
};

export default BestStudents;