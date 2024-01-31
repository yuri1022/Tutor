import Navbar from "../components/Navbar";
import { Button } from 'react-bootstrap';

const ApplyTeacher = () => {
  return (
    <>
  <Navbar />
    <div className="container .col.col-lg-9">
    <h2>Your Instroduction</h2>
    <h2>Your Teaching Style</h2>
    <p>課程視訊連結</p>
    <Button className="submit">Submit</Button>
    </div>
    </>
  );
};

export default ApplyTeacher;