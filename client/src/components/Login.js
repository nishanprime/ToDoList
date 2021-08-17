import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Consumer from "../contexts/ToDoContext";
export class Login extends Component {
  state = {
    username: "",
    password: "",
  };

  render() {
    return (
      <div>
        <Consumer>
          {(val) => {
            return (
              <div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (
                      this.state.username.length === 0 ||
                      this.state.password.length === 0
                    ) {
                      console.log(
                        "Error: There should be username and password"
                      );
                    } else {
                      const newUser = this.state;
                      axios
                        .post("/api/users/login", newUser, {})
                        .then((res) => {
                          localStorage.setItem("userInfo",JSON.stringify(res.data))
                          return val.dispatch({
                            type: "LOGIN",
                            payload: res.data,
                          });
                        });
                    }
                  }}
                >
                  <div class="form-group">
                    <label for="exampleInputEmail1">Username</label>
                    <input
                      onChange={(e) => {
                        this.setState((prev) => {
                          return {
                            username: e.target.value,
                          };
                        });
                      }}
                      type="text"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter your username"
                    />
                  </div>
                  <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input
                      onChange={(e) => {
                        this.setState((prev) => {
                          return {
                            password: e.target.value,
                          };
                        });
                      }}
                      type="password"
                      class="form-control"
                      id="exampleInputPassword1"
                      placeholder="Password"
                    />
                  </div>
                  <button type="submit" class="btn btn-primary">
                    Submit
                  </button>
                </form>
                <Link to="/">Don't have an account? Create one</Link>
              </div>
            );
          }}
        </Consumer>
      </div>
    );
  }
}

export default Login;
