import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Form, Radio, Button, Icon, Label, Card } from "semantic-ui-react";
import { handleAddAnsweredQuestion } from "../actions/shared";

class QuestionPoll extends Component {
  state = { val: "optionOne", toVote: false };
  handleChange = (e, { value }) => this.setState({ val: value });

  vote = (e) => {
    e.preventDefault();
    this.setState({ ...this.state, toVote: true });
  };

  submit = (e) => {
    this.props.dispatch(
      handleAddAnsweredQuestion(this.props.id, this.state.val)
    );
  };

  render() {
    const { question, display, id } = this.props;
    const { toVote } = this.state;

    const quesOptionOne = question.optionOne.text;
    const quesOptionTwo = question.optionTwo.text;

    if (toVote === true) {
      return (
        <Redirect
          to={{
            pathname: `/question/${id}`,
            state: {
              id: this.props.question.id,
              optionVotes: this.props.optionVotes,
            },
          }}
        />
      );
    }
    return (
      <div>
        {display === "true" ? (
          <Form>
            <Card fluid centered>
              <Card.Content>
                <Card.Header textAlign="center">Would you Rather</Card.Header>
                <Card.Description textAlign="center">
                  {quesOptionOne}
                </Card.Description>
                <Card.Description textAlign="center">OR</Card.Description>
                <Card.Description textAlign="center">
                  {quesOptionTwo}
                </Card.Description>
                <Card.Description textAlign="center">
                  <Button
                    as="div"
                    animated="vertical"
                    labelPosition="right"
                    color="red"
                    onClick={this.vote}
                    fluid
                  >
                    <Button icon color="red" fluid>
                      Vote
                    </Button>
                    <Label as="a" basic pointing="left" color="red">
                      <Icon name="hand victory" size="large" color="red" />
                    </Label>
                  </Button>
                </Card.Description>
              </Card.Content>
            </Card>
          </Form>
        ) : (
          <Form>
            <Card fluid centered>
              <Card.Content>
                <Card.Header textAlign="center">Would you Rather</Card.Header>
                <br />
                <Form.Field>
                  <Radio
                    label={quesOptionOne}
                    name="radioGroup"
                    disabled={display === "true"}
                    value="optionOne"
                    checked={this.state.val === "optionOne"}
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Form.Field>
                  <Radio
                    label={quesOptionTwo}
                    name="radioGroup"
                    disabled={display === "true"}
                    value="optionTwo"
                    checked={this.state.val === "optionTwo"}
                    onChange={this.handleChange}
                  />
                </Form.Field>
                <Button
                  as="div"
                  labelPosition="right"
                  color="red"
                  onClick={this.submit}
                  fluid
                >
                  <Button icon color="red" fluid>
                    Submit
                  </Button>
                  <Label as="a" basic pointing="left" color="red">
                    <Icon name="paper plane" color="red" />
                  </Label>
                </Button>
              </Card.Content>
            </Card>
          </Form>
        )}
      </div>
    );
  }
}
function mapStateToProps(
  { users, questions, authedUser },
  { id, display, optionVotes }
) {
  const question = questions[id];

  return {
    authedUser,
    question: question ? question : null,
    users,
    display,
    optionVotes,
  };
}

export default connect(mapStateToProps)(QuestionPoll);
