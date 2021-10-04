import React, { Component } from "react";
import { connect } from "react-redux";
import { formatLeaders } from "../utils/formatter";
import Leader from "./Leader";

class Leaderboard extends Component {
  render() {
    const { leaders, leaderIds } = this.props;
    return (
      <ul>
        {leaderIds.map((id) => (
          <li key={id}>
            <Leader leader={leaders[id]} />
          </li>
        ))}
      </ul>
    );
  }
}

function mapStatesToProps({ users }) {
  const leaders = formatLeaders(users);
  return {
    leaderIds: Object.keys(leaders).sort(
      (a, b) => leaders[b].score - leaders[a].score
    ),
    leaders,
  };
}

export default connect(mapStatesToProps)(Leaderboard);
