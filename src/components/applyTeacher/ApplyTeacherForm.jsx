import { useState,useContext } from 'react';
import { Controller, useForm } from "react-hook-form";
import ReactFlagsSelect from "react-flags-select";
import { ApplyTeacherContext } from './sotre/ApplyTeacherCotext';
import { AppContext } from '../../App';
const ApplyTeacherForm = () =>{
    const contextData = useContext(ApplyTeacherContext);
    const page = contextData.page;
    const userdata = useContext(AppContext).state.logindata;
    const [country,setCountry] = useState('');
    const week_list = ['mon','tue','wed','thu','fri','sat','sun'];
    const { control, register, handleSubmit,formState:{errors} } = useForm({
        defaultValues:{
            teachername: userdata.name,
            intro: userdata.intro,
            email: userdata.email,
            content: '',
            country: '',
            mon: false,
            tue: false,
            wed: false,
            thu: false,
            fri: false,
            sat: false,
            sun: false,
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
                            <input name="teachername" className={`form-control ${errors.teachername && 'is-invalid'}`} {...register("teachername",{required: true , maxLegnth: 20})}  placeholder="請輸入姓名"/>
    
                            {errors.teachername && <div id="validationServerusernameFeedback" className="invalid-feedback">
                                請輸入姓名
                            </div>}
                        </div>
    
                        <label className="title mb-22px">請問來自哪個國家請問來自哪個國家</label>
                        <Controller
                            control={control}
                            name="country"
                            render={({ field }) => (
                            <ReactFlagsSelect
                                selected={field.value}
                                onSelect={(code) => field.onChange(code)}
                                placeholder="選擇國家"
                                searchable
                                searchPlaceholder="搜尋國家"
                            />
                            )}
                        />
                        {/* <ReactFlagsSelect
                            selected={country}
                            onSelect={(code) => setCountry(code)}
                            placeholder="選擇國家"
                            searchable
                            searchPlaceholder="搜尋國家"
                            className={`form-control  ${errors.country && 'is-invalid'}`} {...register("teachername",{required: true})} 
                        /> */}
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
                        <label className="title mb-22px">類別</label>

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
                        <>
                        <label className="title mb-22px">授課時間</label>
                        <div className="row">
                        {
                            week_list.map((day,index)=>(
                                <div className="col-3"key={index}>
                                {
                                    day ==='mon' && (<label htmlFor={day}>星期一</label>)
                                }   
                                {
                                    day ==='tue' && (<label htmlFor={day}>星期二</label>)
                                }               
                                {
                                    day ==='wed' && (<label htmlFor={day}>星期三</label>)
                                }  
                                {
                                    day ==='thu' && (<label htmlFor={day}>星期四</label>)
                                }  
                                {
                                    day ==='fri' && (<label htmlFor={day}>星期五</label>)
                                }  
                                {
                                    day ==='sat' && (<label htmlFor={day}>星期六</label>)
                                }
                                {
                                    day ==='sun' && (<label htmlFor={day}>星期日</label>)
                                }  
                                <Controller
                                name={day}
                                control={control}
                                defaultValue={false}
                                render={({ field }) => (
                                  <input
                                    type="checkbox"
                                    id={day}
                                    {...field}
                                  />
                                )}
                              />
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
                            contextData.page_add(-1);
                        }}
                        >上一步</button>
                        {
                            page===4 ? (<button className="btn btn-form" type="submit">完成表單</button>): 
                            (<button type="button" className="btn btn-form" onClick={()=>{
                                contextData.page_add(1);
                            }}>下一步</button>)
                        }             
                    </div>
                </form>
            </div>
        )
}

export default ApplyTeacherForm;