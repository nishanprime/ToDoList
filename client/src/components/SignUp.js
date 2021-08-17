import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import Consumer from "../contexts/ToDoContext";
export class SignUp extends Component {
  state = {
    name: "",
    username: "",
    email: "",
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
                    const newUser = this.state;
                    console.log(newUser);

                    axios.post("/api/users", newUser).then((res) => {
                      localStorage.setItem(
                        "userInfo",
                        JSON.stringify(res.data)
                      );
                      return val.dispatch({
                        type: "REGISTER",
                        payload: res.data,
                      });
                    });
                  }}
                >
                  <div class="form-group">
                    <label for="exampleInputEmail1">Name</label>
                    <input
                      onChange={(e) => {
                        this.setState((prev) => {
                          return {
                            name: e.target.value,
                          };
                        });
                      }}
                      type="text"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div class="form-group">
                    <label for="exampleInputEmail1">Email address</label>
                    <input
                      onChange={(e) => {
                        this.setState((prev) => {
                          return {
                            email: e.target.value,
                          };
                        });
                      }}
                      type="email"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                    />
                  </div>
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
                      placeholder="Enter username"
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
                  <div class="form-group form-check">
                    <label class="form-check-label" for="exampleCheck1">
                      Check me out
                    </label>
                  </div>
                  <button type="submit" class="btn btn-primary">
                    Submit
                  </button>
                </form>
                <Link to="/login">Already have an account? Sign in here</Link>
              </div>
            );
          }}
        </Consumer>
      </div>
    );
  }
}

export default SignUp;
