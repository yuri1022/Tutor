import { useState,useEffect,useRef } from 'react';
import arrow_right from './../assets/images/svg/arrow-right.svg';
import arrow_left from './../assets/images/svg/arrow-left.svg';
const Students_profile_Calender = () =>{
    const today = new Date();
    const today_month = today.getMonth();
    const today_year = today.getFullYear();
    const [currentMonth,setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    console.log(currentMonth);
    console.log(currentYear);
    const calender_block = useRef(null);

    const course_list = [{
        year:2024,
        month:2,
        day:2,
        subject:'多益',
        teacher:'Grace',
        time: `17:00-17:30`,
    },
    {
        year:2024,
        month:2,
        day:2,
        subject:'多益',
        teacher:'Gracsse',
        time: `21:00-22:30`,
    },
    {
        year:2024,
        month:2,
        day:5,
        subject:'睡覺',
        teacher:'Kspsss',
        time: `22:00-24:00`
    }
    ]
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
        console.log(month);
        console.log(is_lunar);
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
    const show_course = (course_list)=>{
        for(let i = 0 ; i<course_list.length; i++){
            //console.log(`${course_list[i].subject}`);
            let newDiv = `
            <div>
                <div>${course_list[i].subject}</div>
                <div>${course_list[i].teacher}</div>
                <div>${course_list[i].time}</div>
            </div>`
        }
    }

    let firstDayOfMonth= new Date(currentYear, currentMonth, 1).getDay();
    let dayInMonth= get_days_in_month(currentYear,currentMonth);
    const weeks_arr = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

    const render_week_array = [];
    let currentDay = 1;
    let key = 0 ;
    
    for(let i = 0 ; i < 5; i++)
    {
        const render_day_arr = [];
        for (let j=1 ; j < 8; j++){
            if(i===0 && j < firstDayOfMonth ){
                render_day_arr.push(<div className="col calender_block" key={'calender'+key}></div>);
            }
            else if(currentDay <= dayInMonth){
                let newDiv = [];
                for( let z=0; z<course_list.length; z++){
                    //console.log(course_list[z].day);
                    //console.log(currentDay)
                    if(course_list[z].day ===currentDay && course_list[z].month-1 === currentMonth && course_list[z].year === currentYear){
                    newDiv.push(
                    <div className="" key={z}>
                        <div>{course_list[z].subject}</div>
                        <div>{course_list[z].teacher}</div>
                        <div>{course_list[z].time}</div>
                    </div>)
                    }
                }
                render_day_arr.push(<div  className="col calender_block" key={'calender'+key}>{currentDay}{newDiv}</div>);
                currentDay++;
            }
            else{
                render_day_arr.push(<div className="col calender_block" key={'calender'+key}></div>);
            }
            key++;
        }
        render_week_array.push(<div className="d-flex " key={i}>{render_day_arr}</div>)
    }
    show_course(course_list );
    useEffect(()=>{

    },[])

    useEffect(()=>{  
    },[currentMonth,currentYear])
    return(
        <>
        <div className="d-flex justify-between mb-20px">
            <select className="month-selection" name="months" value={currentMonth} onChange={(e)=>{
                console.log(parseInt(e.target.value));
                setCurrentMonth(parseInt(e.target.value))}}>
            {
                months.map((month,key)=>{
                    return(
                        <option key={key} value={key} onClick={()=>{setCurrentMonth(key)}}> {month}</option>
                    )
                })
            }
            </select>
            <div className="d-flex items-center">
                <img className="btn" src={arrow_left} onClick={(e)=>{increament_year(-1)}}/>
                <div className="text-primary">{currentYear}</div>
                <img className="btn rotate-arrow" src={arrow_left} onClick={(e)=>{increament_year(1)}}/>
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
                <div className="d-flex items-center mr-10px">
                    <div className="circle-icon bg-not-seat mr-10px"></div>
                    <div className="">缺席</div>
                </div>
                <div className="d-flex items-center mr-10px">
                    <div className="circle-icon bg-o-not-l mr-10px"></div>
                    <div className="">已預約未聽課</div>

                </div>
            </div>
            <div className="d-flex">
            {
                    weeks_arr.map((week,key)=>{
                        return(
                            <div className="col" key={week}>
                                <div className="block-week bg-primary">{week}</div>
                            </div>
                        )
                    })
            }
                
            </div>
            <div id="calender-block" className="calender_table">{render_week_array}</div>
        </>
    )
}
export default Students_profile_Calender;