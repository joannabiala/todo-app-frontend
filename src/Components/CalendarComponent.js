import React, {useState} from 'react';
import Calendar from 'react-calendar';


const CalendarComponent = () => {
  const [value, onChange] = useState(new Date());
  return (
    <div className="col-xs-12  col-sm-12 col-md-12 col-lg-12 col-xl-3" id="calendarComponent">
      <div id="rightComponent">
        <div className="col-12">
          <div id="calendar">
            <Calendar
              className="mx-auto"
              onChange={onChange}
              value={value}
            />
          </div>
          <div id="footer">
            <div id="footer-element" className="text-center">© 2020 Joanna Biała
            </div>
            <div id="footer-element" className="text-center">
              <p>
                <a id="github" href="https://github.com/joannabiala">
                  Visit my GitHub profile! &hearts;
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CalendarComponent;