import { Form,Button } from "react-bootstrap";
import PropTypes from "prop-types";



const ApplyStep2 = ({ setIntroduction, onNextStep }) => {
  return (
 <div className="container" style={{ marginTop: "6%" }}>
      <Form className="form-step">
        <Form.Group className="mb-3">
          <Form.Label>Your Introduction</Form.Label>
          <Form.Control as="textarea" rows={6} onChange={(e) => setIntroduction(e.target.value)} />
        </Form.Group>
        <Button variant="primary" onClick={onNextStep}>
          上一步
        </Button>
        <Button variant="primary" onClick={onNextStep}>
          下一步
        </Button>
      </Form>
    </div>
  );
};

ApplyStep2.propTypes = {
  setIntroduction: PropTypes.func.isRequired,
  onNextStep: PropTypes.func.isRequired,
   onPrevious: PropTypes.func.isRequired,
};

export default ApplyStep2;