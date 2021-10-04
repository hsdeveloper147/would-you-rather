import React, { Component } from "react";
import { Card, Grid, Icon, Progress } from "semantic-ui-react";

export default class ResultBox extends Component {
  render() {
    const { text, numVotes, totalVotes, selected } = this.props;
    const percentVotes = ((numVotes / totalVotes) * 100).toFixed(2);
    return (
      <div>
        <Grid>
          <Grid.Row>
            <Grid.Column width={16} className="result-box-grid">
              {selected && (
                <Grid.Row className="your-vote">
                  <Grid.Column stretched>
                    <span>
                      <Icon name="user"></Icon>
                    </span>
                    Your Vote
                  </Grid.Column>
                </Grid.Row>
              )}

              <Card.Content>
                <Card.Description>Would you Rather {text} </Card.Description>
                <Progress
                  percent={percentVotes}
                  color="green"
                  inverted
                  progress
                />

                <Card.Description>
                  {numVotes} out of {totalVotes} votes
                </Card.Description>
              </Card.Content>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}
