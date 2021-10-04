export const RECEIVE_USERS = "RECEIVE_USERS";
export const ADD_ANSWERED_QUESTION = "ADD_ANSWERED_QUESTION";
export const ADD_NEW_QUESTION = "ADD_NEW_QUESTION";

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function addAnsweredQuestion({ authedUser, qid, answer }) {
  return {
    type: ADD_ANSWERED_QUESTION,
    authedUser,
    questionId: qid,
    answer,
  };
}

export function addNewQuestion(authedUser, newId) {
  return {
    type: ADD_NEW_QUESTION,
    authedUser,
    newId,
  };
}
