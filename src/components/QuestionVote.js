import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Container, Label, Icon } from "semantic-ui-react";
import Question from "./Question";
import InvalidQuestion from "./InvalidQuestion";
import { Redirect } from "react-router-dom";

class QuestionVote extends Component {
  state = { toHome: false };
  toHome = () => {
    this.setState(() => ({
      toHome: true,
    }));
  };
  get_path = () => window.location.pathname;

  render() {
    const id = this.get_path().split("/")[2];

    let optionVotes;
    if (this.props.location && this.props.location.state) {
      optionVotes = this.props.location.state;
    } else {
      optionVotes = this.props.optionVotes;
    }

    const question = this.props.questions[id];
    if (this.state.toHome) {
      return <Redirect to="/dashboard" />;
    }
    if (question == null) {
      return <InvalidQuestion />;
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
        <Question id={id} optionVotes={optionVotes} display="false" />
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

function mapStateToProps({ questions }) {
  return {
    questions,
  };
}

export default connect(mapStateToProps)(QuestionVote);
