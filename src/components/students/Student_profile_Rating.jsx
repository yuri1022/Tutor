import { useState } from 'react';
const Student_profile_Rating = ({closeRatingModal}) =>{
    const [review,setReview] = useState('');
    const [rating, setRating] = useState(null);
    const handleChange = (value) => {
      setRating(value);
    };
    const starArr = [ '5顆星','4顆星','3顆星','2顆星','1顆星'];
    return(
        <div className="modal fade" id="ratingStudent_Profile_Modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
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
                            <textarea className="input-review" value={review} rows={5}  onChange={(e)=>{setReview(e.target.value)}}/>
                        </div>
                    </form>

                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={closeRatingModal}>取消</button>
                <button type="button" className="btn btn-primary">送出</button>
            </div>
            </div>
        </div>
        </div>
    )

}

export default Student_profile_Rating;