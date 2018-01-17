import { combineReducers } from 'redux';
import decks from './decksReducer';
import decksIds from './decksIdsReducer';
import quiz from './quizReducer';

const mainReducer = combineReducers({
  decks,
  decksIds,
  quiz,
});

export default mainReducer;
