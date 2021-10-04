import React, { Component } from "react";
import { connect } from "react-redux";
import { Menu, Icon, Container, Image } from "semantic-ui-react";
import { NavLink } from "react-router-dom";
import { resetAuthedUser } from "../actions/authedUser";

class Nav extends Component {
  state = { activeItem: "" };

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
    if (name === "logout") {
      this.props.dispatch(resetAuthedUser());
    }
  };

  render() {
    const { activeItem } = this.state;
    const { name, avatarUrl } = this.props;
    return (
      <Menu tabular stackable pointing inverted color="red" fixed="top">
        <Container>
          <Menu.Item
            name="home"
            as={NavLink}
            to="/dashboard"
            active={activeItem === "home"}
            onClick={this.handleItemClick}
          >
            <Icon name="home"></Icon>
            <span>Home</span>
          </Menu.Item>
          <Menu.Item
            name="new_question"
            as={NavLink}
            to="/add"
            color={"blue"}
            active={activeItem === "new_question"}
            onClick={this.handleItemClick}
          >
            <Icon name="question"></Icon>
            <span>New Question</span>
          </Menu.Item>
          <Menu.Item
            name="leaderboard"
            as={NavLink}
            to="/leaderboard"
            color={"purple"}
            onClick={this.handleItemClick}
          >
            <Icon name="winner"></Icon>
            <span>Leaderboard</span>
          </Menu.Item>
          <Menu.Item
            name="user"
            position="right"
            width={10}
            color="yellow"
            active={activeItem === "user"}
            onClick={this.handleItemClick}
          >
            <span>Hello, {name}</span>

            <Image
              size="mini"
              circular
              color="white"
              centered
              src={avatarUrl}
              // className="nav-avatar"
            />
          </Menu.Item>
          <Menu.Item
            position="right"
            name="logout"
            color={"orange"}
            active={activeItem === "logout"}
            onClick={this.handleItemClick}
          >
            <Icon name="log out"></Icon>
            <span>Logout</span>
          </Menu.Item>
        </Container>
      </Menu>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  let current = users[authedUser];
  let avatarUrl = "";
  let name = "";
  if (current !== undefined) {
    avatarUrl = current.avatarURL;
    name = current.name;
  }
  return {
    name,
    avatarUrl,
  };
}

export default connect(mapStateToProps)(Nav);
