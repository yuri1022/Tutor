import React from 'react';
import Navbar from '../components/NavBar';
import TeacherCollection from '../components/TeacherCollection';
import UserPage from './UserPage';
import ApplyTeacher from '../components/ApplyTeacher';

const HomePage = () => {
  return <div>
    <h1>HomePage</h1>
  <Navbar />
  <UserPage />
  <ApplyTeacher />
  <TeacherCollection/>
  </div>;
};

export default HomePage;
