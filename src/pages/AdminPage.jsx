import { useState, useEffect,useContext  } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const [adminData,setAdminData] = useState('');
  const { state } = useContext(AppContext);
  const navigate = useNavigate();

useEffect(() => {
     const fetchAdminData = async () => {
    try {
      const adminData = state.logindata;

     if(localStorage.getItem("isTeacher")==="undefined"){
       setAdminData(adminData);
       }else{
        console.log('You are not admin'); 
        navigate('/home');   
      }
    return adminData;
    } catch (error) {
      console.error('Admin data fetching error:', error.message);

    }
  };
      if (state.logindata && state.logindata.data) {
      fetchAdminData();
    }
  }, [state]);

  return (

    <>

    {adminData?(
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
      </div>):(
      <div>
        Hi Admin, please login
        </div>
        
        )}

      </>
    
  );
};

export default AdminPage;