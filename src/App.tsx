import React, { useEffect, useState } from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Report from "./pages/Report";
import NoMatch from "./pages/NoMatch";
import Applayout from "./component/layout/Applayout";
import { theme } from "./theme/theme";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { Transaction } from "./types/index";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { formatMonth } from "./utils/formatting";

// Firestore에거인지 아닌지를 판단하는 타입가드
function isFireStoreError(
  err: unknown
): err is { code: string; message: string } {
  return typeof err === "object" && err !== null && "code" in err;
}
/**
 * App
 *
 * @returns Router
 */
function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  // const dateFormat = format(currentMonth, "yyyy-MM");

  // データは初回レンダリング時のみ取得するためにuseEffectを利用
  useEffect(() => {
    const fecheTransaction = async () => {
      try {
        // firebase의 데이터 출력해보기
        const querySnapshot = await getDocs(collection(db, "Transactions"));
        const transactionsData = querySnapshot.docs.map((doc) => {
          // console.log(doc.id, doc.data());
          return {
            id: doc.id,
            ...doc.data(),
          } as Transaction; // <= 타입어설션
        });

        setTransactions(transactionsData);
      } catch (error) {
        // firebase의 에러인지 아닌지를 구별
        // firebase의 에러는 error오브젝트안에
        // code와 message가 포함되어 있다.
        if (isFireStoreError(error)) {
          console.error("firebase에러: ", error);
        } else {
          console.error("일반 에러: ", error);
        }
      }
    };
    fecheTransaction();
  }, []);

  const monthlyTransactions = transactions.filter((tran) => {
    // startsWith():해당문자열이 지정된 접두사로 시작하는지 여부를 확인
    // boolean값을 반환
    return tran.date.startsWith(formatMonth(currentMonth));
  });
  return (
    // 어플 전체에 적용시키기위해
    // 그리고 별도로 브라우저에서 폰트를 import까지해야한다.
    // Router태그를 ThemeProvider로 감싼다.
    <ThemeProvider theme={theme}>
      {/* 
        CssBaseline:resetcss와 같은 역할을 하는 태그  
        브라우저의 디폴트 css를 리셋하고 MUI의 css를 적용시킨다.
      */}
      <CssBaseline />
      <Router>
        <Routes>
          {/* /path에 표시될 컴포넌트를 element에 넣는다. */}
          <Route path="/" element={<Applayout />}>
            {/* 자식 Route가 index요소를 가지면 부모가 호출되었을 떄 그 자식도 호출된다. */}
            {/* 
            path="/"를 가진 Route의 자식Route가 같은 Path를 가질경우 index속성을 부여하면 
            /path일때 해당 자식 route도 함께 불리게 된다.
          */}
            <Route
              index
              element={<Home monthlyTransactions={monthlyTransactions} />}
            ></Route>
            <Route path="/report" element={<Report />}></Route>
            {/* "*"는 위의 path에 일치하지 않는 모든 기타 path를 의미 */}
            <Route path="*" element={<NoMatch />}></Route>
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
