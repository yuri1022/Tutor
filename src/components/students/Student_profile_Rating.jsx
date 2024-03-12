import { useState,useContext } from 'react';
import { put_rating_course } from '../../api/register';
import { get_student_data } from '../../api/student';
import { AppContext } from '../../App';
import PropTypes from 'prop-types';
const Student_profile_Rating = ({closeRatingModal,obj_rating}) =>{
    const [comment,setComment] = useState('');
    const [rating, setRating] = useState(null);
    const {dispatch} = useContext(AppContext);
    const studentData = useContext(AppContext).state.logindata.data;
    const handleChange = (value) => {
      setRating(value);
    };
    const starArr = [ '5顆星','4顆星','3顆星','2顆星','1顆星'];
    const handleRatingSubmit = async()=>{
        let rating_point = 0;
        if(rating==="5顆星"){
            rating_point=5;
        }
        else if (rating==="4顆星"){
            rating_point=4;
        }
        else if (rating === "3顆星"){
            rating_point=3;
        }
        else if (rating === "2顆星"){
            rating_point=2;
        }
        else if(rating=== "1顆星"){
            rating_point=1;
        }

        const rating_res = await put_rating_course(rating_point,comment,studentData.id,obj_rating.courseId);
        console.log(rating_res);
        //update student data
        const student_data =await get_student_data(studentData.id);
        console.log(student_data);
        closeRatingModal();
        dispatch({type:"LOGIN",payload:{logindata:student_data,isTeacher:0,isLogin:true} });

    }
    return(
        <div className="modal fade" id="ratingStudent_Profile_Modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-lg" role="document">
            <div className="ratingStuModal_content modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel"></h5>
                <button type="button" className="close-btn close" data-dismiss="modal" aria-label="Close" onClick={closeRatingModal}>
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div className="modal-body">
                <div className="">
                    <form>

                        <div className="mb-10px">
                            <div className="modal-rating-toptitle mb-10px">{obj_rating.teacher}老師{obj_rating.date.getFullYear()}年{obj_rating.date.getMonth()+1}月{obj_rating.date.getDate()}日的課程評分</div> 
                            <div className="title mb-10px">星等</div>
                            <div className="d-flex">
                                {
                                    starArr.map((star,key)=>(
                                        <div className="form-check" key={key}>
                                            <div className="d-flex items-center">
                                                <input
                                                type="radio"
                                                name={star}
                                                value={star}
                                                checked={rating === star}
                                                onChange={() => handleChange(star)}
                                                />
                                                <label className="form-check-label text-radio" >{star}</label>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="mb-10px">
                            <label className="title mb-10px">評論</label>
                            <textarea className="input-comment" value={comment} rows={5}  onChange={(e)=>{setComment(e.target.value)}} required/>
                        </div>
                    </form>

                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={closeRatingModal}>取消</button>
                <button type="button" className="btn btn-primary" onClick={()=>{handleRatingSubmit()}}>送出</button>
            </div>
            </div>
        </div>
        </div>
    )

}

export default Student_profile_Rating;

Student_profile_Rating.propTypes ={
    closeRatingModal:PropTypes.func.isRequired,
    obj_rating: PropTypes.shape({
        teacher: PropTypes.string.isRequired,
        date: PropTypes.any.isRequired,
        courseId: PropTypes.number.isRequired,
    })
}