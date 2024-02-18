import { Form,Button } from "react-bootstrap";
import PropTypes from "prop-types";


const ApplyStep3 = ({ setCategory,setTeachingStyle, setVideoLink, onNextStep ,onPrevious}) => {

    // 處理 checkbox 改變的函式
  return (
    <div>

    <div className="reserve-date" style={{ display: "flex" }}>

      <Form className="form-step">

        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control type="text" onChange={(e) => setCategory(e.target.value)} />
        </Form.Group>


        <Form.Group className="mb-3">
          <Form.Label>Your Teaching Style</Form.Label>
          <Form.Control as="textarea" rows={3} onChange={(e) => setTeachingStyle(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>課程視訊連結</Form.Label>
          <Form.Control type="text" onChange={(e) => setVideoLink(e.target.value)} />
        </Form.Group>

        <Button variant="primary" onClick={onPrevious}>
          上一步
        </Button>
        <Button variant="primary" onClick={onNextStep}>
          下一步
        </Button>
      </Form>
              

        </div>
    </div>
  );
};
ApplyStep3.propTypes = {
  setCategory: PropTypes.func.isRequired,
  setTeachingStyle: PropTypes.func.isRequired,
  setVideoLink: PropTypes.func.isRequired,
  onNextStep: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
};

export default ApplyStep3;