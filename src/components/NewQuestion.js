import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Container, Form, Button, Label, Icon } from "semantic-ui-react";
import { handleAddQuestion } from "../actions/shared";

class NewQuestion extends Component {
  state = {
    optionOneText: "",
    optionTwoText: "",
    toHome: false,
  };
  handleOptionOneText = (e) => {
    const optionOneText = e.target.value;

    this.setState(() => ({
      optionOneText,
    }));
  };
  handleOptionTwoText = (e) => {
    const optionTwoText = e.target.value;

    this.setState(() => ({
      optionTwoText,
    }));
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const question = {
      optionOneText: this.state.optionOneText,
      optionTwoText: this.state.optionTwoText,
      author: this.props.authedUser,
    };
    this.props.dispatch(handleAddQuestion(question));
    this.setState({ toHome: true });
  };
  render() {
    const { toHome, optionOneText, optionTwoText } = this.state;
    if (toHome === true) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <Container className="new-ques-block">
        <h1>Create New Question</h1>
        <h2>Complete the question</h2>
        <h3>Would you rather...</h3>
        <Form inverted size="large">
          <Form.Field>
            <input
              placeholder="Option One"
              value={optionOneText}
              onChange={this.handleOptionOneText}
            />
          </Form.Field>
          <div style={{ margin: "20px" }}>OR</div>
          <Form.Field>
            <input
              placeholder="Option Two"
              value={optionTwoText}
              onChange={this.handleOptionTwoText}
            />
          </Form.Field>
          <Button
            as="div"
            labelPosition="right"
            color="yellow"
            onClick={this.handleSubmit}
            fluid
            disabled={optionOneText === "" || optionTwoText === ""}
          >
            <Button
              icon
              color="black"
              fluid
              disabled={optionOneText === "" || optionTwoText === ""}
            >
              Add Question
            </Button>
            <Label as="a" basic pointing="left" color="black">
              <Icon name="add" color="red" />
            </Label>
          </Button>
        </Form>
      </Container>
    );
  }
}

function mapStateToProps({ users, questions, authedUser }) {
  return {
    authedUser,
    users,
  };
}

export default connect(mapStateToProps)(NewQuestion);
