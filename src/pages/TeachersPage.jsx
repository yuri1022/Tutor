import Navbar from '../components/Navbar';
import  { DummyTeachers }  from '../components/TeachersData'
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';
import { Dropdown } from 'react-bootstrap';

const ImageContainer = styled.div`
  width: 360px;
  height: 360px; 
`;

const Image = styled.img`
  width: 100%; 
  height: 100%; 
  object-fit: cover; 
`;

const TeachersPage = () => {
  const { id } = useParams();
  const selectedTeacher = DummyTeachers.find(teacher => teacher.id === String(id));
  return <div>
    <Navbar />
      <div className="div-container col col-11" style={{ margin:'5% 0% 3% 7%'}}>
       {selectedTeacher && (
          <div key={selectedTeacher.id} style={{display:'flex'}}>
            <ImageContainer>
              <Image src={selectedTeacher.avatar} alt={selectedTeacher.name} />
            </ImageContainer>
            
            <div className="teacher-info" style={{ display: 'flex', flexDirection: 'column',position:'absolute',top:'15%',left:'32%'}}>
            <h1 className='teacher-name'>{selectedTeacher.name}</h1>
            <h4 className='teacher-nation'>{selectedTeacher.nation}</h4>
            <h3 className='teacher-rating'>Rating:{selectedTeacher.rating}</h3>
            </div>

            <div className="teacher-reserve" style={{position:'absolute',top:'15%',right:'40%'}}>
              <div>預約上課</div>
                <Dropdown>
                <Dropdown.Toggle variant="light btn-lg" id="dropdown-basic">
                  Time
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item href="#">Regular link</Dropdown.Item>
                  <Dropdown.Item href="#" active>
                    Active link
                  </Dropdown.Item>
                  <Dropdown.Item href="#">Another link</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>

              <Button className='btn-info'>Submit</Button>
            </div>
      
          </div>
        )}
      </div>

  </div>;
};

export default TeachersPage;