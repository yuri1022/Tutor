import { useState,useEffect,useContext } from 'react';
import { useNavigate} from 'react-router-dom';
import ReactFlagsSelect from "react-flags-select";
import { ApplyTeacherContext } from './sotre/ApplyTeacherCotext';
import { AppContext } from '../../App';
import { applyTeacher } from '../../api/teacher';
const ApplyTeacherForm = () =>{
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
    const handleCheckboxChange_day = (e)=>{
        const { name, checked } = e.target;
        setWeekdays(prevWeekdays => ({
          ...prevWeekdays,
          [name]: checked
        }));
    }
    const handleCheckboxChange_cg = (e)=>{
        const { name, checked } = e.target;
        setCategoryObj(prevCgObj => ({
          ...prevCgObj,
          [name]: checked
        }));
    }
    const handleApplyTeacher = async()=>{
        const weekday_obj = weekdayforstr();
        const formdata = {
            name:teachername,
            email:userdata?.email,
            password: localStorage.getItem("password"),
            nation: country,
            selfIntro: introTxt,
            teachStyle:teachStyle,
            ...weekday_obj,
        }
        console.log(formdata);
        const applyres= await applyTeacher(userdata.id,formdata);
        navigate('/');

    }
    // console.log('errors:',errors);
    // console.log(errors.teachername);
    useEffect(()=>{
        setTeachername(userdata?.name);
        setIntroTxt(userdata?.selfIntro);
    },[])
        return(
            <div>
                <form className=" h-100 applyForm " action=''>
                {
                    page===1 &&
                   (<>
                        <label htmlFor="teachername" className="title mb-22px">姓名</label>
                        <div className="mb-22px">
                            <input name="teachername" value={teachername}
                            onChange={(e)=>{setTeachername(e.target.value)}}
                            className={`form-control ${teachername===null && 'is-invalid'}`}
                            placeholder="請輸入姓名"/>
    
                            {!teachername==='' && <div id="validationServerusernameFeedback" className="invalid-feedback">
                                請輸入姓名
                            </div>}
                        </div>
    
                        <label className="title mb-22px">請問來自哪個國家請問來自哪個國家</label>
                        <ReactFlagsSelect
                            selected={country}
                            onSelect={(code) => setCountry(code)}
                            placeholder="選擇國家"
                            searchable
                            searchPlaceholder="搜尋國家"
                            
                        />
                        <div className="mb-auto"></div>
                    </>)
                }
                {
                    page===2 && (
                        <>
                            <label className="title mb-22px">簡介</label>
                            <div className="mb-22px">
                            <textarea value={introTxt}
                            onChange={(e)=>{setIntroTxt(e.target.value)}}
                            className={`form-control`} rows={10}   placeholder="請輸入簡介"/>
                            {/* {introTxt && <div id="validationServerusernameFeedback" className="invalid-feedback">
                                請輸入內容
                            </div>} */}
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
                        </div>

                        <label className="title mb-22px">教學風格</label>
                        <div className="mb-22px">
                            <textarea type="text" value={teachStyle} 
                            onChange={(e)=>{setTeachStyle(e.target.value)}}
                            className={`form-control`} rows={5}   
                            placeholder="請輸入教學風格"/>
                        </div>
                    </>

                    )
                }
                {
                    page===4 && (
                        <>
                        <label className="title mb-22px">授課時間1</label>
                        <div className="row">
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
                            page===4 ? (<button type="button" className="btn btn-form" onClick={()=>{handleApplyTeacher()}}>完成表單</button>): 
                            (<button type="button" className="btn btn-form" onClick={()=>{
                                page_add(1);
                            }}>下一步</button>)
                        }             
                    </div>
                </form>
            </div>
        )
}

export default ApplyTeacherForm;