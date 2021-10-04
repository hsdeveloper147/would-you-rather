import {
  APPEND_QUESTION_TAKER,
  RECEIVE_QUESTIONS,
  ADD_QUESTION,
} from "../actions/questions";

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case APPEND_QUESTION_TAKER:
      return {
        ...state,
        [action.questionId]: {
          ...state[action.questionId],
          [action.answer]: {
            ...state[action.questionId][action.answer],
            votes: state[action.questionId][action.answer].votes.concat([
              action.authedUser,
            ]),
          },
        },
      };
    case ADD_QUESTION:
      const { question } = action;
      return {
        ...state,
        [question.id]: question,
      };
    default:
      return state;
  }
}
