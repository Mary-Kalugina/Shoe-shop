import React from 'react';
import './App.css';
import moment from 'moment';
import 'moment/locale/ru';

moment.locale('ru');

const Calendar = ({ date }) => {
  const days = [];
  const year = moment(date).format('YYYY');
  const month = moment(date).format('M');

  function getDays(year, month) {
    const firstDayOfMonth = moment(`${year}-${month}-01`, 'YYYY-M-DD');
    const daysInMonth = moment(`${year}-${month}`, 'YYYY-M').daysInMonth();
    const dayOfWeek = firstDayOfMonth.day();
    const lastDayOfMonth = moment(`${year}-${month}`, 'YYYY-M').endOf('month');
    const today = moment().date();
    if (dayOfWeek !== 1) {
      const startOfWeek = firstDayOfMonth.clone().startOf('week');
    
      for (let i = 0; i < dayOfWeek - 1; i++) {
        const day = startOfWeek.clone().add(i, 'days');
        days.push({
          day: day.format('D'),
          className: 'ui-datepicker-other-month'
        });
      }
    }    
    for (let day = 1; day <= daysInMonth; day++) {
      const isToday = today === day;
      const dayCell = isToday ? (
        { day, className: 'ui-datepicker-today' }
      ) : (
        { day, className: '' }
      );
      days.push(dayCell);
    }
    if (lastDayOfMonth.day() < 7) {
      const daysToAdd = 7 - lastDayOfMonth.day();
      const nextMonth = moment(lastDayOfMonth).add(1, 'day');

      for (let day = 1; day <= daysToAdd; day++) {
        days.push({
          day: nextMonth.date(day).format('D'),
          className: 'ui-datepicker-other-month'
        });
      }
    }
  }

  getDays(year, month);

  const chunkedDays = [];
  for (let i = 0; i < days.length; i += 7) {
    chunkedDays.push(days.slice(i, i + 7));
  }

  return (
    <div className="ui-datepicker">
      <div className="ui-datepicker-material-header">
        <div className="ui-datepicker-material-day">{moment(date).format('dddd')}</div>
        <div className="ui-datepicker-material-date">
          <div className="ui-datepicker-material-day-num">{moment(date).format('D')}</div>
          <div className="ui-datepicker-material-month">{moment(date).format('MMMM')}</div>
          <div className="ui-datepicker-material-year">{year}</div>
        </div>
      </div>
      <div className="ui-datepicker-header">
        <div className="ui-datepicker-title">
          <span className="ui-datepicker-month">{moment(date).format('MMMM')}</span>&nbsp;<span className="ui-datepicker-year">{year}</span>
        </div>
      </div>
    <table className="ui-datepicker-calendar">
      <colgroup>
        <col/>
        <col/>
        <col/>
        <col/>
        <col/>
        <col className="ui-datepicker-week-end" />
        <col className="ui-datepicker-week-end" />
      </colgroup>
      <thead>
        <tr>
          <th scope="col" title="Понедельник">Пн</th>
          <th scope="col" title="Вторник">Вт</th>
          <th scope="col" title="Среда">Ср</th>
          <th scope="col" title="Четверг">Чт</th>
          <th scope="col" title="Пятница">Пт</th>
          <th scope="col" title="Суббота">Сб</th>
          <th scope="col" title="Воскресенье">Вс</th>
        </tr>
      </thead>
      <tbody>
      {chunkedDays.map((chunk, rowIndex) => (
            <tr key={rowIndex}>
              {chunk.map((day) => (
                <td key={day.day} className={day.className}>
                  {day.day}
                </td>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
  </div>
  )
};

export default Calendar;
