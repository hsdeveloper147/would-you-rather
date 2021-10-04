import React, { Component } from "react";
import { connect } from "react-redux";
import { Image, Grid } from "semantic-ui-react";

class Leader extends Component {
  render() {
    const { leader } = this.props;
    const userAvatar = leader.userAvatar;
    const userName = leader.userName;
    const userNumAnsweres = leader.userNumAnsweres;
    const userNumQuestions = leader.userNumQuestions;
    const score = leader.score;
    return (
      <Grid className="leader-board">
        <Grid.Row>
          <Grid.Column width={5}>
            <Image size="massive" className="board-pic" src={userAvatar} />
          </Grid.Column>
          <Grid.Column width={7} className="board">
            <Grid className="name-section">
              <Grid.Row>
                <Grid.Column>
                  <b>{userName}</b>
                </Grid.Column>
              </Grid.Row>
              <Grid.Row className="num-section">
                <Grid.Column width={14}>Answered Questions:</Grid.Column>
                <Grid.Column width={2}>{userNumAnsweres}</Grid.Column>
              </Grid.Row>
              <Grid.Row className="num-section">
                <Grid.Column width={14}>Created Questions</Grid.Column>
                <Grid.Column width={2}>{userNumQuestions}</Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
          <Grid.Column width={4} className="board">
            <Grid stretched>
              <Grid.Row>
                <Grid.Column className="score-text">Score</Grid.Column>
              </Grid.Row>
              <Grid.Row>
                <Grid.Column>
                  <div className="circle">
                    <div className="circle-inner">
                      <span className="big">{score}</span>
                    </div>
                  </div>
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

function mapStatesToProps({ users }, { id }) {
  return {
    user: users[id],
  };
}

export default connect(mapStatesToProps)(Leader);
