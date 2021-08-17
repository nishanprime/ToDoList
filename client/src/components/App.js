import React, { Component } from "react";
import { ToDoStore } from "../contexts/ToDoContext";
import InputToDo from "./InputToDo";
import Login from "./Login";
import SignUp from "./SignUp";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./Header";
export class App extends Component {
  render() {
    return (
      <ToDoStore>
        <Router>
          <Header/>
          <div>
            <Route path="/" exact component={SignUp} />
            <Route path="/login" exact component={Login} />
            <Route path="/mytodos/:username" exact component={InputToDo} />
          </div>
          {/* <SignUp />
        <h1>------</h1>
        <Login />
        <h1>------</h1>

        <InputToDo />
        <h1>------</h1>

        <Card /> */}
        </Router>
      </ToDoStore>
    );
  }
}

export default App;
