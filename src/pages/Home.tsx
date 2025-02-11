import React from "react";
import Box from "@mui/material/Box";

import Calendar from "../component/Calendar";
import TransactionForm from "../component/TransactionForm";
import TransactionMenu from "../component/TransactionMenu";
import MonthlySummary from "../component/MonthlySummary";

const Home = () => {
  return (
    <Box sx={{ display: "flex" }}>
      {/* 왼쪽 컨텐츠 */}
      <Box sx={{ flexGrow: 1 }}>
        <MonthlySummary />
        <Calendar />
      </Box>
      {/* 오른쪽 컨텐츠 */}
      <Box>
        <TransactionMenu />
        <TransactionForm />
      </Box>
    </Box>
  );
};

export default Home;
