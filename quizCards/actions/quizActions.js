import * as api from '../utils/api';
import {
  RESET_QUIZ,
  START_QUIZ,
  SUBMIT_ANSWER,
} from './types';

export const resetQuiz = (deckId = null) => {
  return {
    type: RESET_QUIZ,
    payload: {
      deckId,
    },
  }
}

export const startQuiz = (deckId) => {
  return {
    type: START_QUIZ,
    payload: {
      deckId,
    },
  }
}

export const submitAnswer = ({deckId, isCorrect}) => {
  return {
    type: SUBMIT_ANSWER,
    payload: {
      deckId,
      isCorrect,
    },
  }
}
