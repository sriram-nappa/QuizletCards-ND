import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native'
import {connect} from 'react-redux'
import {white, black, lightPurp} from '../styles/colors'
import Deck from './Deck'

class DeckDetails extends Component {
  static navigationOptions = ({navigation}) => {
    const {title} = navigation.state.params
    return {title: title}
  }

  render() {
    const {deck, goToAddCard, goToStartQuiz} = this.props
    return (
      <View style={styles.container}>
        <Deck id={deck.title} title={deck.title} questions={deck.questions}/>
        <TouchableOpacity style={[styles.btn, styles.addCardBtn]} onPress={() => goToAddCard(deck.title)}>
          <Text style={[styles.btnText, styles.addCardBtnText]}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, styles.startQuizBtn]} onPress={() => goToStartQuiz(deck.title)}>
          <Text style={[styles.btnText, styles.startQuizBtnText]}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 15
  },
  btn: {
    padding: 10,
    width: 295,
    height: 45,
    marginHorizontal: 25,
    marginVertical: 10,
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        borderRadius: 7
      },
      android: {
        paddingLeft: 30,
        paddingRight: 30,
        borderRadius: 2
      }
    })
  },
  addCardBtn: {
    backgroundColor: white,
    borderWidth: 2,
    borderColor: lightPurp
  },
  addCardBtnText: {
    color: black
  },
  startQuizBtn: {
    backgroundColor: white,
    borderWidth: 2,
    borderColor: lightPurp
  },
  startQuizBtnText: {
    color: black
  },
  btnText: {
    color: white,
    fontSize: 22,
    textAlign: 'center'
  }
})

function mapStateToProps(decks, {navigation}) {
  const {deck, title} = navigation.state.params
  return {
    deck: deck || {},
    decks: decks
  }
}

function mapDispatchToProps(dispatch, {navigation}) {
  const {deckTitle} = navigation.state.params

  return {
    goBack: () => navigation.goBack(),
    goToAddCard: (deckTitle) => navigation.navigate('AddCard', {deckTitle: deckTitle}),
    goToStartQuiz: (deckTitle) => navigation.navigate('Quiz', {deckTitle: deckTitle})
  }

}
export default connect(mapStateToProps, mapDispatchToProps)(DeckDetails)
