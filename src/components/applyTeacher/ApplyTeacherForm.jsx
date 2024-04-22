import { useState,useEffect,useContext } from 'react';
import { useNavigate} from 'react-router-dom';
import ReactFlagsSelect from "react-flags-select";
import { ApplyTeacherContext } from './sotre/ApplyTeacherContext';
import { AppContext } from '../../App';
import { applyTeacher } from '../../api/teacher';
import Swal from 'sweetalert2';

const ApplyTeacherForm = () =>{
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
    const [reloadPage, setReloadPage] = useState(false);
    const {state,dispatch} = useContext(AppContext);

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
        if(e.target.checked===true){
            setValidateCategoryObj(false);
        }

        const { name, checked } = e.target;
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
            if(introTxt.trim().length!==0){
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
     try{
        const weekday_obj = weekdayforstr();
        const category_list = categoryToList();
        // const country_name = changeCountryISO();
        const formdata = {
            name:teachername,
            email:userdata?.email,
            password: localStorage.getItem("password"),
            nation: country,
            selfIntro: introTxt,
            teachStyle:teachStyle,
            ...weekday_obj,
            category:category_list
        }
        console.log(formdata);
        const applyres= await applyTeacher(userdata.id,formdata);
        localStorage.setItem("isTeacher", "1"); 
        localStorage.setItem('isHome',"true");
        dispatch({type:"APPLYTEACHER_BACK"});
        Swal.fire({
            title: 'Success',
            text: '申請成功，您現在具有老師身分了！',
            icon: 'success',
            confirmButtonText: '確定'
            }).then((result) => {
        if (result.isConfirmed) {
          setReloadPage(true);
        }
    });
        
    }catch (error) {
    console.error('Error applying for teacher:', error);
  }
};
    useEffect(()=>{
    if (reloadPage) {
        localStorage.setItem('isHome',"true");
      navigate('/home'); // 根据需要跳转到相应的页面
      setReloadPage(false); // 重置 reloadPage 状态，避免重复触发

    }
    },[reloadPage]);

    // console.log('errors:',errors);
    // console.log(errors.teachername);
    useEffect(()=>{
        const student_data = JSON.parse(localStorage.getItem("userdata")).data;
        setTeachername(student_data.name);
        setIntroTxt(student_data.selfIntro);
    },[])


        return(
            <>
                <form className="h-100 applyForm">
                
                {
                    page===1 &&
                   (<>
                        <div className="form-container d-flex">
                        <label htmlFor="teachername" className="title mb-22px">名字</label>
                        <div className="mb-22px">
                            <input name="teachername" value={teachername}
                            onChange={(e)=>{handleTeacherName(e.target.value)}}
                            className={`form-control mt-1 mb-10px${teachername===null && 'is-invalid'}`}
                            placeholder="請輸入名字"
                            required maxLength="20"/>
    
                            { validateName===true && 
                                (<div className="txt-is-invalid mt-1">
                                請輸入姓名
                            </div>)
                            }
                        </div>
    
                        <label className="title mb-22px">請問你來自哪個國家?</label>
                        <ReactFlagsSelect
                            selected={country}
                            onSelect={(code) => setCountry(code)}
                            placeholder="選擇國家"
                            searchable
                            searchPlaceholder="搜尋國家"
                            
                        />
                        { validateCountry===true && 
                            (<div className="txt-is-invalid mt-1">
                                請輸入國籍
                            </div>)
                        }
                        <div className="mb-auto"></div>
                        </div>
                    </>)
                }
                {
                    page===2 && (
                        <>
                        <div className="form-container d-flex">
                            <label className="title mb-22px">簡介</label>
                            <div className="mb-22px">
                            <textarea value={introTxt}
                            onChange={(e)=>{handleIntroTxt(e.target.value)}}
                            className={`form-control`} rows={10}   placeholder="請輸入簡介"
                            required
                            />
                            {validateIntro===true && 
                            <div className="txt-is-invalid mt-1">
                                請輸入簡介
                            </div>}
                        </div>
                        </div>
                        </>
                    )
                }  
                {
                    page===3 &&(
                    <>
                        <div className="form-container d-flex">

                        <label className="title mb-22px">類別</label>
                        <div className="category-container d-flex">
                        {
                            Object.keys(categoryObj).map((cg)=>(
                                <div className="category-item" key={cg}>
                                    <label>
                                        <input
                                        className="form-check-input"
                                        type="checkbox"
                                        name={cg}
                                        checked={categoryObj[cg]}
                                        onChange={(e)=>{handleCheckboxChange_cg(e)}}
                                        required
                                        />
    
                                        {categroyLabels[cg-1]}
                                    </label>
                                </div>
                            ))
                        }
                        </div>
                        { validateCategoryObj===true && 
                                (<div className="txt-is-invalid mt-1">
                                請勾選課程類別
                            </div>)
                        }

                        <label className="title mb-22px">教學風格</label>
                        <div className="mb-22px">
                            <textarea type="text" value={teachStyle} 
                            onChange={(e)=>{handleTeachStyle(e.target.value)}}
                            className={`form-control`} rows={5}   
                            placeholder="請輸入教學風格"/>
                        </div>
                        { validateStyle===true && 
                            (<div className="txt-is-invalid mt-1">
                                請輸入教學風格
                            </div>)
                        }
                        </div>
                    </>

                    )
                }
                {
                    page===4 && (
                        <>
                        <div className="form-container d-flex">

                        <label className="title mb-22px">授課時間</label>
                        <div className="time-text mb-22px">
                            <h6>於下方先勾選每週方便的時間，後續可再至個人頁面以30分鐘或1小時為單位添加課程。</h6>
                        </div>
                        <div className="category-container d-flex">
                        {
                            Object.keys(weekdays).map((day)=>(                             
                                <div className="category-item" key={day}>
                                    <label >
                                    <input
                                    className="form-check-input"
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
                        </div>
                        { validateWeekdays===true && 
                            (<div className="txt-is-invalid mt-1">
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
                        className={`btn btn-previous btn-form mr-10px ${page===1? 'disabled':''}`}
                        onClick={()=>{
                            page_add(-1);
                        }}
                        >上一步</button>
                        {
                            page===4 ? (<button type="button" className="btn btn-finish btn-form" onClick={()=>{handlePageAdd(page)}}>完成表單</button>): 
                            (<button type="button" className="btn btn-next  btn-form" onClick={()=>{
                                handlePageAdd(page);
                            }}>下一步</button>)
                        }             
                    </div>
                </form>
            </>
        )
}

export default ApplyTeacherForm;