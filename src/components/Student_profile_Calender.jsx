import { useState,useEffect,useRef,useContext } from 'react';
import arrow_right from './../assets/images/svg/arrow-right.svg';
import arrow_left from './../assets/images/svg/arrow-left.svg';
import axios from 'axios';
import { AppContext } from '../App';
const Students_profile_Calender = ({openRatingModal,openGoClassModal}) =>{
    const today = new Date();
    const today_month = today.getMonth();
    const today_year = today.getFullYear();
    const [currentMonth,setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [courseList, setCourseList] = useState([]);
    const calender_block = useRef(null);
    const student_data = JSON.parse(localStorage.getItem("userdata")).data;
    const { state } = useContext(AppContext);
    const [courseShow,setCourseShow] = useState('');

    const api = 'http://34.125.232.84:3000';

    const handleYearChange = (e) => {
      setCurrentYear(parseInt(e.target.value));
    };
  const yearsRange = Array.from({ length: 11 }, (_, index) => currentYear - 5 + index);

const showData = (date, courses) => {
    setCourseShow({
        date: date,
        courses: courses
    });
};
console.log(courseShow)


const handleClickDay = (date, coursesForDay) => {
    showData(date, coursesForDay);
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
        //console.log(month);
        //console.log(is_lunar);
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



    let firstDayOfMonth= new Date(currentYear, currentMonth, 1).getDay();
    let dayInMonth= get_days_in_month(currentYear,currentMonth);
    const weeks_arr = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

    const render_week_array = [];
    let currentDay = 1;
    let key = 0 ;
    const show_course=(course,index)=>{
        let course_block = ``
        let course_date = new Date(course.timestamp);

        // if( course.isattend ===false && course.timestamp < today.getTime()){
        //     course_block =
        //     <div className="course-block bg-absent" key={index}>
        //         <div className="title-bar absent">{course_list[index].subject}</div>
        //         <div>{course_list[index].teacher}</div>
        //         <div>{course_list[index].time}</div>
        //     </div>
        // }
        if( course.timestamp > today.getTime()){
            course_block =
            <div className="course-block bg-reserve" key={index} onClick={(e) => { openGoClassModal(course.name, course.date, course.time, course.courseId)}}>
                <div className="title-bar reserve display-none">{course.subject}</div>
                <div className="display-none">{course.name}</div>
                <div className="display-none">{course.startTime}~{course.endTime}</div>

            </div>
        }
        else if ( course.rating===null){
            course_block =             
            <div className="course-block bg-not-review" key={index} onClick={()=>{openRatingModal(course.name,course.date,course.courseId)}}>
                <div className="title-bar notreview display-none">{course.subject}</div>
                <div className="display-none">{course.name}</div>
                <div className="display-none">{course.startTime}~{course.endTime}</div>

            </div>
        }
        else if ( course.rating!==null ){
            course_block =
            <div className="course-block bg-finish" key={index}>
                <div className="title-bar finish display-none">{course.subject}</div>
                <div className="display-none">{course.name}</div>
                <div className="display-none">{course.startTime}~{course.endTime}</div>

            </div>
        }

        return(course_block);
    }

    for(let i = 0 ; i < 5; i++)
    {

        const render_day_arr = [];
        for (let j=1 ; j < 8; j++){
            if(i===0 && j < firstDayOfMonth ){
                render_day_arr.push(<div className="col calender_block bg-deep" key={'calender'+key}></div>);
            }
            else if(currentDay <= dayInMonth){
                let newDiv = [];
                let count_course = 0;
                const coursesForCurrentDay = courseList.filter(course => course.day === currentDay && course.month - 1 === currentMonth && course.year === currentYear);
                for( let z=0; z<courseList.length; z++){
                    //console.log(currentDay)
                    if( courseList[z].day === currentDay &&
                        courseList[z].month - 1 === currentMonth &&
                        courseList[z].year === currentYear){
                        if(count_course > 2){
                            newDiv.push(
                                <button className="btn-more" key={'btn-more'+key}>More</button>
                            )
                            z = courseList.length;
                        }
                        else{
                        let inner = show_course(courseList[z],z);
                        newDiv.push(
                        inner)
                        }
                        count_course++;
                    }
                }
                render_day_arr.push(
                           <div className="col calender_block" key={'calender' + key} onClick={(e) => handleClickDay(currentDay, coursesForCurrentDay)}>
                        {currentDay}{newDiv}</div>

                );
                currentDay++;
            }
            else{
                render_day_arr.push(<div className="col calender_block bg-deep" key={'calender'+key}></div>);
            }
            key++;
        }
        render_week_array.push(<div className="d-flex" style={{overflow:'hidden'}} key={i}>{render_day_arr}</div>)
    }
    useEffect(() => {
        const fetchStudentData = async () => {
          try {
            const studentId = JSON.parse(localStorage.getItem("userdata")).data.id;
            const response = await axios.get(`${api}/student/${studentId}`);
    
            const studentData = response.data;
    
            console.log('Student Data:', studentData);
    
            if (studentData.data.Registrations) {
            
               const courses = studentData.data.Registrations.map(course => {
                const startDate = new Date(course.Course.startAt);
                const endTime = new Date(startDate.getTime() + course.Course.duration * 60000); 
                const startHours =  startDate.getHours();
                const startMinutes = startDate.getMinutes();
                const endHours = endTime.getHours();
                const endMinutes = endTime.getMinutes();
                const formattedEndMinutes = endMinutes.toString().padStart(2, '0');
                const formattedStartMinutes = startMinutes.toString().padStart(2, '0');
                return {
                courseId: course.courseId,
                year: startDate.getFullYear(),
                month: startDate.getMonth() + 1,
                hour: startDate.getHours(),
                day: startDate.getDate(),
                min:startDate.getMinutes(),
                name: course.Course.name,
                subject: course.Course.category[0],
                 time: course.Course.duration,
                 isattend: true,
                 timestamp: startDate.getTime(),
                date: course.Course.startAt,
                rating: course.rating,
                comment: course.comment,
                startTime: `${startHours}:${formattedStartMinutes}`,
                endTime: `${endHours}:${formattedEndMinutes}`, 
                };
              });
              setCourseList(courses);
              console.log('Coursedata',courses);
            }else{
                console.log('No courses data available.');
            }
          } catch (error) {
            console.error('Error fetching teacher data:', error);
          }
        };
    
        if (JSON.parse(localStorage.getItem("userdata")).data) {
          fetchStudentData();
        }
    
      }, []);
    useEffect(()=>{

    },[]);


    useEffect(()=>{  
    },[currentMonth,currentYear])
    return(
        <>
        <div className="d-flex justify-between mb-20px">
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
            <div className="d-flex items-center">
                <img className="btn" src={arrow_left} onClick={(e)=>{increament_month(-1)}}/>
                <div className="text-primary">{months[currentMonth]}</div>
                <img className="btn rotate-arrow" src={arrow_left} onClick={(e)=>{increament_month(1)}}/>
            </div>
        </div>

            <div className="d-flex flex-reverse mb-10px"> 
                <div className="d-flex items-center ">
                    <div className="circle-icon bg-finsh mr-10px"></div>
                    <div className="">已完課</div>

                </div>
                <div className="d-flex items-center mr-10px">
                <div className="circle-icon bg-no-dis mr-10px"></div>
                    <div className="">未評論</div>

                </div>
                {/* <div className="d-flex items-center mr-10px">
                    <div className="circle-icon bg-not-seat mr-10px"></div>
                    <div className="">缺席</div>
                </div> */}
                <div className="d-flex items-center mr-10px">
                    <div className="circle-icon bg-o-not-l mr-10px"></div>
                    <div className="">已預約未聽課</div>

                </div>
            </div>

            <div className="calendar" >
                <div className="d-flex">
            {
                    weeks_arr.map((week,key)=>{
                        return(
                            <div className="col" key={week} >
                                <div className="block-week"style={{
                        borderTopLeftRadius: key === 0 ? '0.625rem' : '0',
                        borderTopRightRadius: key === weeks_arr.length - 1 ? '0.625rem' : '0',
                    }}>{week}</div>
                            </div>
                        )
                    })
            }
                
            </div>
            <div id="calender-block" style={{borderRadius:'0 0 0.625rem 0.625rem'}} className="calender_table">{render_week_array}</div>
            </div>
             {courseShow && (
                <div className="course-info">
                    <div className="course-info-header">
                       {months[currentMonth]} {courseShow.courses[0].day}
                    </div>
                    <div className="course-info-content">
                        {courseShow.courses.map((course, index) => (
                            <div className="course-info-item d-flex" key={index}>
                                <div className="course-info-item-left">
                                    <div>
                                    {(course.timestamp > today.getTime()) ? "尚未上課" : ((course.comment==null)? "未評論":"已完課") }
                                    </div>
                                <div>{course.startTime}</div>
                                </div>
                                <div className={`progress-line ${
                            course.timestamp > today.getTime() ? 'not-attend' : ''
                             } ${course.comment === null ? 'not-comment' : 'finished'}`}>

                                </div>
                                <div className="course-info-item-right">
                                    <div>課程名稱:{course.name}</div>
                                    <div>時長:{course.time}</div>
                                    <div>類別:{course.subject}</div>
                                    </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}
export default Students_profile_Calender;