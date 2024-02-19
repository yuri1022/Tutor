import { Modal , Card ,CardImg } from "react-bootstrap";
import PropTypes from 'prop-types';
import Rating from '../assets/images/svg/rating.svg';
import '../assets/scss/commentmodal.scss'


const CommentModal = (props) => {

  const percent = 50; 
  //之後補percent計算式

  const rootStyle = {
    '--percent': `${percent}%`,
  };
  return (
    <Modal size="xl" show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
      </Modal.Header>

      <Modal.Body>
        <div className="modal-container col col -12" style={{display:'flex'}}>

        <div className="modal-container-left col col -6" style={{display:'flex',flexDirection:'column'}}>

          <div className="modal-comment-counts">

            <div className="modal-comment-title">課程評價</div>
              <div className="modal-comment-count">
              <div className="modal-comment-count-item" style={{display:'flex'}}>  
               <div className="toggle">
                <input className="form-check-input" type="checkbox" value=""/>              
               </div>

               <div className="title">
                <span>5顆星</span>
               </div>
               <div className="percentimg" style={{ width: `${percent}%` }}>
                <div className="progressbar" style={rootStyle}></div>
               </div>
               <div className="percent">100%</div>
             
              </div>
              </div>

              <div className="modal-comment-count">
              <div className="modal-comment-count-item" style={{display:'flex'}}>  
               <div className="toggle">
                <input className="form-check-input" type="checkbox" value=""/>              
               </div>

               <div className="title">
                <span>4顆星</span>
               </div>
               <div className="percentimg" style={{ width: `${percent}%` }}>
                <div className="progressbar" style={rootStyle}></div>
               </div>
               <div className="percent">100%</div>
             
              </div>
              </div>

              <div className="modal-comment-count">
              <div className="modal-comment-count-item" style={{display:'flex'}}>  
               <div className="toggle">
                <input className="form-check-input" type="checkbox" value=""/>              
               </div>

               <div className="title">
                <span>3顆星</span>
               </div>
               <div className="percentimg" style={{ width: `${percent}%` }}>
                <div className="progressbar" style={rootStyle}></div>
               </div>
               <div className="percent">100%</div>
             
              </div>
              </div>

              <div className="modal-comment-count">
              <div className="modal-comment-count-item" style={{display:'flex'}}>  
               <div className="toggle">
                <input className="form-check-input" type="checkbox" value=""/>              
               </div>

               <div className="title">
                <span>2顆星</span>
               </div>
               <div className="percentimg" style={{ width: `${percent}%` }}>
                <div className="progressbar" style={rootStyle}></div>
               </div>
               <div className="percent">100%</div>
             
              </div>
              </div>

              <div className="modal-comment-count">
              <div className="modal-comment-count-item" style={{display:'flex'}}>  
               <div className="toggle">
                <input className="form-check-input" type="checkbox" value=""/>              
               </div>

               <div className="title">
                <span>1顆星</span>
               </div>
               <div className="percentimg" style={{ width: `${percent}%` }}>
                <div className="progressbar" style={rootStyle}></div>
               </div>
               <div className="percent">100%</div>
             
              </div>
              </div>

          </div>

          <div className="modal-category">

            <div className="modal-category-title">課程類別</div>
            <div className="modal-category-detail">{props.teacher.category}</div>
            
          </div>

        </div>

        
        <div className="modal-container-right col col -6">

          <div className="modal-comment-detail "> 

          <Card className="class-comment-info-card" style={{fontSize:'16px',margin:'10px 10px 20px 0'}}>
            <Card.Body className="class-comment-info-card-body"> 
            <div className="card-container" style={{display:'flex'}}>

            <div className="card-img" style={{width:'60px',height:'40px'}}> 
            <CardImg className="class-comment" src={props.teacher?.avatar} style={{borderRadius:'50%',width:'40px',height:'40px'}} />
            </div>


             <div className="card-title">
            <Card.Title>Office ipsum</Card.Title>
            <Card.Title>2024年02月04日</Card.Title>
            </div> 

            <div className="card-rating">
              <img src={Rating} alt="rating" />3.0
            
            </div>


            </div>
        
            <div className="card-description">

            <Card.Text className="class-comment-info">
              Office ipsum you must be muted. Keep fured tentative break land sorry baked productive growth. Mifflin incentivization put able hour timepoint hits. Important unlock activities on t-shaped back-end move wanted. Hop run based anyway mifflin call got.
              </Card.Text>


            </div>

      
            

            </Card.Body>
          </Card>

                    <Card className="class-comment-info-card" style={{fontSize:'16px',margin:'10px 10px 20px 0'}}>
            <Card.Body className="class-comment-info-card-body"> 
            <div className="card-container" style={{display:'flex'}}>

            <div className="card-img" style={{width:'60px',height:'40px'}}> 
            <CardImg className="class-comment" src={props.teacher?.avatar} style={{borderRadius:'50%',width:'40px',height:'40px'}} />
            </div>


             <div className="card-title">
            <Card.Title>Office ipsum</Card.Title>
            <Card.Title>2024年02月04日</Card.Title>
            </div> 

            <div className="card-rating">
              <img src={Rating} alt="rating" />3.0
            
            </div>


            </div>
        
            <div className="card-description">

            <Card.Text className="class-comment-info">
              Office ipsum you must be muted. Keep fured tentative break land sorry baked productive growth. Mifflin incentivization put able hour timepoint hits. Important unlock activities on t-shaped back-end move wanted. Hop run based anyway mifflin call got.
              </Card.Text>


            </div>

      
            

            </Card.Body>
          </Card>
         

                   <Card className="class-comment-info-card" style={{fontSize:'16px',margin:'10px 10px 20px 0'}}>
            <Card.Body className="class-comment-info-card-body"> 
            <div className="card-container" style={{display:'flex'}}>

            <div className="card-img" style={{width:'60px',height:'40px'}}> 
            <CardImg className="class-comment" src={props.teacher?.avatar} style={{borderRadius:'50%',width:'40px',height:'40px'}} />
            </div>


             <div className="card-title">
            <Card.Title>Office ipsum</Card.Title>
            <Card.Title>2024年02月04日</Card.Title>
            </div> 

            <div className="card-rating">
              <img src={Rating} alt="rating" />3.0
            
            </div>


            </div>
        
            <div className="card-description">

            <Card.Text className="class-comment-info">
              Office ipsum you must be muted. Keep fured tentative break land sorry baked productive growth. Mifflin incentivization put able hour timepoint hits. Important unlock activities on t-shaped back-end move wanted. Hop run based anyway mifflin call got.
              </Card.Text>


            </div>

      
            

            </Card.Body>
          </Card>
         
         


          </div>

        </div>



        </div>

        
      </Modal.Body>

      <Modal.Footer>
        <button className="btn btn-secondary" onClick={props.handleClose}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

CommentModal.propTypes = {
  show: PropTypes.bool.isRequired,  
  handleClose: PropTypes.func.isRequired,
  teacher: PropTypes.object.isRequired,  
};

export default CommentModal;