import React, { Component } from "react";
import { Link } from "react-router-dom";

export class Header extends Component {
  render() {
    return <div style={{ backgroundColor: "red" }}>
        <Link to="/login">
            Login
        </Link>
        <br></br>
        <Link to="/mytodos/username">
            Card
        </Link>
    </div>;
  }
}

export default Header;
