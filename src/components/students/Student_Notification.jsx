import { useState } from 'react';
import {  Toast } from 'react-bootstrap';

function Notification({showToast,setShowToast,mode}) {
  const handleShowToast = () => {
    setShowToast(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  return (
    <div>
      <Toast show={showToast} onClose={handleCloseToast} >
        <Toast.Header closeButton={false}>
          <strong className="me-auto">通知訊息</strong>
          <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" onClick={handleCloseToast}></button>
        </Toast.Header>
        {mode==="delete" &&
        (        
        <Toast.Body>
          課程取消成功
        </Toast.Body>)
        }
        {mode==="edit" &&
        (        
        <Toast.Body>
          已完成編輯個人資料
        </Toast.Body>)
        }
        {mode==="rating" &&
        (        
        <Toast.Body>
          完成評分
        </Toast.Body>)
        }
      </Toast>
    </div>
  );
}

export default Notification;
