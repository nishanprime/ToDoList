import axios from "axios";
import React from "react";
import Consumer from "../contexts/ToDoContext";
export class Card extends React.Component {
  render() {
    console.log(this.props)
    return (
      <Consumer>
        {({ toDoList, dispatch }) => {
          console.log(toDoList);
          return toDoList.map((todo) => {
            return (
              <div class="card">
                <div class="card-body">
                  <h5
                    class={todo.complete ? "text-decoration-line-through" : ""}
                  >
                    {todo.title}
                  </h5>
                  <p>{todo.content}</p>
                  <button
                    class="btn btn-danger"
                    onClick={() => {
                      axios.delete(`/todos/${todo._id}`);
                      return dispatch({
                        type: "REMOVE",
                        payload: todo._id,
                      });
                    }}
                  >
                    Remove
                  </button>
                  <button
                    class="btn btn-primary"
                    onClick={() => {
                      return dispatch({
                        type: "TOGGLE",
                        payload: todo._id,
                      });
                    }}
                  >
                    {todo.complete ? "Revert Back" : "Completed"}
                  </button>
                </div>
                <div class="main"></div>
              </div>
            );
          });
        }}
      </Consumer>
    );
  }
}

export default Card;
