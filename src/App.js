import React from "react";
import "./assets/style/style.css";
import {useNavigate, Routes, Route} from 'react-router-dom';

import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Test from "./pages/TestComponent";
import Header from "./components/Header";

function App() {
  // const navigate = useNavigate();

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/test" element={<Test/>}/>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
