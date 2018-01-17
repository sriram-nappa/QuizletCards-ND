import {
  ADD_DECK,
  GET_DECKS,
} from '../actions/types';

const decksIds = (state = [], action) => {
  switch (action.type) {
    case GET_DECKS:
      return Object.keys(action.payload.decks);
    case ADD_DECK:
      return [
        ...state,
        Object.keys(action.payload.deck)[0],
      ];
    default:
      return state;
  }
};

export default decksIds;
