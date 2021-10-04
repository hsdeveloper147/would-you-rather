import { getInitialData, saveQuestion, saveQuestionAnswer } from "../utils/api";
import {
  addAnsweredQuestion,
  addNewQuestion,
  receiveUsers,
} from "../actions/users";
import {
  appendQuestionTaker,
  receiveQuestions,
  addQuestion,
} from "../actions/questions";
import { showLoading, hideLoading } from "react-redux-loading";

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData().then(({ users, questions }) => {
      dispatch(hideLoading());
      dispatch(receiveUsers(users));
      dispatch(receiveQuestions(questions));
    });
  };
}
export function handleAddAnsweredQuestion(qid, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    dispatch(showLoading());
    const info = {
      authedUser,
      qid,
      answer,
    };
    return saveQuestionAnswer(info)
      .then(() => dispatch(addAnsweredQuestion(info)))
      .then(() => dispatch(appendQuestionTaker(info)))
      .then(() => dispatch(hideLoading()));
  };
}
export function handleAddQuestion(question) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    dispatch(showLoading());

    return saveQuestion(question)
      .then((formattedQuestion) => dispatch(addQuestion(formattedQuestion)))
      .then((formattedQuestion) =>
        dispatch(addNewQuestion(authedUser, formattedQuestion.id))
      )
      .then(() => dispatch(hideLoading()));
  };
}
