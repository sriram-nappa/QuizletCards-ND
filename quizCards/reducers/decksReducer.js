import {
  ADD_DECK,
  GET_DECKS,
  ADD_CARD,
} from '../actions/types';

const decks = (state = {}, action) => {
  switch (action.type) {
    case GET_DECKS:
      return {
        ...state,
        ...action.payload.decks,
      }
    case ADD_DECK:
      return {
        ...state,
        ...action.payload.deck,
      }
    case ADD_CARD:
      const questions = state[action.payload.deckId].questions || [];

      return {
        ...state,
        [action.payload.deckId]: {
          ...state[action.payload.deckId],
          questions: [
            ...questions,
            action.payload.card,
          ],
        }
      }
    default:
      return state;
  }
};

export default decks;
