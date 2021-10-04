import React, { Component } from "react";
import { connect } from "react-redux";
import ResultBox from "./ResultBox";

class Result extends Component {
  render() {
    const { answerVoted, quesAnsweredCount } = this.props;
    const optionOneText = quesAnsweredCount["optionOne"]["text"];
    const optionOneVotes = quesAnsweredCount["optionOne"]["optionOneCount"];
    const optionTwoText = quesAnsweredCount["optionTwo"]["text"];
    const optionTwoVotes = quesAnsweredCount["optionTwo"]["optionTwoCount"];
    const totalVotes = optionOneVotes + optionTwoVotes;

    let your_vote_1 = false;
    let your_vote_2 = false;
    if (answerVoted === "optionOne") {
      your_vote_1 = true;
    } else {
      your_vote_2 = true;
    }
    return (
      <div>
        <h2>Results:</h2>
        <ResultBox
          text={optionOneText}
          numVotes={optionOneVotes}
          totalVotes={totalVotes}
          selected={your_vote_1}
        />
        <ResultBox
          text={optionTwoText}
          numVotes={optionTwoVotes}
          totalVotes={totalVotes}
          selected={your_vote_2}
        />
      </div>
    );
  }
}

function mapStateToProps(
  { users, questions, authedUser },
  { id, answerVoted }
) {
  const question = questions[id];
  let quesAnsweredCount = {};
  quesAnsweredCount = {
    optionOne: {
      text: questions[id].optionOne.text,
      optionOneCount: 0,
    },
    optionTwo: {
      text: questions[id].optionTwo.text,
      optionTwoCount: 0,
    },
  };
  Object.keys(users).forEach((key) => {
    const user = users[key];
    Object.keys(user.answers).forEach((qid) => {
      const votedAnswer = user.answers[qid];
      if (qid === id) {
        if (votedAnswer === "optionOne") {
          quesAnsweredCount["optionOne"]["optionOneCount"]++;
        } else {
          quesAnsweredCount["optionTwo"]["optionTwoCount"]++;
        }
      }
    });
  });
  return {
    authedUser,
    question: question ? question : null,
    answerVoted,
    quesAnsweredCount,
  };
}

export default connect(mapStateToProps)(Result);
