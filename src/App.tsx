import React from "react";
import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Report from "./pages/Report";
import NoMatch from "./pages/NoMatch";
import Applayout from "./component/layout/Applayout";

function App() {
  return (
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
  );
}

export default App;
