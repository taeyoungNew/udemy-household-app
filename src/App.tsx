import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Report from './pages/Report'
import NoMatch from './pages/NoMatch';
import Applayout from './component/layout/Applayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Applayout />}>
          {/* 자식 Route가 index요소를 가지면 부모가 호출되었을 떄 그 자식도 호출된다. */}
          <Route index element={<Home />}></Route>  
          <Route path='/report' element={<Report />}></Route>
          <Route path='*' element={<NoMatch />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
