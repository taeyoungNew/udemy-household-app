import FullCalendar from "@fullcalendar/react";
// import {
//   // Grid2,
//   // Card,
//   // CardContent,
//   // Stack,
//   // Typography,
//   Box,
// } from "@mui/material";
// import React from "react";
import dayGridPlugin from "@fullcalendar/daygrid";
import jaLocale from "@fullcalendar/core/locales/ja";
// import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
// import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
// import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import "../calendar.css";
import { EventContentArg } from "@fullcalendar/core";
import { Balance, CalendarContent, Transaction } from "../types";
import { calculateDailyBalances } from "../utils/financeCalculations";
// import { Balance } from "@mui/icons-material";
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
}
const Calendar = ({ monthlyTransactions }: CalendarProps) => {
  const daliyBalances = calculateDailyBalances(monthlyTransactions);
  const calendarEvents = createCalendarEvents(daliyBalances);
  // 1일 이벤트
  console.log(calendarEvents);

  return (
    <FullCalendar
      locale={jaLocale} // 일본어
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={calendarEvents}
      eventContent={renderEventContent}
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
