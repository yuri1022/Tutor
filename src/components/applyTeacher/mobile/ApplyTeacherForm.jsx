import { useState,useEffect,useContext } from 'react';
import { useNavigate} from 'react-router-dom';
import ReactFlagsSelect from "react-flags-select";
import { AppContext } from '../../../App.jsx';
import { applyTeacher } from '../../../api/teacher.js';
import { ApplyTeacherContext, ApplyTeacherProvider } from "../sotre/ApplyTeacherCotext.jsx";
import countries from '../data/country.js';
const ApplyFormInner = () =>{
    const [validateName,setValidateName] = useState(false);
    const [ validateCountry,setValidateCountry] = useState(false);
    const [ validateIntro,setValidateIntro] = useState(false);
    const [ validateStyle,setValidateStyle]  = useState(false);
    const [ validateWeekdays,setValidateWeekdays] = useState(false);
    const [ validateCategoryObj,setValidateCategoryObj] = useState(false);
    const {page,page_add} = useContext(ApplyTeacherContext);
    const userdata = useContext(AppContext).state.logindata.data;
    const navigate = useNavigate();
    const [teachername,setTeachername] = useState('');
    const [country,setCountry] = useState('');
    const [introTxt, setIntroTxt] = useState('');
    const [teachStyle,setTeachStyle] = useState('');
    const [weekdays, setWeekdays] = useState({
        mon: false,
        tue: false,
        wed: false,
        thu: false,
        fri: false,
        sat: false,
        sun: false,
      });
      const weekdayforstr = ()=>{
        let c= JSON.parse(JSON.stringify(weekdays));
        for (let key in c) {
            // 检查对象是否拥有该属性，避免从原型链继承的属性
            c[key]= c[key].toString();
        }
        console.log(c);
        return c;
    }

      const [categoryObj,setCategoryObj]=useState({
        1:false,
        2:false,
        3:false,
        4:false,
        5:false,
        6:false,
        7:false
      });
      const categroyLabels = ['多益','托福','雅思','商用英文','生活會話','旅遊英文','新聞英文'];
      const weekLabels = {
        mon: '星期一',
        tue: '星期二',
        wed: '星期三',
        thu: '星期四',
        fri: '星期五',
        sat: '星期六',
        sun: '星期日'
      };
      //handle change formdata
      //cg
      const handleTeacherName=(name)=>{
        if(name.trim().length!==0){
            setValidateName(false);
        }
        setTeachername(name);
    }
    const handleIntroTxt = (intro)=>{
        if(intro.trim().length!==0){
            setValidateIntro(false);
        }
        setIntroTxt(intro);
    }

    const handleTeachStyle= (style)=>{
        if(style.trim().length!==0){
            setValidateStyle(false);
        }
        setTeachStyle(style);
    }
    const categoryToList=()=>{
        let cg_list = [];
        let count =1;
        for(let key in categoryObj){
            if(categoryObj[key]===true){
                cg_list.push(count)
            }
            count++;
        }
        return cg_list;
    }
    const changeCountryISO = ()=>{
        const country_name = countries[country];
        return country_name;
    }
    //checkbox
    const handleCheckboxChange_day = (e)=>{
        if(e.target.checked===true){
            setValidateWeekdays(false);
        }
        const { name, checked } = e.target;
        setWeekdays(prevWeekdays => ({
          ...prevWeekdays,
          [name]: checked
        }));
    }
    const handleCheckboxChange_cg = (e)=>{
        const { name, checked } = e.target;
        if(e.target.checked===true){
            setValidateCategoryObj(false);
        }
        setCategoryObj(prevCgObj => ({
          ...prevCgObj,
          [name]: checked
        }));
    }
    const handlePageAdd = (page)=>{
        if(page===1){
            if(teachername.trim().length === 0 ){
                setValidateName(true);
            }
            if(country.trim().length === 0){
                setValidateCountry(true);
            }
            if(teachername.trim().length !== 0 && country.trim().length !== 0 ){
                page_add(1);
            }
        }
        else if(page===2){
            if(introTxt.trim().length===0){
                setValidateIntro(true);
                
            }
            else{
                page_add(1);
            }

        }
        else if(page===3){
            if(Object.values(categoryObj).includes(true)===false ){
                setValidateCategoryObj(true); 
            }
            if(teachStyle.trim().length===0){
                setValidateStyle(true);
            }
            if(Object.values(categoryObj).includes(true)===true &&teachStyle.trim().length!==0 ){
                page_add(1);
            }
        }
        else if(page===4){
            if(Object.values(weekdays).includes(true)===false){
                setValidateWeekdays(true);
            }
            if(Object.values(weekdays).includes(true)===true &&Object.values(categoryObj).includes(true)===true
            && introTxt.trim().length!==0 && teachStyle.trim().length!==0
            && teachername.trim().length!==0
            )
            {
                handleApplyTeacher();
            }
        }
    }
    const handleApplyTeacher = async()=>{
        const weekday_obj = weekdayforstr();
        const category_list = categoryToList();
        const country_name = changeCountryISO();
        
        const formdata = {
            name:teachername,
            email:userdata?.email,
            password: localStorage.getItem("password"),
            nation: country_name,
            selfIntro: introTxt,
            teachStyle:teachStyle,
            ...weekday_obj,
            category:category_list
        }
        console.log(formdata);
        // const applyres= await applyTeacher(userdata.id,formdata);
        navigate('/');

    }
    useEffect(()=>{
        const student_data = JSON.parse(localStorage.getItem("userdata")).data;
        setTeachername(student_data.name);
        setIntroTxt(student_data.selfIntro);
    },[])
        return(
            <div className="apply-mobile-container">
              <div className="process-shower mb-22px">
                <div className="process-line d-flex items-center">
                  <div className={`icon-circle ${page===1 ? "active":""}`}>1</div>
                  <div className="line-container">
                    <div className="line"></div>
                  </div>

                </div>
                <div className="process-line d-flex items-center">
                  <div className={`icon-circle ${page===2 ? "active":""}`}>2</div>
                  <div className="line-container">
                    <div className="line"></div>
                  </div>

                </div>
                <div className="process-line d-flex items-center">
                  <div className={`icon-circle ${page===3 ? "active":""}`}>3</div>
                  <div className="line-container">
                    <div className="line"></div>
                  </div>

                </div>
                <div className="process-line-end d-flex items-center">
                  <div className={`icon-circle ${page===4 ? "active":""}`}>4</div>
                  
                </div>
              </div>
                <form className=" h-100 applyFormMobile" action=''>
                {
                    page===1 &&
                   (<>
                        <label htmlFor="teachername" className="title mb-22px">姓名</label>
                        <div className="mb-22px">
                            <input name="teachername" value={teachername}
                            onChange={(e)=>{handleTeacherName(e.target.value)}}
                            className={`form-control ${teachername===null && 'is-invalid'}`}
                            placeholder="請輸入姓名"/>
                            { validateName===true && 
                                (<div className="txt-is-invalid">
                                請輸入姓名
                            </div>)
                            }
                        </div>
    
                        <label className="title mb-22px">請問來自哪個國家請問來自哪個國家</label>
                        <ReactFlagsSelect
                            selected={country}
                            onSelect={(code) => setCountry(code)}
                            placeholder="選擇國家"
                            searchable
                            searchPlaceholder="搜尋國家"
                            
                        />
                        { validateCountry===true && 
                            (<div className="txt-is-invalid">
                                請輸入國籍
                            </div>)
                        }
                        <div className="mb-40px"></div>
                    </>)
                }
                {
                    page===2 && (
                        <>
                            <label className="title mb-22px">簡介</label>
                            <div className="mb-22px">
                            <textarea value={introTxt}
                            onChange={(e)=>{handleIntroTxt(e.target.value)}}
                            className={`form-control mb-40px`} rows={10}   placeholder="請輸入簡介"/>
                            {validateIntro===true && 
                            <div className="txt-is-invalid">
                                請輸入簡介
                            </div>}
                        </div>
                        </>
                    )
                }  
                {
                    page===3 &&(
                    <>
                        <label className="title mb-22px">類別</label>
                        <div className="row">
                        {
                            Object.keys(categoryObj).map((cg)=>(
                                <div className="col-3" key={cg}>
                                    <label>
                                        <input
                                        type="checkbox"
                                        name={cg}
                                        checked={categoryObj[cg]}
                                        onChange={(e)=>{handleCheckboxChange_cg(e)}}
                                        />
    
                                        {categroyLabels[cg-1]}
                                    </label>
                                </div>
                            ))
                        }
                        { validateCategoryObj===true && 
                            (<div className="txt-is-invalid">
                            請勾選課程類別
                            </div>)
                        }
                        </div>

                        <label className="title mb-22px">教學風格</label>
                        <div className="mb-40px">
                            <textarea type="text" value={teachStyle} 
                            onChange={(e)=>{handleTeachStyle(e.target.value)}}
                            className={`form-control`} rows={5}   
                            placeholder="請輸入教學風格"/>
                        </div>
                        { validateStyle===true && 
                            (<div className="txt-is-invalid">
                                請輸入教學風格
                            </div>)
                        }
                        
                    </>

                    )
                }
                {
                    page===4 && (
                        <>
                        <label className="title mb-22px">授課時間1</label>
                        <div className="row mb-40px">
                        {
                            Object.keys(weekdays).map((day)=>(                             
                                <div className="col-3" key={day}>
                                    <label >
                                    <input
                                    type="checkbox"
                                    name={day}
                                    checked={weekdays[day]}
                                    onChange={(e)=>{handleCheckboxChange_day(e)}}
                                    />
   
                                    {weekLabels[day]}
                                </label>
                              </div>
                            ))
                        }
                        { validateWeekdays===true && 
                            (<div className="txt-is-invalid">
                                請勾選能安排的課程時間
                            </div>)
                        }
                        </div>
                        </>
                    )
                }
                    <div className="button-list">
                        <div className="mr-auto"></div>
                        <button type="button" 
                        className={`btn btn-form mr-10px ${page===1? 'disabled':''}`}
                        onClick={()=>{
                            page_add(-1);
                        }}
                        >上一步</button>
                        {
                            page===4 ? (<button type="button" className="btn btn-form" onClick={()=>{handlePageAdd(page)}}>完成表單</button>): 
                            (<button type="button" className="btn btn-form" 
                            onClick={()=>{
                                handlePageAdd(page)
                            }}>下一步</button>)
                        }             
                    </div>
                </form>
            </div>

        )

}
const ApplyTeacherForm = () =>{
    return(
        <ApplyTeacherProvider>
            <ApplyFormInner></ApplyFormInner>
        </ApplyTeacherProvider>
    )
}
export default ApplyTeacherForm;