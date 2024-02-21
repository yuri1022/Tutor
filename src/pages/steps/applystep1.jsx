import { Form,Button } from "react-bootstrap";
import PropTypes from "prop-types";


const ApplyStep1 = ({ setName, setNation, onNextStep }) => {
  return (
 <div className="container" style={{ marginTop: "6%" }}>
      <Form className="form-step">
        <Form.Group className="mb-3">
          <Form.Label>Your Name</Form.Label>
          <Form.Control type="text" onChange={(e) => setName(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Your Nation</Form.Label>
          <Form.Control type="text" onChange={(e) => setNation(e.target.value)} />
        </Form.Group>

        <Button variant="primary" onClick={onNextStep}>
          下一步
        </Button>
      </Form>
    </div>
  );
};

ApplyStep1.propTypes = {
  setName: PropTypes.func.isRequired,
  setNation: PropTypes.func.isRequired,
  onNextStep: PropTypes.func.isRequired,
};

export default ApplyStep1;