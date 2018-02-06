import { ADD_CARD, ADD_DECK, LOAD_DECKS } from './types';

export const loadDecks = decks => ({type: LOAD_DECKS, decks})
export const addDeck = deckTitle => ({type: ADD_DECK, deckTitle})
export const addCard = (deckTitle, card) => ({type: ADD_CARD, deckTitle, card})