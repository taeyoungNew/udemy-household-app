import FullCalendar from "@fullcalendar/react";
import React from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import jaLocale from "@fullcalendar/core/locales/ja";
import "../calendar.css";
import { DatesSetArg, EventContentArg } from "@fullcalendar/core";
import { Balance, CalendarContent, Transaction } from "../types";
import { calculateDailyBalances } from "../utils/financeCalculations";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { formatCurrency } from "../utils/formatting";

// 각일일마다 이벤트를 표시
const renderEventContent = (eventInfo: EventContentArg) => {
  return (
    <div>
      <div className="money" id="event-income">
        {eventInfo.event.extendedProps.income}
      </div>
      <div className="money" id="event-expense">
        {eventInfo.event.extendedProps.expense}
      </div>
      <div className="money" id="event-balance">
        {eventInfo.event.extendedProps.balance}
      </div>
    </div>
  );
};

// 달력
interface CalendarProps {
  monthlyTransactions: Transaction[];
  setCurrentMonth: React.Dispatch<React.SetStateAction<Date>>;
  setCurrentDay: React.Dispatch<React.SetStateAction<string>>;
}
const Calendar = ({
  monthlyTransactions,
  setCurrentMonth,
  setCurrentDay,
}: CalendarProps) => {
  const daliyBalances = calculateDailyBalances(monthlyTransactions);
  const calendarEvents = createCalendarEvents(daliyBalances);
  // 달력을 넘길때 실행되는 함수
  const handleDateSet = (datesetInfo: DatesSetArg) => {
    // 이 함수가 실행될때마다 그 해당달의 월 일을 setCurrentMonth에 set한다.
    setCurrentMonth(datesetInfo.view.currentStart);
  };

  // dateClick이 발생했을때 dateInfo에 그 날의 날짜데이터를 파라미터로 받는다.
  const handleDateClick = (dateInfo: DateClickArg) => {
    // console.log(dateInfo);
    setCurrentDay(dateInfo.dateStr);
  };

  // 1일 이벤트
  return (
    <FullCalendar
      locale={jaLocale} // 일본어
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={calendarEvents}
      eventContent={renderEventContent}
      datesSet={handleDateSet} // 달력을 넘기는 버튼을 클릭시 이벤트발생
      dateClick={handleDateClick} // 달력상의 각 일을 누르면 이벤트 발생
    />
  );
};

const createCalendarEvents = (
  dailyBalances: Record<string, Balance>
): CalendarContent[] => {
  // recode타입도 Object.keys메서드로 key를 취득할수 있구나
  return Object.keys(dailyBalances).map((date) => {
    const { income, expense, balance } = dailyBalances[date];
    return {
      start: date,
      income: formatCurrency(income),
      expense: formatCurrency(expense),
      balance: formatCurrency(balance),
    };
  });
};

export default Calendar;
