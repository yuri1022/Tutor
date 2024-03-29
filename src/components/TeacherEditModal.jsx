import { Modal,Button,Form } from "react-bootstrap";
import PropTypes from 'prop-types';
import { useState,useEffect } from 'react';
import '../assets/scss/editmodal.scss';
import ReactFlagsSelect from "react-flags-select";


const TeacherEditInfo = ({ show, handleClose, handleSave , teacherDetails, editingSection }) => {
  const [editedData, setEditedData] = useState({ ...teacherDetails });
  const [category, setCategory] = useState([...new Set(teacherDetails.teaching_categories.map(categories => categories.Category.name))]);
  const [nation, setNation] = useState(editedData.nation);
  const [uploadImageModal, setUploadImageModal] = useState(false);

const AllCategories = [
  { label: "多益", value: 1 },
  { label: "托福", value: 2 },
  { label: "雅思", value: 3 },
  { label: "生活會話", value: 5 },
  { label: "旅遊英文", value: 6 },
  { label: "新聞英文", value: 7 },
  { label: "商用英文", value: 4 }
];

useEffect(() => {
  // 当传递给组件的 teacher 属性发生变化时，更新内部状态
  setEditedData({ ...teacherDetails });
  setCategory(teacherDetails.teaching_categories || []);
}, [teacherDetails]);


useEffect(() => {
  // 当传递给组件的 teacher 属性发生变化时，更新内部状态
  setEditedData({ ...teacherDetails });
  
  // 將教師的分類轉換為字符串陣列
  const initialCategories = teacherDetails.teaching_categories
    ? [...new Set(teacherDetails.teaching_categories.map(category => category.categoryId))]
    : [];

  setCategory(initialCategories);
}, [teacherDetails]);


  const handleInputChange = (e) => {
    // 更新編輯的資料
    setEditedData({
      ...editedData,
      [e.target.name]: e.target.value,
    });
  };

  // 处理国籍输入框变化
const handleNationChange = (code) => {
  setNation(code);
};


// 处理类别选择变化
const handleCategoryChange = (selectedCategory) => {
  setCategory((prevCategory) => {
    if (prevCategory.includes(selectedCategory)) {
      // 如果类别已经存在，移除它
      return prevCategory.filter((c) => c !== selectedCategory);
    } else {
      // 如果类别不存在，添加它
      return [...prevCategory, selectedCategory];
    }
  });
};

  // 处理图片上传变化
    const handleImageChange = (e) => {
    setUploadImageModal(true);

    const file = e.target.files[0];
    // 在这里你可以执行上传逻辑，例如使用 FormData 将图片上传到服务器
    // 这里只是简单地将图片转换成 Base64 格式并保存在 editedData 中
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedData((prevData) => ({
        ...prevData,
        avatar: reader.result,
      }));
      };
      reader.readAsDataURL(file);
    }
  };

  // 处理保存按钮点击 
const handleSaveClick = () => {
  const updatedData = {
  name: editedData.name,
  nation: nation,
  category: category,
  avatar: editedData.avatar,
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
              <img className="img" src={editedData.avatar} alt="avatar" />

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
              
            </div>

          </Form.Group>

          {/* 其他編輯欄位... */}
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