import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { observer, inject } from 'mobx-react';
import TextButton from './TextButton';
import {setLocalNotification} from '../utils/notification';

class Quiz extends Component {
    static navigationOptions = ({navigation}) => {
        return {title: 'Quiz'}
    }

    constructor(props) {
        super(props)
        this.state = {
            cardIndex: 0,
            totalCorrect: 0,
            totalIncorrect: 0,
            showQuestion: true,
            quizCompletion: false
        }
    }

    findCorrectAnswer() {
        const {decks, deck, deckTitle} = this.props
        const {totalCurrent, currentCard, cardIndex} = this.state

        (currentCard + 1 === decks[deckTitle].questions.length) ?
            this.setState({
                totalCorrect: totalCorrect+1,
                quizCompletion: true
            }) :
            this.setState({
                totalCorrect: totalCurrent+1,
                cardIndex: cardIndex+1,
                showQuestion: true
            })
    }

    findIncorrectAnswer() {
        const {decks, deck, deckTitle} = this.props
        const {totalCurrent, currentCard, cardIndex} = this.state

        (currentCard + 1 === decks[deckTitle].questions.length) ?
            this.setState({
                totalCorrect: totalCorrect+1,
                quizCompletion: true
            }) :
            this.setState({
                totalCorrect: totalCurrent+1,
                cardIndex: cardIndex+1,
                showQuestion: true
            })
    }

}

function mapStateToProps(decks, {navigation}) {
    const {deckTitle} = navigation.state.params
    return {
        decks: decks.decks,
        deck: decks.decks[deckTitle] || {},
        deckTitle: deckTitle
    }
  }
  
function mapDispatchToProps(dispatch, {navigation}) {
    return {
      goBackToDeck: () => navigation.goBack()
    }  
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)
  