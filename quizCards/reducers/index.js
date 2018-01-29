import {LOAD_DECKS, ADD_DECK, ADD_CARD} from '../actions/types'

function quizReducer(state = {}, action) {
  switch (action.type) {
    case LOAD_DECKS:
      {
        return {
          ...state,
          ...action.decks
        }
        break;
      }

    case ADD_DECK:
      {
        const deckObj = {
          ...state,
          [action.deckTitle]: {
            title: action.deckTitle,
            questions: []
          }
        }
        return deckObj
        break;
      }

    case ADD_CARD:
      {
        const cardObj = {
          ...state
        }
        if (cardObj[action.deckTitle]) {
          const {question, answer} = action.card
          cardObj[action.deckTitle].questions.push({question, answer})
        }
        return cardObj
        break;
      }

    default:
      {
        console.log('ACtion', action)
        return state
      }
  }
}

export default quizReducer
