import * as api from '../utils/api';
import {
  ADD_DECK,
  GET_DECKS,
  ADD_CARD,
} from './types';

const addDeck = (deck) => {
  return {
    type: ADD_DECK,
    payload: {
      deck,
    },
  }
};

export const saveDeckTitle = (title) => (dispatch) => {
  return api
    .saveDeckTitle(title)
    .then((deck) => {
      dispatch(addDeck(deck));
      return Object.keys(deck)[0];
    });
};

const getDecks = (decks) => {
  return {
    type: GET_DECKS,
    payload: {
      decks,
    },
  }
}

export const fetchDecks = () => (dispatch) => {
  return api
    .getDecks()
    .then((data) => {
      const decks = data || {};
      dispatch(getDecks(decks))
    });
};

const addCard = (deckId, card) => {
  return {
    type: ADD_CARD,
    payload: {
      deckId,
      card,
    },
  }
}

export const saveCard = ({deckId, question, answer}) => (dispatch) => {
  return api
    .addCardToDeck({deckId, question, answer})
    .then((deck) => dispatch(addCard(deckId, {question, answer})));
}
