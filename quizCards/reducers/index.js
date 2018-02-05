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
          ...state
        }
        deckObj.decks[action.deckTitle] = {
          title: action.deckTitle,
          questions: []
        }
        return deckObj
        break;
      }

    case ADD_CARD:
      {
        const cardObj = {
          ...state
        }
        console.log("In Action", action.card)
        if (cardObj.decks[action.deckTitle]) {
          const {cardQuestion, cardAnswer} = action.card
          cardObj.decks[action.deckTitle].questions.push({
            answer: cardAnswer, 
            question: cardQuestion
          })
        }
        return cardObj
        break;
      }

    default:
      {
        return state
      }
  }
}

export default quizReducer
