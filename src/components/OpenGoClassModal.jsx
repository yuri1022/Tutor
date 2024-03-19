import icon_teacher from '../assets/images/svg/icon_teacher.svg';
import icon_calender from '../assets/images/svg/icon_calender.svg';
import icon_time from '../assets/images/svg/icon_time.svg';
import '../assets/scss/goclassmodal.scss';
import { Modal , Button } from 'react-bootstrap';

const TeacherGoClassModal = ({ show, handleCourseClose,selectedCourse }) => {
    return (
        <Modal show={show} onHide={handleCourseClose} centered className="teacher-goclass-modal"> 
            <Modal.Header closeButton>
                <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body style={{margin:'1rem'}}>
                    <div className="reserve-contents d-flex" style={{flexDirection:'column',alignItems:'flex-start',margin:'1rem 0 1rem 0'}}>
                        <div className="reserve-info d-flex" style={{flexDirection:'column',justifyContent:'center',margin:'0 2.5rem 0 2.5rem'}}>
                        <div className="reserve-bar d-flex mb-3" style={{alignItems:'center'}}>
                    <img src={icon_teacher} alt="Teacher Icon" style={{marginRight:'1rem'}}/>
                            <div>{selectedCourse.student}</div>
                        </div>
                        <div className="reserve-bar d-flex mb-3 mr-2" style={{alignItems:'center'}}>
                            <img src={icon_calender} alt="Calendar Icon" style={{marginRight:'1rem'}}/>
                            <div>{selectedCourse.year}年{selectedCourse.month}月{selectedCourse.day}日</div>
                        </div>
                        <div className="reserve-bar d-flex mb-3 mr-2" style={{alignItems:'center'}}>
                            <img className="mr-10px" src={icon_time} alt="Time Icon" style={{marginRight:'1rem'}}/>
                            <div>{selectedCourse.startTime}~{selectedCourse.endTime}</div>
                        </div>
                        </div>



                        <div className="reserve-button-list d-flex" style={{width:'100%',justifyContent:'space-between'}}>
                            <Button type="button" className="btn btn-decline-regisiter" onClick={handleCourseClose} style={{width:'45%',backgroundColor:'var(--pink)',border:'none',height:'2.56rem'}}>取消預約</Button>
                            <Button type="button" className="btn btn-goclass" style={{backgroundImage: 'linear-gradient(180deg, #1AEAEA 0%, #3652E3 100%)',border:'none',width:'45%',height:'2.56rem'}}>開始上課</Button>
                        </div>
                    </div>

            </Modal.Body>

        </Modal>
    );
};

export default TeacherGoClassModal;