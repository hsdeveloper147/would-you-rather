export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const APPEND_QUESTION_TAKER = "APPEND_QUESTION_TAKER";
export const ADD_QUESTION = "ADD_QUESTION";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

export function appendQuestionTaker({ authedUser, qid, answer }) {
  return {
    type: APPEND_QUESTION_TAKER,
    authedUser,
    questionId: qid,
    answer,
  };
}

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}
