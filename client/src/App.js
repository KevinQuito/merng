import React from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import { Container } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

import MenuBar from "./components/MenuBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// MenuBar will be on the page regardless of what page we're in, so we don't need to put an exact path
function App() {
  return (
    <Router>
      <Container>
        <MenuBar />
        <Routes exact path="/" component={Home} />
        <Routes exact path="/login" component={Login} />
        <Routes exact path="/register" component={Register} />
      </Container>
    </Router>
  );
}

export default App;
