import { useState,useEffect,useRef } from 'react';
import arrow_right from './../assets/images/svg/arrow-right.svg';
import arrow_left from './../assets/images/svg/arrow-left.svg';
import { useContext } from 'react';
import { AppContext } from "../App";
import { getCourse } from '../api/course';
import { getTeacher } from '../api/teacher';
import TeacherGoClassModal from './OpenGoClassModal';
import '../assets/scss/course.scss';

const Teacher_profile_Calender = () =>{
    const today = new Date();
    const today_month = today.getMonth();
    const today_year = today.getFullYear();
    const [currentMonth,setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const calender_block = useRef(null);
    const [courseList, setCourseList] = useState([]);
    const { state } = useContext(AppContext);
    const [isCourseOpen, setIsCourseModalOpen] = useState(false);
    const [selectedCourse , setSelectedCourse] = useState('');

    const allCourseData = []; 

   useEffect(() => {
    const fetchTeacherData = async () => {
      try {
      const teacherId = state.logindata.data.id;
      const response = await getTeacher(teacherId);
      const teacherData = response.data;
      console.log('Teacher Data:', teacherData);
  if (teacherData.Courses) {
        const courseIds = teacherData.Courses.map(course => course.id);
        console.log(courseIds);
        fetchCourseData(courseIds);
      } else {
        console.log('No courses data available.');
      }
        return teacherData;

      } catch (error) {
        console.error('Error fetching teacher data:', error);
      }
    };

    if (state.logindata && state.logindata.data) {
      fetchTeacherData();
    }

  }, [state.logindata]);



const fetchCourseData = async (courseIds) => {
  try {
  for (const courseId of courseIds) {
      const response = await getCourse(courseId);
      const courseData = response.data;
      console.log(`Course Data for Course ID ${courseId}:`, courseData);
      

      const startDate = new Date(courseData.startAt);

    const courseDuration = courseData.duration;
    const startTime = new Date(courseData.startAt);
    const endTime = new Date(startTime.getTime() + courseDuration * 60000); // 计算结束时间的毫秒数

// 获取开始时间的小时和分钟
const startHours = startTime.getHours();
const startMinutes = startTime.getMinutes();

// 计算结束时间的小时和分钟
const endHours = endTime.getHours();
const endMinutes = endTime.getMinutes();

      allCourseData.push({
        year: startDate.getFullYear(),
        month: startDate.getMonth() + 1,
        day: startDate.getDate(),
        subject: courseData.name,
        student: courseData.Registrations[0]?.User?.name,
        time: courseData.duration,
        startTime: `${startHours}:${startMinutes}`,
        endTime: `${endHours}:${endMinutes}`, 
        date: startDate,
      });
    }

      setCourseList(allCourseData); 
  } catch (error) {
    console.error('Error fetching course data:', error);
  }
};

useEffect(() => {
    console.log('Course List:', courseList);
  }, [courseList]);

  const handleCourseOpen = () => {
    setIsCourseModalOpen(true);
  };

  const handleCourseClose = () => {
    setIsCourseModalOpen(false);
  };


    const months = ["January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"];
    const check_lunar_year = (year)=>{
        if(year%4!==0){
            return false;
        }
        if(year %4===0 && year %100 !==0){
            return true;
        }
        if(year %400===0){
            return true;
        }
        if(year%1000===0){
            return true;
        }
        else{
            return false;
        }
    }
    const get_days_in_month = (year,month)=>{
        let days_arr = [31,28,31,30,31,30,31,31,30,31,30,31];
        let is_lunar = true;
        // console.log(month);
        // console.log(is_lunar);
        if(month ===1){
             is_lunar = check_lunar_year(year);
            if(is_lunar===true){
                return 29;
            }
            else{
                return 28;
            }
        }
        else{
            return days_arr[month];
        }   
    }
    const increament_year =(add)=>{

        setCurrentYear(currentYear+add);
    }


    let firstDayOfMonth= new Date(currentYear, currentMonth, 1).getDay();
    let dayInMonth= get_days_in_month(currentYear,currentMonth);
    const weeks_arr = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

    const render_week_array = [];
    let currentDay = 1;
    let key = 0 ;
    const show_course=(courseList,index)=>{
        let course_block = ``
        console.log(courseList);
         
        const handleCourseClick = () => {
        setSelectedCourse(courseList);
        console.log(selectedCourse);
        handleCourseOpen();
    };

        if( courseList.date < today.getTime()){
            course_block =
            <div className="course-block bg-finish" key={index}>
                <div className="title-bar-subject finish">{courseList.subject}</div>
                <div className="title-bar-student">{courseList.student}</div>
                <div className="title-bar-time">{courseList.startTime}~{courseList.endTime}</div>
            </div>
        }
        else if( courseList.date > today.getTime()){
            course_block =
            <div className="course-block bg-reserve" key={index} onClick={() => handleCourseClick(courseList)}>
                <div className="title-bar-subject">{courseList.subject}</div>
                <div className="title-bar-student">{courseList.student}</div>
                <div className="title-bar-time">{courseList.startTime}~{courseList.endTime}</div>
            </div>
        }
        return(course_block);
        
    }
for (let i = 0; i < 5; i++) {
    const render_day_arr = [];
    for (let j = 1; j < 8; j++) {
      if (i === 0 && j < firstDayOfMonth) {
        render_day_arr.push(
          <div className="col calender_block bg-deep" key={'calender' + key}></div>
        );
      } else if (currentDay <= dayInMonth) {
        let newDiv = [];
        let count_course = 0;
        for (let z = 0; z < courseList.length; z++) {
          if (
            courseList[z].day === currentDay &&
            courseList[z].month - 1 === currentMonth &&
            courseList[z].year === currentYear
          ) {
            if (count_course >= 2) {
              newDiv.push(
                <button className="btn-more" key={'btn-more' + key}>
                  More
                </button>
              );
              z = courseList.length;
            } else {
              let inner = show_course(courseList[z], z);
              newDiv.push(inner);
            }
            count_course++;
          }
        }
        render_day_arr.push(
          <div className="col calender_block" key={'calender' + key}>
            {currentDay}
            {newDiv}
          </div>
        );
        currentDay++;
      } else {
        render_day_arr.push(
          <div className="calender_block bg-deep" key={'calender' + key}></div>
        );
      }
      key++;
    }
    render_week_array.push(
      <div className="coures-week-item d-flex" key={i}>
        {render_day_arr}
      </div>
    );
  }

  useEffect(() => {}, []);

  useEffect(() => {}, [currentMonth, currentYear]);

    return(
         <>
      <div className="course-calendar-title justify-between mb-1">
        <div className="course-title">
          <h5 className="title">我的課程行事曆</h5>
          </div>
        <div className="course-date-selector d-flex">
              <select
          className="month-selection"
          name="months"
          value={currentMonth}
          onChange={(e) => {
            console.log(parseInt(e.target.value));
            setCurrentMonth(parseInt(e.target.value));
          }}
        >
          {months.map((month, key) => {
            return (
              <option key={key} value={key} onClick={() => setCurrentMonth(key)}>
                {' '}
                {month}
              </option>
            );
          })}
        </select>
        <div className="course-calendar-year d-flex">
          <img
            className="btn"
            src={arrow_left}
            onClick={(e) => {
              increament_year(-1);
            }}
          />
          <div className="text-primary">{currentYear}</div>
          <img
            className="btn rotate-arrow"
            src={arrow_right}
            onClick={(e) => {
              increament_year(1);
            }}
          />
        </div>

        </div>

      </div>

      <div className="course-state d-flex flex-reverse mb-1 ml-1">
        <div className="course-state-item d-flex items-center">
          <div className="circle-icon-finished mt-1" style={{marginRight:'0.2rem'}}></div>
          <div className="">已完課</div>
        </div>
        <div className="course-state-item d-flex items-center">
          <div className="circle-icon-reserved mt-1" style={{marginRight:'0.2rem'}}></div>
          <div className="">已預約</div>
        </div>
      </div>

      <div className="course-body d-flex">
        {weeks_arr.map((week, key) => {
          return (
            <div className="col" key={week}>
              <div className="block-week bg-primary">{week}</div>
            </div>
          );
        })}
      </div>
      <div id="calender-block" className="calender-table">
        {render_week_array}
      </div>

      {courseList.length > 0  && isCourseOpen && (
           <TeacherGoClassModal 
           show={isCourseOpen} 
           handleCourseClose={handleCourseClose} 
           selectedCourse={selectedCourse}
          setSelectedCourse={setSelectedCourse}
          
        />
         )}
    </>
    )
}
export default Teacher_profile_Calender;