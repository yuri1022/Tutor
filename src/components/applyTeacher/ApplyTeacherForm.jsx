import { useState,useEffect,useContext } from 'react';
import { useForm } from "react-hook-form";
import ReactFlagsSelect from "react-flags-select";
import { ApplyTeacherContext } from './sotre/ApplyTeacherCotext';

const ApplyTeacherForm = () =>{
    const contextData = useContext(ApplyTeacherContext);
    const page = contextData.page;
    const [country,setCountry] = useState('');
    const { register, handleSubmit,formState:{errors} } = useForm({
        defaultValues:{
            teachername: '',
            intro: '',
            content: '',
        },
        mode: 'onTouched'
    });
    const onSubmit = (data)=>{
        console.log(data);
    }
    // console.log('errors:',errors);
    // console.log(errors.teachername);
        return(
            <div>
                <form className=" h-100 applyForm " action='' onSubmit={handleSubmit(onSubmit)}>
                {
                    page===1 &&
                   (<>
                        <label htmlFor="teachername" className="title mb-22px">姓名</label>
                        <div className="mb-22px">
                            <input className={`form-control  ${errors.teachername && 'is-invalid'}`} {...register("teachername",{required: true , maxLegnth: 20})}  placeholder="請輸入姓名"/>
    
                            {errors.teachername && <div id="validationServerusernameFeedback" className="invalid-feedback">
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
                            <textarea className={`form-control  ${errors.intro && 'is-invalid'}`} rows={10} {...register("intro",{required: true , maxLegnth: 30})}  placeholder="請輸入內容"/>
                            {errors.intro && <div id="validationServerusernameFeedback" className="invalid-feedback">
                                請輸入內容
                            </div>}
                        </div>
                        </>
                    )
                }  
                {
                    page===3 &&(
                        <>
                        <label className="title mb-22px">課程內容</label>
                        <div className="mb-22px">
                        <textarea className={`form-control  ${errors.content && 'is-invalid'}`} rows={5} {...register("content",{required: true , maxLegnth: 200})}  placeholder="請輸入內容"/>
                        {errors.content && <div id="validationServerusernameFeedback" className="invalid-feedback">
                            請輸入內容
                        </div>}
                    </div>
                    </>

                    )
                }
                {
                    page===4 && (
                        <div>
                            授課時間
                        </div>
                    )
                }
                    <div className="button-list">
                        <div className="mr-auto"></div>
                        <button type="button" 
                        className={`btn btn-form mr-10px ${page===1? 'disabled':''}`}
                        onClick={(e)=>{
                            contextData.page_add(-1);
                        }}
                        >上一步</button>
                        {
                            page===4 ? (<button type="button" className="btn btn-form">完成表單</button>): 
                            (<button type="button" className="btn btn-form" onClick={(e)=>{
                                contextData.page_add(1);
                            }}>下一步</button>)
                        }             
                    </div>
                </form>
            </div>
        )
}

export default ApplyTeacherForm;