import React from 'react';
import Navbar from '../components/NavBar';
import StudentCollection from '../components/StudentCollection'
import TeacherCollection from '../components/TeacherCollection';

const UserPage = () => {
  return <div>UserPage
    <Navbar />
    <TeacherCollection />
    <StudentCollection />
  </div>;
};

export default UserPage;