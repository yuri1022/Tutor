
const LessonBlock = ()=>{
    return(
        <div className="lesson-block">
            <img src="https://picsum.photos/60/60?random=2" className="img-lesson"></img>
            <div className="lesson-block-info">
                <div className="lesson-block-into-text">
                    <div className="text-lesson">LessonName</div>
                    <span className="text-tutor">Jack</span>
                </div>
                <div>
                <button className="btn btn-outline-success my-2 my-sm-0" >Score</button>
                </div>
            </div>
        </div>
    )
    
}

export default LessonBlock;