import { memo } from 'react'
import { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Select from 'react-select';
import PropTypes from 'prop-types';
import '../assets/scss/teachercalendar.scss'
import LeftArrow from '../assets/images/svg/arrow-left.svg'
import RightArrow from '../assets/images/svg/arrow-right.svg'

const localizer = momentLocalizer(moment);

const MyCalendar = memo(() => {
  const [disableMonthNavigation, setDisableMonthNavigation] = useState(false);

  const reservedDates = [
    moment('2024-02-22T17:30:00').toDate(),
    moment('2024-02-24T18:30:00').toDate(),
  ];

 const allDates = Array.from({ length: 30 }, (_, index) =>
    new Date(moment().add(index, 'days'))
  );

  // 根據已預約名單標識是否已預約
const events = allDates.flatMap(date => {
  const timeRangeStart1 = moment(date).set('hour', 17).set('minute', 0);
  const timeRangeEnd1 = moment(date).set('hour', 17).set('minute', 30);

  const timeRangeStart2 = moment(date).set('hour', 18).set('minute', 0);
  const timeRangeEnd2 = moment(date).set('hour', 18).set('minute', 30);

  const isReserved1 =
  reservedDates.some(
    reservedDate =>
      moment(reservedDate).isSameOrAfter(timeRangeStart1) &&
      moment(reservedDate).isBefore(timeRangeEnd1)
  );

const isReserved2 =
  reservedDates.some(
    reservedDate =>
      moment(reservedDate).isSameOrAfter(timeRangeStart2) &&
      moment(reservedDate).isBefore(timeRangeEnd2)
  );
  const eventsForDate = [];

  if (isReserved1) {
  eventsForDate.push({
    start: timeRangeStart1.toDate(),
    end: timeRangeEnd1.toDate(),
    title: 'Evening Event 1',
    reserved: true,
  });
} else {
  eventsForDate.push({
    start: timeRangeStart1.toDate(),
    end: timeRangeEnd1.toDate(),
    title: 'Evening Event 1',
    reserved: false,
  });
}

if (isReserved2) {
  eventsForDate.push({
    start: timeRangeStart2.toDate(),
    end: timeRangeEnd2.toDate(),
    title: 'Evening Event 2',
    reserved: true,
  });
} else {
  eventsForDate.push({
    start: timeRangeStart2.toDate(),
    end: timeRangeEnd2.toDate(),
    title: 'Evening Event 2',
    reserved: false,
  });
}

  return eventsForDate;
});


const CustomToolbar = (toolbar) => {
  const goToBack = () => {
    const newDate = moment(toolbar.date).subtract(11, 'month');
    toolbar.onNavigate('PREV', newDate);
    setDisableMonthNavigation(false);
  };

  const goToNext = () => {
    const newDate = moment(toolbar.date).add(11, 'month');
    toolbar.onNavigate('NEXT', newDate);
    setDisableMonthNavigation(false);
  };

const handleMonthChange = (selectedOption) => {
  console.log('Selected Month:', selectedOption);
  
  // 確保 toolbar.date 是 Date 物件
const currentDate = moment(toolbar.date).toDate();


  if (!isNaN(currentDate.getTime())) {
    const newDate = moment(currentDate).set('month', selectedOption.value);
    toolbar.onNavigate('DATE', newDate.toDate());
    setDisableMonthNavigation(true);
  }

  setDisableMonthNavigation(false);
};

  const monthOptions = moment.months().map((month, index) => ({
    value: index,
    label: month,
  }));


  return (
    <div className="rbc-toolbar" >

      <div className="rbc-toolbar-top" >
      
      <span className="rbc-btn-group-month-option" style={{zIndex:'10'}}>
        <Select
          options={monthOptions}
          onChange={handleMonthChange}
          defaultValue={monthOptions.find((opt) => opt.value === toolbar.date.getMonth())}
          isDisabled={disableMonthNavigation}
        />
  
      </span>

      <span className="rbc-btn-group-year">
        <button type="button" className="year-control" onClick={goToBack}>
          <img src={LeftArrow} alt="" />
        </button>

        <span className="year">{toolbar.date.getFullYear()} {/* 這裡顯示年份 */}</span>
           
        <button type="button" className="year-control" onClick={goToNext}>
          <img src={RightArrow} alt="" />
        </button>
      </span>


      </div>

      <div className="reserve">
        <span>可預約</span>
        <span>不可預約</span>
      </div>

    </div>

  );
};

  const EventComponent = ({ event }) => {
    const start = moment(event.start).format('HH:mm');
    const end = moment(event.end).format('HH:mm');
    return (
      <div className={event.reserved ? 'reserved' : 'not-reserved' } >
        {`${start}-${end}`}    </div>
    );
  };

  // 添加 PropTypes
EventComponent.propTypes = {
  event: PropTypes.shape({
    start:PropTypes.instanceOf(Date).isRequired,
    end:PropTypes.instanceOf(Date).isRequired,
    reserved: PropTypes.bool.isRequired,
  }).isRequired,
};

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: '80vh',width:'150vh' }}
        components={{
          toolbar: CustomToolbar,
            event: EventComponent,

        }}
      />
    </div>
  );
});

MyCalendar.displayName = 'MyCalendar';

export default MyCalendar;