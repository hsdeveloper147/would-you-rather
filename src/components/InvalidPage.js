import React, { Component } from "react";
import { Image } from "semantic-ui-react";
import error from "../images/error.png";

export default class InvalidPage extends Component {
  render() {
    return (
      <div style={{ textAlign: "center", color: "red" }}>
        <h1>ERROR 404</h1>
        <h2>Page does not exists!!</h2>
        <Image
          src={error}
          alt="error404"
          size="large"
          verticalAlign="middle"
          circular
        />
      </div>
    );
  }
}
