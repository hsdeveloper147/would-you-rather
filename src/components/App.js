import React, { Component, Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import LoadingBar from "react-redux-loading";
import { handleInitialData } from "../actions/shared";
import Nav from "../components/Nav";
import Dashboard from "./Dashboard";
import NewQuestion from "./NewQuestion";
import Leaderboard from "./Leaderboard";
import Login from "./Login";
import { Container } from "semantic-ui-react";
import RequireLogin from "./RequireLogin";
import QuestionVote from "./QuestionVote";
import InvalidPage from "./InvalidPage";

class App extends Component {
  state = { quesAnsweredCount: {} };

  componentDidMount() {
    const { dispatch, loggedIn } = this.props;
    if (loggedIn !== true) {
      dispatch(handleInitialData());
    } else {
      const { questions, users } = this.props;

      let quesAnsweredCount = {};
      Object.keys(questions).forEach((questionId) => {
        if (!(questionId in quesAnsweredCount)) {
          quesAnsweredCount[questionId] = {
            optionOne: {
              text: questions[questionId].optionOne.text,
              optionOneCount: 0,
            },
            optionTwo: {
              text: questions[questionId].optionTwo.text,
              optionTwoCount: 0,
            },
          };
        }
        Object.keys(users).forEach((key) => {
          const user = users[key];
          Object.keys(user.answers).forEach((qid) => {
            const votedAnswer = user.answers[qid];
            if (qid === questionId) {
              if (votedAnswer === "optionOne") {
                quesAnsweredCount[qid]["optionOne"]["optionOneCount"]++;
              } else {
                quesAnsweredCount[qid]["optionTwo"]["optionTwoCount"]++;
              }
            }
          });
        });
      });
      this.setState({ quesAnsweredCount });
    }
  }

  render() {
    const { loggedIn, loading } = this.props;
    const margin = loggedIn ? "7em" : "0em";

    return (
      <Fragment>
        {loading === true ? (
          <LoadingBar style={{ backgroundColor: "red", height: "5px" }} />
        ) : (
          <div>
            {loggedIn && <Nav />}
            <Container text style={{ marginTop: `${margin}` }}>
              <Switch>
                <RequireLogin path="/dashboard" loggedIn={loggedIn}>
                  <Dashboard quesAnsweredCount={this.state.quesAnsweredCount} />
                </RequireLogin>
                <RequireLogin path="/add" loggedIn={loggedIn}>
                  <NewQuestion />
                </RequireLogin>
                <RequireLogin path="/leaderboard" loggedIn={loggedIn}>
                  <Leaderboard />
                </RequireLogin>
                <RequireLogin path="/question/:id" loggedIn={loggedIn}>
                  <QuestionVote
                    display="false"
                    optionVotes={this.state.quesAnsweredCount}
                  />
                </RequireLogin>
                <Route exact path="/">
                  {loggedIn ? (
                    <Dashboard
                      quesAnsweredCount={this.state.quesAnsweredCount}
                    />
                  ) : (
                    <Login />
                  )}
                </Route>
                <RequireLogin path="*" loggedIn={loggedIn}>
                  <InvalidPage />
                </RequireLogin>
              </Switch>
            </Container>
          </div>
        )}
      </Fragment>
    );
  }
}

function mapStateToProps({ authedUser, users }) {
  return {
    loading: Object.keys(users).length === 0,
    loggedIn: authedUser !== null && authedUser !== undefined,
  };
}

export default connect(mapStateToProps)(App);
