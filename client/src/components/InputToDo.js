import axios from "axios";
import React, { Component } from "react";
import Consumer from "../contexts/ToDoContext";
import Card from "./Card";
export default class InputToDo extends Component {
  state = {
    title: "",
    content: "",
    createNow: false,
    toDoListId: "",
    userToken: "",
  };
  update = (e) => {
    this.setState({
      title: e.target,
    });
  };
  render() {
    const username=(this.props.match.params.username)
    return (
      <Consumer>
        {(val) => {
          const { dispatch } = val;
          return (
            <div>
              <Card username={username}/>
              <div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    this.setState((prev) => {
                      return {
                        createNow: true,
                        toDoListId: val.currentUserToDoListID,
                        userToken: val.currentUserAuthToken,
                      };
                    });
                    const todoList = this.state;
                    axios.post("/api/users/mytodos", todoList).then((res) => {
                      return dispatch({
                        type: "ADD",
                        payload: res.data,
                      });
                    });
                    
                  }}
                >
                  <div class="form-group">
                    <label for="exampleFormControlInput1">Title</label>
                    <input
                      type="text"
                      class="form-control"
                      id="exampleFormControlInput1"
                      placeholder="Enter your title"
                      onChange={(e) => {
                        this.setState((prev) => {
                          return {
                            title: e.target.value,
                          };
                        });
                      }}
                    />
                  </div>
                  <div class="form-group">
                    <label for="exampleFormControlTextarea1">Content</label>
                    <textarea
                      class="form-control"
                      id="exampleFormControlTextarea1"
                      rows="3"
                      placeholder="Enter description"
                      onChange={(e) => {
                        this.setState((prev) => {
                          return {
                            content: e.target.value,
                          };
                        });
                      }}
                      value={this.state.content}
                    ></textarea>
                  </div>
                  <button type="submit">Add ToDo</button>
                </form>
              </div>
              <div class="one">
                <div class="px-3 pb-4">
                  <div>
                    
                  </div>
                  <div>
                    
                  </div>
                  <div>
                    <h4 class="project">Add new</h4>
                  </div>
                  <div>
                    <p class="quote">
                      Still not enough? Click on a tile to add a new project.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}
