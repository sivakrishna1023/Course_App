import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Login from "../Components/Login";
import Navbar from "../Components/Navbar";
import Register from "../Components/Register";
import Courses from "../Components/Courses";
import Allcourses from "../Components/Allcourses";
import Mycourses from "../Components/Mycourses";
import Createnew from "../Components/Createnew";
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <>
      <RecoilRoot>
      <Navbar></Navbar>
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/all" element={<Allcourses/>} />
          <Route path="/mycourses" element={<Mycourses/>} />
          <Route path="/newcourse" element={<Createnew/>} />
        </Routes>
      </Router>
      </RecoilRoot>
    </>
  )
}

export default App
