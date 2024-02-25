import { Modal,Button,Form } from "react-bootstrap";
import PropTypes from 'prop-types';
import { useState,useEffect } from 'react';
import '../assets/scss/editmodal.scss';


const TeacherEditInfo = ({ show, handleClose, handleSave , teacher,editingSection }) => {
  const [editedData, setEditedData] = useState({ ...teacher });
  const [category, setCategory] = useState(editedData.category);
  const [uploadImageModal, setUploadImageModal] = useState(false);

  const DummyCategories = ["多益", "托福", "雅思","日常會話","旅遊英文","新聞英文","商用英文"]; // 根据实际情况添加类别

 // 当 editedData 发生变化时输出日志
  useEffect(() => {
    console.log(editedData);
  }, [editedData]);

  // 当 category 发生变化时输出日志
  useEffect(() => {
    console.log(category);
  }, [category]);


  const handleInputChange = (e) => {
    // 更新編輯的資料
    setEditedData({
      ...editedData,
      [e.target.name]: e.target.value,
    });
  };

  // 处理国籍输入框变化
  const handleNationChange = (e) => {
    // 更新編輯的資料
    setEditedData({
      ...editedData,
      [e.target.name]: e.target.value,
    });
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
    ...editedData,
    category: category,
  };

  // 将編輯的資料傳遞給父層組件的回調函數
  handleSave(updatedData, editingSection);

  console.log("保存后的 updatedData：", updatedData);

  handleClose();
};


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
      </Modal.Header>

      <Modal.Body>
          {/* 在這裡顯示教師資料和提供編輯功能 */}
        <Form>
          <Form.Group controlId="formName" style={{display:'flex'}}>

            <div className="container-left">

            <div className="edit-img">
            <img src={editedData.avatar} alt="avatar" />
            <Button onClick={handleImageChange}>更換大頭貼</Button>              
            </div>      

            </div>

            <div className="container-right">
            <div className="edit-name">
            <Form.Label>姓名</Form.Label>
            <Form.Control type="text" name="name" 
            value={editedData.name} 
            onChange={(e) => handleInputChange(e)} />
            </div>

            <div className="edit-nation">
            <Form.Label>國籍</Form.Label>
            <Form.Control type="text" name="nation" value={editedData.nation} onChange={handleNationChange} />
            </div>

            {/* 之後改下拉式選單 */}
            <div className="edit-category">
            <div>
          <Form.Label>類別</Form.Label>
          {DummyCategories.map((cat) => (
         <Form.Check
           key={cat}
          type="checkbox"
         id={`cat-${cat}`}
          label={cat}
         checked={category.includes(cat)}
          onChange={() => handleCategoryChange(cat)}
          />
           ))}
          </div>

            </div>
              
            </div>

          </Form.Group>

          {/* 其他編輯欄位... */}
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={handleSaveClick}>
          儲存
        </Button>
        <Button variant="secondary" onClick={() => { setUploadImageModal(false); handleClose(); }}>
          關閉
        </Button>
      </Modal.Footer>

      <Modal show={uploadImageModal} onHide={() => setUploadImageModal(false)}>
    <Modal.Header closeButton>
       <Modal.Title>更換大頭貼</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form.Control type="file" name="avatar" onChange={handleImageChange} />
  </Modal.Body>
  <Button variant="secondary" onClick={() => { setUploadImageModal(false) }}>
   關閉
</Button>
</Modal>
    </Modal>

    
  );
};

TeacherEditInfo.propTypes = {
  show: PropTypes.bool.isRequired,  
  handleClose: PropTypes.func.isRequired,
  handleSave:PropTypes.func.isRequired,  
  teacher: PropTypes.object.isRequired,
  editingSection: PropTypes.object.isRequired, // 新增 editingSection 属性  
};

export default TeacherEditInfo;