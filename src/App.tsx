import React from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Report from "./pages/Report";
import NoMatch from "./pages/NoMatch";
import Applayout from "./component/layout/Applayout";
import { theme } from "./theme/theme";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";

/**
 * App
 *
 * @returns Router
 */
function App() {
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
            <Route index element={<Home />}></Route>
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
