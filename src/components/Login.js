import React, { Component } from "react";
import { connect } from "react-redux";
import LoadingBar from "react-redux-loading";
import { Card, Image, Dropdown, Container } from "semantic-ui-react";
import gamePic from "../images/game_pic.jpeg";
import { dropdownUsersList } from "../utils/formatter";
import { setAuthedUser } from "../actions/authedUser";
import { withRouter } from "react-router-dom";

class Login extends Component {
  state = { userList: [] };

  componentDidMount() {
    const { users } = this.props;

    const userOptions = dropdownUsersList(users);
    this.setState({ userList: userOptions });
  }
  render() {
    const { userList } = this.state;
    return (
      <Container>
        <div
          style={{
            position: "relative",
            top: "0px",
            margin: "0px",
            height: "100vh",
          }}
        >
          <LoadingBar />
          <div
            style={{
              width: "40%",
              margin: "auto",
              textAlign: "center",
              color: "#f00",
            }}
          >
            <Card fluid raised color={"red"}>
              <Image src={gamePic} ui={false} />
              <Card.Content>
                <Card.Header>Welcome to Would you Rather App</Card.Header>
                <Card.Description>Please Login to continue</Card.Description>

                <Card.Header>Sign In</Card.Header>
              </Card.Content>
              <Card.Content extra>
                <Dropdown
                  placeholder="Select User"
                  fluid
                  selection
                  options={userList}
                  onChange={(e, data) => {
                    this.props.dispatch(setAuthedUser(data.value));
                    // this.props.history.push("/dashboard");
                  }}
                />
              </Card.Content>
            </Card>
          </div>
        </div>
        <div
          style={{
            textAlign: "center",
            bottom: "30px",
            height: "35px",
            margin: "20px",
          }}
        >
          Icons made by
          <a
            href="https://www.flaticon.com/authors/smashicons"
            title="Smashicons"
          >
            Smashicons
          </a>{" "}
          from{" "}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </div>
      </Container>
    );
  }
}

function mapStateToProps({ users }) {
  return {
    users,
  };
}

export default withRouter(connect(mapStateToProps)(Login));
