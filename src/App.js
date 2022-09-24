import React from "react";
import './App.css';
import { Routes, Route } from "react-router-dom";
import Home from './pages/home/Home'
import Create from "./pages/create/Create";

const App =() =>{
  return(
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/create" element={<Create/>}/>
      <Route path="/edit/:id" element={<Create/>}/>
    </Routes>
  )
}
export default App