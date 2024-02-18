import { Form,Button } from "react-bootstrap";
import PropTypes from "prop-types";


const ApplyStep4 = ({ reserveDays, handleCheckboxChange,onPrevious, onSubmit }) => {

    // 處理 checkbox 改變的函式
  return (
    <div>

      <Form>
<div className="reserve-date" style={{ display: "flex" }}>
          {/* 用 map 來動態生成 checkbox */}
          {Object.keys(reserveDays).map((day) => (
            <div className="form-check" key={day}>
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id={`flexCheck${day}`}
                checked={reserveDays[day]}
                onChange={() => handleCheckboxChange(day)}
              />
              <label className="form-check-label" htmlFor={`flexCheck${day}`}>
                {day}
              </label>
            </div>
          ))}
        </div>
      </Form>

            
        <Button variant="primary" onClick={onPrevious}>
          上一步
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          完成表單
        </Button>
    </div>
  );
};

ApplyStep4.propTypes = {
  reserveDays: PropTypes.func.isRequired,
  handleCheckboxChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
 onPrevious: PropTypes.func.isRequired,

};

export default ApplyStep4;