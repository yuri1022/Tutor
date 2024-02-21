import { Modal,Button,Form } from "react-bootstrap";
import PropTypes from 'prop-types';
import { useState,useEffect } from 'react';


const TeacherEditInfo = ({ show, handleClose, handleSave , teacher }) => {
  const [editedData, setEditedData] = useState({ ...teacher });
  const [category, setCategory] = useState(editedData.category);
  const DummyCategories = ["多益", "托福", "雅思","日常會話","旅遊英文","新聞英文","商用英文"]; // 根据实际情况添加类别

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

  const handleNationChange = (e) => {
    // 更新編輯的資料
    setEditedData({
      ...editedData,
      [e.target.name]: e.target.value,
    });
  };

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

    const handleImageChange = (e) => {
    // 上传新图片的处理
    const file = e.target.files[0];
    // 在这里你可以执行上传逻辑，例如使用 FormData 将图片上传到服务器
    // 这里只是简单地将图片转换成 Base64 格式并保存在 editedData 中
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditedData({
          ...editedData,
          avatar: reader.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

const handleSaveClick = () => {
  const updatedData = {
    ...editedData,
    category: category,
  };

  // 将編輯的資料傳遞給父層組件的回調函數
  handleSave(updatedData);

  console.log("保存后的 updatedData：", updatedData);

  handleClose();
};


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>編輯個人資料</Modal.Title>
      </Modal.Header>

      <Modal.Body>
          {/* 在這裡顯示教師資料和提供編輯功能 */}
        <Form>
          <Form.Group controlId="formName">

            <Form.Label>頭像</Form.Label>
            <Form.Control type="file" name="avatar" onChange={handleImageChange} />

            <Form.Label>姓名</Form.Label>
            <Form.Control type="text" name="name" value={editedData.name} onChange={handleInputChange} />

            <Form.Label>國籍</Form.Label>
            <Form.Control type="text" name="nation" value={editedData.nation} onChange={handleNationChange} />

            {/* 之後改下拉式選單 */}

            <Form.Label>類別</Form.Label>
            <div>
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
          </Form.Group>

          {/* 其他編輯欄位... */}
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={handleSaveClick}>
          儲存
        </Button>
        <Button variant="secondary" onClick={handleClose}>
          關閉
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

TeacherEditInfo.propTypes = {
  show: PropTypes.bool.isRequired,  
  handleClose: PropTypes.func.isRequired,
  handleSave:PropTypes.func.isRequired,  
  teacher: PropTypes.object.isRequired,  
};

export default TeacherEditInfo;