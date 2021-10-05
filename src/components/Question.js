import React, { Component } from "react";
import { connect } from "react-redux";
import Poll from "./QuestionPoll";
import { Card, Image, Grid } from "semantic-ui-react";
import Result from "./Result";

class Question extends Component {
  render() {
    const { authedUser, question, users, display, optionVotes } = this.props;

    const questionId = question.id;

    const quesAuthor = users[question.author];
    const quesAuthorAvatar = quesAuthor.avatarURL;
    const quesAuthorName = quesAuthor.name;
    const answeredQuestionIds = Object.keys(users[authedUser].answers);
    const answered = answeredQuestionIds.includes(questionId);

    let answerVoted = "";
    if (answered) {
      answerVoted = users[authedUser]["answers"][questionId];
    }

    return (
      <Card fluid>
        <Grid celled="internally">
          <Grid.Row color="red">
            <Grid.Column width={16}>
              {answered
                ? `Asked by ${quesAuthorName}`
                : `${quesAuthorName} asks:`}
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width={6} verticalAlign="middle">
              <Image size="medium" circular src={quesAuthorAvatar} />
            </Grid.Column>
            <Grid.Column width={10}>
              {answered ? (
                <Result id={questionId} answerVoted={answerVoted} />
              ) : (
                <Poll
                  id={questionId}
                  display={display}
                  optionVotes={optionVotes}
                />
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Card>
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

export default connect(mapStateToProps)(Question);
