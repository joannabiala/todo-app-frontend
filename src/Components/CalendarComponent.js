import React, {useState} from 'react';
import Calendar from 'react-calendar';

const CalendarComponent = () => {
  const [value, onChange] = useState(new Date());
  return (
    <div className="col-3" id="calendarComponent">
      <div id="rightComponent">
        <div id="calendar" className="col-12">
          <Calendar
            onChange={onChange}
            value={value}
          />
        </div>

        <div id="footer" className="footer">
          <div id="footer-element" className="text-center">© 2020 Joanna Biała
          </div>
          <div id="footer-element" className="text-center">My github: https://github.com/joannabiala
          </div>
        </div>
      </div>
    </div>
  )
}

export default CalendarComponent;