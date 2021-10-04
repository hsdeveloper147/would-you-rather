import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Button, Container, Label, Icon } from "semantic-ui-react";
import Question from "./Question";

class QuestionVote extends Component {
  state = { toHome: false };
  toHome = () => {
    this.setState(() => ({
      toHome: true,
    }));
  };
  render() {
    if (this.state.toHome) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <Container
        text
        style={{
          margin: "7em auto",
          lineHeight: 2,
          textAlign: "center",
        }}
      >
        <Question
          id={this.props.location.state.id}
          optionVotes={this.props.location.state.optionVotes}
          display="false"
        />
        <Button
          as="div"
          animated="vertical"
          labelPosition="right"
          color="red"
          onClick={this.toHome}
          fluid
        >
          <Button icon color="red" fluid>
            Back
          </Button>
          <Label as="a" basic pointing="left" color="red">
            <Icon name="arrow left" size="large" color="red" />
          </Label>
        </Button>
      </Container>
    );
  }
}

export default connect()(QuestionVote);
