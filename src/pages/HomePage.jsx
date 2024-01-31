import Navbar from '../components/Navbar';
import TeacherCollection from '../components/TeacherCollection';
import ApplyTeacher from '../components/ApplyTeacher';
import { Button } from 'react-bootstrap';
import styled from "styled-components"

const HomePage = () => {
  return <div>
    <h1>HomePage</h1>
  <Navbar />
  <ApplyTeacher />
  <TeacherCollection/>
  <Button>Test1</Button>
  <Button variant='warning'>Test1</Button>
  <ButtonStyle>test2</ButtonStyle>
  </div>;
};

const ButtonStyle = styled(Button)`
font-weight:bold;
font-size:32px;
`;

export default HomePage;
