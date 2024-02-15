import { useState,useEffect,useRef } from 'react';
const Students_profile_Calender = () =>{
    const today = new Date();
    const today_month = today.getMonth();
    const today_year = today.getFullYear();
    const [currentMonth,setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    console.log(currentMonth);
    console.log(currentYear);
    const calender_block = useRef(null);
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

    console.log(calender_block);
    let firstDayOfMonth= new Date(currentYear, currentMonth, 1).getDay();
    let dayInMonth= get_days_in_month(currentYear,currentMonth);
    console.log(check_lunar_year(2023));
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
                render_day_arr.push(<div className="col calender_block" key={'calender'+key}>{currentDay}</div>);
                currentDay++;
            }
            else{
                render_day_arr.push(<div className="col calender_block" key={'calender'+key}></div>);
            }
            key++;
        }
        render_week_array.push(<div className="d-flex " key={i}>{render_day_arr}</div>)
    }
    useEffect(()=>{

    },[])

    useEffect(()=>{

        
    },[currentMonth,currentYear])
    return(
        <>
        <select className="month-selection mb-20px" name="months" value={currentMonth} onChange={(e)=>{
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
            <div id="calender-block" className="calender_table" ref={calender_block}>{render_week_array}</div>
        </>
    )
}
export default Students_profile_Calender;