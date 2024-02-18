import { memo } from 'react'
import { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Select from 'react-select';

const localizer = momentLocalizer(moment);

const MyCalendar = memo(() => {
  const [disableMonthNavigation, setDisableMonthNavigation] = useState(false);
  const events = [
    {
      start: new Date(),
      end: new Date(moment().add(1, 'days')),
      title: 'Sample Event',
    },
  ];

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
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        <button type="button" onClick={goToBack}>
          {'<'}
        </button>
        <button type="button" onClick={goToNext}>
          {'>'}
        </button>
      </span>
      <span className="rbc-toolbar-label">{toolbar.label}</span>
      <span className="rbc-btn-group">
        <Select
          options={monthOptions}
          onChange={handleMonthChange}
          defaultValue={monthOptions.find((opt) => opt.value === toolbar.date.getMonth())}
          isDisabled={disableMonthNavigation}
        />
  
      </span>
    </div>
  );
};

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        components={{
          toolbar: CustomToolbar,
        }}
      />
    </div>
  );
});

MyCalendar.displayName = 'MyCalendar';

export default MyCalendar;