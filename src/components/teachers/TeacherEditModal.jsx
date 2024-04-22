import { Modal,Button,Form } from "react-bootstrap";
import PropTypes from 'prop-types';
import { useState,useEffect } from 'react';
import ReactFlagsSelect from "react-flags-select";
import Swal from "sweetalert2";
import DefaultImg from '../../assets/images/svg/defaultimg.svg';


const TeacherEditInfo = ({ show, handleClose, handleSave , teacherDetails, editingSection }) => {
  const [editedData, setEditedData] = useState({ ...teacherDetails });
  const [category, setCategory] = useState([...new Set(teacherDetails.teaching_categories.map(categories => categories.Category.name))]);
  const [nation, setNation] = useState(editedData.nation);
  const [weekdays, setWeekdays] = useState({
  mon: teacherDetails.mon,
  tue: teacherDetails.tue,
  wed: teacherDetails.wed,
  thu: teacherDetails.thu,
  fri: teacherDetails.fri,
  sat: teacherDetails.sat,
  sun: teacherDetails.sun,
});
  const [uploadImageModal, setUploadImageModal] = useState(false);
  const [ file ,setFile] = useState({})
const AllCategories = [
  { label: "多益", value: 1 },
  { label: "托福", value: 2 },
  { label: "雅思", value: 3 },
  { label: "生活會話", value: 5 },
  { label: "旅遊英文", value: 6 },
  { label: "新聞英文", value: 7 },
  { label: "商用英文", value: 4 }
];

const handleWeekdaysChange = (e) => {
  const { name, checked } = e.target;
  setWeekdays((prevWeekdays) => ({
    ...prevWeekdays,
    [name]: checked,
  }));
};

useEffect(() => {
  setEditedData({ ...teacherDetails });
  setCategory(teacherDetails.teaching_categories || []);
}, [teacherDetails]);


useEffect(() => {
  setEditedData({ ...teacherDetails });
    const initialCategories = teacherDetails.teaching_categories
    ? [...new Set(teacherDetails.teaching_categories.map(category => category.categoryId))]
    : [];

  setCategory(initialCategories);
}, [teacherDetails]);


  const handleInputChange = (e) => {
    setEditedData({
      ...editedData,
      [e.target.name]: e.target.value,
    });
  };
console.log(editedData.name);

const handleNationChange = (code) => {
  setNation(code);
};

const handleCategoryChange = (selectedCategory) => {
  setCategory((prevCategory) => {
    if (prevCategory.includes(selectedCategory)) {
      return prevCategory.filter((c) => c !== selectedCategory);
    } else {
      return [...prevCategory, selectedCategory];
    }
  });
};


  const handleImageChange = (e) => {
        setUploadImageModal(true);
        const file = e.target.files[0];
        if (file) {
          const fileType = file.type.split('/')[1]; // 获取文件类型
          if (fileType !== 'jpg' && fileType !== 'png' && fileType !== 'jpeg') {
            Swal.fire({
                title: '錯誤!',
                text: '只允許上傳 JPG 或 PNG 格式的圖片!',
                icon: 'error',
                confirmButtonText: '確定'
            });
            return;
          }
          const reader = new FileReader();
          reader.onloadend = () => {
            setEditedData(
                {
                  name:editedData.name,
                  avatar: reader.result,
                  category:category,
                  nation:nation,
                }
            );
          };
          reader.readAsDataURL(file);
          setFile(file);
          setUploadImageModal(false);
        }
      };

const handleSaveClick = () => {
  const updatedData = {
  name: editedData.name,
  nation: nation,
  category: category,
  avatar: file,
  mon:weekdays.mon,
    tue: weekdays.tue,
    wed: weekdays.wed,
    thu: weekdays.thu,
    fri: weekdays.fri,
    sat: weekdays.sat,
    sun: weekdays.sun,
  };

  // 将編輯的資料傳遞給父層組件的回調函數
  handleSave(updatedData, editingSection);
  handleClose();
  console.log(editedData.avatar);
  console.log("保存后的 updatedData：", updatedData);
  
};

  return (
    <Modal className="edit-modal" show={show} onHide={handleClose} size="md" centered>
      <Modal.Header closeButton>
      </Modal.Header>

      <Modal.Body>
          {/* 在這裡顯示教師資料和提供編輯功能 */}
        <Form>
          <Form.Group className="edit-form" controlId="formName" style={{display:'flex'}}>

            <div className="container-left col-12 col-md-4 col-lg-4">

            <div className="edit-img d-flex">
              <div className="edit-img-container">
              <img className="img" src={editedData.avatar&&editedData.avatar.length>0?editedData.avatar:DefaultImg} alt="avatar" />

              </div>
                   
            </div>
            <div className="edit-img-name d-flex">{editedData.name}</div>      
            <Button className="edit" variant="outline-primary" onClick={handleImageChange}>更換大頭貼</Button>     
            </div>

            <div className="container-right col-12 col-md-8 col-lg-8">
            <div className="edit-name">
            <Form.Label className="edit-name-title">姓名</Form.Label>
            <Form.Control className="edit-name-input" type="text" name="name" 
            value={editedData.name} 
            onChange={handleInputChange}/>
            </div>

            <div className="edit-nation">
             <Form.Label className="edit-nation-title">國籍</Form.Label>
               
            <div className="edit-nation-input">
           <ReactFlagsSelect
            selected={nation}
            onSelect={handleNationChange}
            placeholder="選擇國家"
            searchable
          searchPlaceholder="搜尋國家"
          />
          </div>
               
            </div>


            <div className="edit-category">
          <Form.Label>類別</Form.Label>    
            <div className="edit-category-items">
          
          {AllCategories.map((cat,) => (
     <Form.Check
       key={cat.value}
        type="checkbox"
       id={`cat-${cat.value}`}
       label={cat.label}
       checked={category.includes(cat.value)}
        onChange={() => handleCategoryChange(cat.value)}
       />
           ))}
          </div>

            </div>
            <div className="edit-weekdays mt-2">
                <Form.Label>每週可上課時間</Form.Label>
                <div className="edit-weekdays-items d-flex" style={{flexWrap:'wrap'}}>
    <Form.Check
      type="checkbox"
      id="mon"
      name="mon"
      label="星期一"
      checked={weekdays.mon}
      onChange={handleWeekdaysChange}
    />
    <Form.Check
      type="checkbox"
      id="tue"
      name="tue"
      label="星期二"
      checked={weekdays.tue}
      onChange={handleWeekdaysChange}
    />
        <Form.Check
      type="checkbox"
      id="wed"
      name="wed"
      label="星期三"
      checked={weekdays.wed}
      onChange={handleWeekdaysChange}
    />
    <Form.Check
      type="checkbox"
      id="thu"
      name="thu"
      label="星期四"
      checked={weekdays.thu}
      onChange={handleWeekdaysChange}
    />    
    <Form.Check
      type="checkbox"
      id="fri"
      name="fri"
      label="星期五"
      checked={weekdays.fri}
      onChange={handleWeekdaysChange}
    />    
    <Form.Check
      type="checkbox"
      id="sat"
      name="sat"
      label="星期六"
      checked={weekdays.sat}
      onChange={handleWeekdaysChange}
    />    
        <Form.Check
      type="checkbox"
      id="sun"
      name="sun"
      label="星期日"
      checked={weekdays.sun}
      onChange={handleWeekdaysChange}
    />    
            </div>
            </div>



              
            </div>

          </Form.Group>

    
        </Form>
      </Modal.Body>

      <div className="footer">

        <div className="footer-item d-flex">
      <Button className="close" variant="secondary" onClick={() => { setUploadImageModal(false); handleClose(); }}>
          取消
        </Button>     

        <Button className="save" variant="primary" onClick={handleSaveClick}>
          確定
        </Button>             
        </div>


      </div>


     

      <Modal className="pic-upload-modal"show={uploadImageModal} onHide={() => setUploadImageModal(false)}>
    <Modal.Header className="pic-upload-header" closeButton>
       <Modal.Title className="pic-upload-title">請上傳圖片</Modal.Title>
  </Modal.Header>
  <Modal.Body  className="pic-upload-body">
    <Form.Control type="file" name="avatar" onChange={handleImageChange} />
  </Modal.Body>
  <div className="pic-upload-button d-flex">
  <Button className="pic-upload-btn" variant="outline-secondary" onClick={() => { setUploadImageModal(false) }}>
   關閉
</Button>

  </div>

</Modal>
    </Modal>

    
  );
};

TeacherEditInfo.propTypes = {
  show: PropTypes.bool.isRequired,  
  handleClose: PropTypes.func.isRequired,
  handleSave:PropTypes.func.isRequired,  
  editingSection: PropTypes.object.isRequired,
  setEditingContent:PropTypes.func.isRequired,  

  teacherDetails: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    nation: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    selfIntro: PropTypes.string.isRequired,
    teachStyle: PropTypes.string.isRequired,
    ratingAverage: PropTypes.string.isRequired,
    Courses: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      teacherId: PropTypes.number.isRequired,
      category: PropTypes.arrayOf(PropTypes.string).isRequired,
      name: PropTypes.string.isRequired,
      intro: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      startAt: PropTypes.string.isRequired,
      duration: PropTypes.number.isRequired,
      Registrations: PropTypes.arrayOf(PropTypes.shape({
        rating: PropTypes.number.isRequired,
        comment: PropTypes.string.isRequired,
      })).isRequired,
    })).isRequired,
    teaching_categories: PropTypes.arrayOf(PropTypes.shape({
      categoryId: PropTypes.number.isRequired,
      Category: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    })).isRequired,
  }),
};

export default TeacherEditInfo;