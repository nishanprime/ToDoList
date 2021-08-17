//https://jsonplaceholder.typicode.com/todos/1

import React from "react";
import axios from "axios";
const Context = React.createContext({});

const reducer = (prevState, action) => {
  switch (action.type) {
    case "TOGGLE":
      return {
        toDoList: prevState.toDoList.map((todo) => {
          if (todo._id === action.payload) {
            console.log("I am in");
            todo.complete = !todo.complete;
          }
          console.log(todo);
          return todo;
        }),
      };
    case "REMOVE":
      return {
        toDoList: prevState.toDoList.filter((todo) => {
          return todo._id !== action.payload;
        }),
      };
    case "ADD":
      return {
        toDoList: [...prevState.toDoList, action.payload],
      };
    case "LOGIN":
      return {
        ...prevState,
        currentUserAuthToken: action.payload.token,
        currentUserId: action.payload._id,
        currentUserToDoListID: action.payload.todoListId,
        name: action.payload.name,
        username: action.payload.username,
        email: action.payload.email,
      };
    case "REGISTER":
      console.log(action.payload);
      return {
        ...prevState,
        currentUserAuthToken: action.payload.token,
        currentUserId: action.payload._id,
        name: action.payload.name,
        username: action.payload.username,
        email: action.payload.email,
      };
    default:
      return prevState;
  }
};

export class ToDoStore extends React.Component {
  state = {
    toDoList: [],
    dispatch: (action) =>
      this.setState((prevState) => {
        return reducer(prevState, action);
      }),
  };
  componentWillMount() {
    const userInfo = localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : [];
   console.log(userInfo)
      this.setState((prev) => {
        return {
          // currentUserToDoListID: userInfo.todoListId,
          // currentUserAuthToken: userInfo.token,
          // name: userInfo.name,
          // email: userInfo.email,
          // username: userInfo.username,
          // currentUserId: userInfo._id,
          userInfo
        };
      });
    
    console.log(this.state)
    axios.get("/todos").then((res) => {
      this.setState({
        toDoList: res.data,
      });
    });
  }
  render() {
    return (
      <Context.Provider
        value={{
          ...this.state,
        }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export default Context.Consumer;
