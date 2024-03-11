import axios from "axios";
import { useState, useEffect  } from "react";

const AdminPage = () => {
  const [adminData,setAdminData] = useState('');

  const fetchAdminData = async () => {
    try {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzA4NTg3NjE2LCJleHAiOjE3MTExNzk2MTZ9.AzfDo0YoyfxqT6OMK36oWedaod3cYUv2tbew6w1wM48'; 
      const api = 'http://34.125.232.84:3000';
      const response = await axios.get(
        `${api}/admin/users`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      console.log('Admin data response:', response.data);
      setAdminData(response.data);
      return response.data;
    } catch (error) {
      console.error('Admin data fetching error:', error.message);

    }
  };

useEffect(() => {
    fetchAdminData();
  }, []); // 空的依賴數組表示僅在組件第一次渲染時調用

  console.log(adminData);

  return (
    <div className="admin-page-container col-12">
    <table className="admin-container col-11" style={{margin:'1rem 3.75rem 1rem 3.75rem',textAlign:'center',borderCollapse: 'collapse', borderSpacing: '0',lineHeight:'2rem'}}>
       <thead>
        <tr style={{ backgroundColor: 'var(--main-blue)', color: 'var(--white)' }}>
      <th>編號</th>
      <th>用戶名</th>
      <th>是否為老師</th>
        </tr>
       </thead>

      <tbody>

      {adminData && adminData.data.map((data)=>(
        <tr key={data.id} style={{color:'var(--main-blue)'}}>        
        <td style={{border:'1px solid var(--grey-300)'}}>{data.id}</td>
        <td style={{border:'1px solid var(--grey-300)'}}>{data.name}</td>
        <td style={{border:'1px solid var(--grey-300)'}}>{data.isTeacher === 1 ? '老師' : '學生'}</td>
        </tr>
      )
        
      ) }   
      

      </tbody>


      </table>
      </div>
  );
};

export default AdminPage;