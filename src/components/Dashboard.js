import React, { Component } from "react";
import { connect } from "react-redux";
import Question from "./Question";
import { Card, Menu, Grid, Segment, Icon } from "semantic-ui-react";

class Dashboard extends Component {
  state = { activeItem: "unanswered question" };

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { questionIds, currentUser, quesAnsweredCount } = this.props;
    const { activeItem } = this.state;
    const answeredQuestionIds = Object.keys(currentUser.answers);
    const unansweredQuestionIds = questionIds.filter(function (id) {
      return !answeredQuestionIds.includes(id);
    });
    return (
      <div
        style={{
          margin: "auto",
          lineHeight: 2,
        }}
      >
        <Grid>
          <Grid.Column width={4}>
            <Segment inverted color="red">
              <Menu
                icon="labeled"
                fluid
                tabular
                stackable
                vertical
                pointing
                inverted
                color="red"
              >
                <Menu.Item
                  name="unanswered question"
                  active={activeItem === "unanswered question"}
                  onClick={this.handleItemClick}
                >
                  <Icon name="calendar" />
                  Unanswered Questions
                </Menu.Item>
                <Menu.Item
                  name="answered question"
                  active={activeItem === "answered question"}
                  onClick={this.handleItemClick}
                >
                  <Icon name="calendar check" />
                  Answered Question
                </Menu.Item>
              </Menu>
            </Segment>
          </Grid.Column>
          <Grid.Column stretched width={12} className="dashboard-grid">
            {/* <Segment> */}
            {activeItem === "unanswered question" &&
              (unansweredQuestionIds.length === 0 ? (
                <Card fluid className="len-zero-text">
                  All Questions Answered
                </Card>
              ) : (
                <ul>
                  {unansweredQuestionIds.map((id) => (
                    <li key={id}>
                      <Question
                        id={id}
                        display="true"
                        optionVotes={quesAnsweredCount}
                      />
                    </li>
                  ))}
                </ul>
              ))}
            {activeItem === "answered question" &&
              (answeredQuestionIds.length === 0 ? (
                <Card fluid className="len-zero-text">
                  No Questions Answered
                </Card>
              ) : (
                <ul>
                  {answeredQuestionIds.map((id) => (
                    <li key={id}>
                      <Question
                        id={id}
                        display="true"
                        optionVotes={quesAnsweredCount}
                      />
                    </li>
                  ))}
                </ul>
              ))}

            {/* </Segment> */}
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

function mapStatesToProps(
  { questions, users, authedUser },
  { quesAnsweredCount }
) {
  return {
    questionIds: Object.keys(questions).sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    ),

    currentUser: users[authedUser],
    users,
    questions,
    quesAnsweredCount,
  };
}

export default connect(mapStatesToProps)(Dashboard);
