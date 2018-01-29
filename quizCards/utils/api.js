import { AsyncStorage } from 'react-native';
import uuidv4 from 'uuid/v4';
import {initState} from './initialState'

const DECKS_STORAGE_KEY = 'QuizCards:decks';

setDeckState = (decks) => {
  return (decks) ? JSON.parse(decks) : initState
}

export function getDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(setDeckState)
}

export function getDeck(deckID) {
  return getDecks().then((decks) => decks[deckID])
}

export function saveDeck(deckTitle) {
  getDecks().then((decks) => {
    if(!decks[deckTitle]) {
      decks[deckTitle] = {
        title: deckTitle,
        questions: [],
      }
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks))
    }
  })
}

export function addCard(deckTitle, cardVal) {
  getDecks().then((decks) => {
    if(decks[deckTitle] && decks[deckTitle].questions) {
      decks[deckTitle]['questions'].push(cardVal)
    }
    AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(decks))
  })
}

export function clearStorage() {
  AsyncStorage.setItem(DECKS_STORAGE_KEY, '')
}