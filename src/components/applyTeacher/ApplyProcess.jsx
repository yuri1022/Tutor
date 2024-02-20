import { useContext,useReducer} from 'react'
import { ApplyTeacherContext } from './sotre/ApplyTeacherCotext'
const ApplyProcess = () =>{
    const contextdata = useContext(ApplyTeacherContext);
    const page = contextdata.page;
    return(
              <div className="process-shower">
                <div className="process-line d-flex items-center justify-space-between mb-22px">
                  <div className="icon-circle mr-10px">1</div>
                  <div className={`process-bar ${ page===1? 'active': ''}`}>姓名 / 國籍</div>
                </div>
                <div className="process-line d-flex items-center justify-space-between mb-22px">
                  <div className="icon-circle mr-10px">2</div>
                  <div className={`process-bar ${page===2? 'active': ''}`}>簡介</div>
                </div>
                <div className="process-line d-flex items-center justify-space-between mb-22px">
                  <div className="icon-circle mr-10px">3</div>
                  <div className={`process-bar ${page===3? 'active': ''}`}>類別 / 教學分格 / 課程內容</div>
                </div>
                <div className="process-line-end d-flex items-center justify-space-between ">
                  <div className="icon-circle mr-10px">4</div>
                  <div className={`process-bar ${page===4? 'active': ''}`}>授課時間</div>
                </div>
              </div>
    )

}

export default ApplyProcess;