import { useState,useEffect,useRef } from 'react';
import arrow_right from './../assets/images/svg/arrow-right.svg';
import arrow_left from './../assets/images/svg/arrow-left.svg';
import { useContext } from 'react';
import { AppContext } from "../App";
import { getCourse } from '../api/course';
import { getTeacher } from '../api/teacher';
import TeacherGoClassModal from './OpenGoClassModal';
import '../assets/scss/course.scss';
import ArrowIcon from '../assets/images/svg/arrow-down.svg'

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
    const [courseShow,setCourseShow] = useState('');
    const allCourseData = []; 

    const handleYearChange = (e) => {
      setCurrentYear(parseInt(e.target.value));
    };
  const yearsRange = Array.from({ length: 11 }, (_, index) => currentYear - 5 + index);

const increament_month = (step) => {
  let newMonth = currentMonth + step;
  let newYear = currentYear;

  if (newMonth < 0) {
    newMonth = 11; // 如果是1月往左，設置為12月
    newYear -= 1; // 年份減1
  } else if (newMonth > 11) {
    newMonth = 0; // 如果是12月往右，設置為1月
    newYear += 1; // 年份加1
  }

  setCurrentMonth(newMonth);
  setCurrentYear(newYear); // 更新年份
};
const showData = (date, courses) => {
    setCourseShow({
        date: date,
        courses: courses
    });
};
const handleClickDay = (date, coursesForDay) => {
    showData(date, coursesForDay);
};

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
const startHours = startTime.getHours();
const startMinutes = startTime.getMinutes();
const endHours = endTime.getHours();
const endMinutes = endTime.getMinutes();

const formattedEndMinutes = endMinutes.toString().padStart(2, '0');
const formattedStartMinutes = startMinutes.toString().padStart(2, '0');


if(courseData.Registrations[0]?.User?.name) {
      allCourseData.push({
        year: startDate.getFullYear(),
        month: startDate.getMonth() + 1,
        day: startDate.getDate(),
        category: courseData.category[0],
        subject: courseData.name,
        student: courseData.Registrations[0]?.User?.name,
        time: courseData.duration,
        startTime: `${startHours}:${formattedStartMinutes}`,
        endTime: `${endHours}:${formattedEndMinutes}`, 
        date: startDate,
        dayOfWeek:weeks_arr[startDate.getDay()]
      });
}

    }

      setCourseList(allCourseData); 
  } catch (error) {
    console.error('Error fetching course data:', error);
  }
};

useEffect(() => {
    console.log('Course List:', courseList);
    console.log('selectedCourse:', selectedCourse);
  }, [courseList,selectedCourse]);

  const handleCourseOpen = () => {
    setIsCourseModalOpen(true);
  };

  const handleCourseClose = () => {
    setIsCourseModalOpen(false);
  };

  const handleCourseClick = (course) => {
        setSelectedCourse(course);
        console.log('selectedCourse',selectedCourse);
        handleCourseOpen();
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

    

    let firstDayOfMonth= new Date(currentYear, currentMonth, 1).getDay();
    let dayInMonth= get_days_in_month(currentYear,currentMonth);
    const weeks_arr = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

    const render_week_array = [];
    let currentDay = 1;
    let key = 0 ;
    const show_course=(courseList,index)=>{
        let course_block = ``
        // console.log(courseList);
        const handleCourseClick = () => {
        setSelectedCourse(courseList);
        console.log(selectedCourse);
        handleCourseOpen();
    };

        if( courseList.date < today.getTime()){
            course_block =
            <div className="teacher-course-block bg-finish mb-1" key={index}>
                <div className="title-bar-subject">{courseList.category}</div>
                <div className="title-bar-student">{courseList.student}</div>
                <div className="title-bar-time">{courseList.startTime}~{courseList.endTime}</div>
            </div>
        }
        else if( courseList.date > today.getTime()){
            course_block =
            <div className="teacher-course-block bg-reserve" key={index} onClick={() => handleCourseClick(courseList)}>
                <div className="title-bar-subject-reserve">{courseList.category}</div>
                <div className="title-bar-student-reserve">{courseList.student}</div>
                <div className="title-bar-time-reserve">{courseList.startTime}~{courseList.endTime}</div>
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
        const coursesForCurrentDay = courseList.filter(course => course.day === currentDay && course.month - 1 === currentMonth && course.year === currentYear);

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
          <div className="col calender_block" key={'calender' + key} onClick={(e) => {
                  if (coursesForCurrentDay.length > 0) {
               handleClickDay(currentDay, coursesForCurrentDay);
             }
            }}>
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
      <div className="coures-week-item d-flex" key={i} >
        {render_day_arr}
      </div>
    );
  }

    return(
         <>
      <div className="course-calendar-title justify-between mb-1">
        <div className="course-title">
          <h5 className="title">課程行事曆</h5>
          </div>
        <div className="date-selector d-flex">
        <div className="course-date-selector d-flex">
             <select
      className="years-selection"
      name="years"
      value={currentYear}
      onChange={handleYearChange}
    >
      {yearsRange.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </select>

        <span className='arrow'><img src={ArrowIcon} alt="" /></span>
        </div>
         <div className="course-calendar-year d-flex">
          <img
            className="btn"
            src={arrow_left}
            onClick={(e) => {
              increament_month(-1);
            }}
          />
          <div className="text-primary">{months[currentMonth]}</div>
          <img
            className="btn rotate-arrow"
            src={arrow_right}
            onClick={(e) => {
              increament_month(1);
            }}
          />
        </div>       
        </div>

      </div>

      <div className="course-state d-flex flex-reverse mt-1 mb-3 ml-1">
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
              <div className="block-week" style={{
                        borderTopLeftRadius: key === 0 ? '0.625rem' : '0',
                        borderTopRightRadius: key === weeks_arr.length - 1 ? '0.625rem' : '0',
                    }}>{week}</div>
            </div>
          );
        })}
      </div>
      <div id="calender-block" className="calender-table" style={{borderRadius:'0 0 0.625rem 0.625rem',border:'1px solid var(--main-blue25)'}} >
        {render_week_array}
      </div>

                   {courseShow && (
                <div className="course-info">
                    <div className="course-info-header">
                       {courseShow.courses[0]?.month}/{courseShow.courses[0]?.day} {courseShow.courses[0]?.dayOfWeek}
                    </div>
                    <div className="course-info-content">
                        {courseShow.courses.map((course, index) => (
                            <div className="course-info-item d-flex" key={index} onClick={() => handleCourseClick(courseShow.courses[index])}>
                                <div className="course-info-item-left">
                                  <div style={{fontWeight:'700'}}>{course.startTime}</div>
                                    <div>
                                    {(course.date > today.getTime()) ? "已預約" :"已完課"}
                                    </div>
                                
                                </div>
                                <div className={`progress-line ${
                            course.date > today.getTime() ? 'not-attend' : 'finished'}`}>

                                </div>
                                <div className="course-info-item-right" style={{fontSize:'0.8rem'}}>
                                    <div>學生:  {course.student}</div>
                                    <div>時長:  {course.time}分鐘</div>
                                    <div>類別:  {course.category}</div>
                                    </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

      {courseList.length > 0  && isCourseOpen && (
           <TeacherGoClassModal 
           show={isCourseOpen} 
           handleCourseClose={handleCourseClose} 
           selectedCourse={selectedCourse}
          setSelectedCourse={setSelectedCourse}
          courseShow={courseShow}
          setCourseShow={setCourseShow}
        />
         )}
    </>
    )
}
export default Teacher_profile_Calender;