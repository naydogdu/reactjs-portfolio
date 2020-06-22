import React from 'react';
import Skiplinks from "./components/Skiplinks";
import Header from "./components/Header";
import Content from "./components/Content";
import './App.css';

function App() {
  return (
    <div className="main">
      <Skiplinks />
      <Header />
      <Content />
    </div>
  )
}

export default App;
