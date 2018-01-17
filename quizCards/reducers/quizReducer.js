import {
  RESET_QUIZ,
  START_QUIZ,
  SUBMIT_ANSWER,
} from '../actions/types';

const quiz = (state = {
  deckId: null,
  currentCard: 0,
  answers: [],
}, action) => {
  switch (action.type) {
    case RESET_QUIZ:
      return {
        deckId: action.payload.deckId,
        currentCard: 0,
        answers: [],
      }
    case START_QUIZ:
      return {
        ...state,
        deckId: action.payload.deckId,
      }
    case SUBMIT_ANSWER:
      return {
        ...state,
        currentCard: state.currentCard += 1,
        answers: [
          ...state.answers,
          action.payload.isCorrect,
        ],
      }
    default:
      return state;
  }
};

export default quiz;
