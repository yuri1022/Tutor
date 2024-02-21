
import { Button } from "react-bootstrap";

const ApplyStepProgress = () => {
  return (
          <div className="form-step" style={{margin:'5% 5% 3% 10%' , border:'1px solid',width:'100%',height:'100%'}}>
        <div className="form-step-title">
          <h6>填寫表單</h6>
        </div>
        <div className="form-step-description">
          <h6>完成時間約3分鐘</h6>
          </div>

          <div className="form-step-progress" style={{display:'flex',flexDirection:'column'}}>
            <div className="form-step-progress-item" style={{display:'flex'}}>
              <div className="form-step-progress-item-number">
                <h6>1</h6>
                </div>
                <div className="form-step-progress-item-detail">
                <Button>姓名/國籍</Button>
                </div>              
            </div>

            <div className="form-step-progress-item" style={{display:'flex'}}>
              <div className="form-step-progress-item-number">
                <h6>2</h6>
                </div>
                <div className="form-step-progress-item-detail">
                  <Button>簡介</Button>
                </div>              
            </div>

            <div className="form-step-progress-item" style={{display:'flex'}}>
              <div className="form-step-progress-item-number">
                <h6>3</h6>
                </div>
                <div className="form-step-progress-item-detail">
                  <Button>類別 / 教學風格 / 課程內容</Button>
                </div>              
            </div>

            <div className="form-step-progress-item" style={{display:'flex'}}>
              <div className="form-step-progress-item-number">
                <h6>4</h6>
                </div>
                <div className="form-step-progress-item-detail">
                  <Button>授課時間</Button>
               
                </div>              
            </div>


          </div>
      </div>
  );
};



export default ApplyStepProgress;