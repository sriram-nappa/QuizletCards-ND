import React, { Component } from 'react';
import { StyleSheet, View, Text, Platform, TouchableOpacity } from 'react-native';
import FormWidget from '../components/FormWidget';
import {connect} from 'react-redux';
import {setLocalNotification} from '../utils/notification';
import {black, gray, lightPurp, white} from '../styles/colors';

class Quiz extends Component {
    static navigationOptions = ({navigation}) => {
        return {title: 'Quiz'}
    }

    constructor(props) {
        super(props)
        this.state = {
            cardIndex: 0,
            totalCorrectAns: 0,
            totalIncorrectAns: 0,
            showQuestion: true,
            quizCompletion: false
        }
        this.findCorrectAnswer = this.findCorrectAnswer.bind(this)
        this.findIncorrectAnswer = this.findIncorrectAnswer.bind(this)
        this.resetQuiz = this.resetQuiz.bind(this)
        this.flipCard = this.flipCard.bind(this)
    }

    findCorrectAnswer() {
        const {decks, deck, deckTitle} = this.props
        const {totalCorrectAns, cardIndex} = this.state
        let stateObj = {}
        stateObj = (cardIndex + 1 === decks[deckTitle].questions.length) ?
            {
                totalCorrectAns: totalCorrectAns+1,
                quizCompletion: true
            } :
            {
                totalCorrectAns: totalCorrectAns+1,
                cardIndex: cardIndex+1,
                showQuestion: true
            }
        this.setState(stateObj)
    }

    findIncorrectAnswer() {
        const {decks, deck, deckTitle} = this.props
        const {totalIncorrectAns, cardIndex} = this.state
        let stateObj = {}
        stateObj = (cardIndex + 1 === decks[deckTitle].questions.length) ?
            {
                totalIncorrectAns: totalIncorrectAns+1,
                quizCompletion: true
            } :
            {
                totalIncorrectAns: totalIncorrectAns+1,
                cardIndex: cardIndex+1,
                showQuestion: true
            }
        this.setState(stateObj)
    }

    resetQuiz() {
        this.setState({
            cardIndex: 0,
            totalCorrectAns: 0,
            totalIncorrectAns: 0,
            showQuestion: true,
            quizCompletion: false
        });
    }

    flipCard() {
        const {showQuestion} = this.state
        this.setState(state => ({ showQuestion: !showQuestion }));
    }

    render() {
        const {decks, deck, goBackToDeck, deckTitle} = this.props
        const {cardIndex, quizCompletion, totalCorrectAns, totalIncorrectAns, showQuestion} = this.state
        const { question, answer } = deck.questions[cardIndex]
        console.log("QUIZ VIEW HERE", decks, " ------- ", deck, " ------------ ", showQuestion)
        const totalQuestionLen = decks[deckTitle].questions.length

        let viewContainer = (quizCompletion) ?
            (
                <View style={styles.cardContainer}>
                    <Text style={styles.title}>Quiz finished</Text>
                    <Text style={styles.subTitle}>Correct answers: {totalCorrectAns}</Text>
                    <Text style={styles.subTitle}>Incorrect answers: {totalIncorrectAns}</Text>
                </View>
            ) :
            (
                <View style={styles.cardContainer}>
                    <View style={styles.titleWrapper}>
                        <Text style={styles.title}>{showQuestion ? question : answer}</Text>
                    </View>
                    <TouchableOpacity style={[styles.answerBtn]} onPress={this.flipCard}>
                        <Text style={styles.txtStyle}>{showQuestion ? 'Answer' : 'Question'}</Text>
                    </TouchableOpacity>
                </View>
            )
        
            return (
                <View style={styles.container}>
                    <View style={styles.topContainer}>
                        <Text> {cardIndex + 1} / {totalQuestionLen} </Text>
                    </View>
                    {viewContainer}
                    {
                        (quizCompletion) ? 
                            (
                                <View style={styles.buttonsContainer}>
                                    <FormWidget onSubmit={this.resetQuiz} onCancel={goBackToDeck} submitBtnText={'Restart Quiz'} cancelBtnText={'Cancel'}/>
                                    
                                    {/* <TextButton style={[styles.button, styles.buttonGreen]} onPress={this.resetQuiz}>
                                        Restart quiz
                                    </TextButton>
                                    <TextButton
                                        style={[styles.button, styles.buttonRed]}
                                        onPress={() => this.props.goBackToDeck()}
                                    >
                                        Back
                                    </TextButton> */}
                                </View>
                            ) :
                            (
                                <View style={styles.buttonsContainer}>
                                    <FormWidget onSubmit={this.findCorrectAnswer} onCancel={this.findIncorrectAnswer} submitBtnText={'Correct'} cancelBtnText={'Incorrect'}/>

                                    {/* <TextButton style={[styles.button, styles.buttonGreen]} onPress={this.findCorrectAnswer}>
                                        Correct
                                    </TextButton>
                                    <TextButton style={[styles.button, styles.buttonRed]} onPress={this.findIncorrectAnswer}>
                                        Incorrect
                                    </TextButton> */}
                                </View>
                            )
                    }
                </View>
            )
        
    }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    topContainer: {
      flex: 1,
      margin: 10,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    cardContainer: {
      flex: 1,
      justifyContent: 'center',
    },
    buttonsContainer: {
      flex: 4,
      justifyContent: 'center',
      alignItems: 'center',
    },
    titleWrapper: {
        width: 200,
        flexGrow: 1,
        flex: 1,
    },
    title: {
      flex: 1,
      flexWrap: 'wrap',
      fontSize: 30,
      textAlign: 'center',
    },
    subTitle: {
      fontSize: 30,
      textAlign: 'center',
    },
    button: {
      fontSize: 25,
      width: 200,
      padding: 15,
      borderRadius: 6,
      borderWidth: 0.5,
    },
    txtStyle: {
      fontSize: 22,
      textAlign: 'center',
      color: white   
    },
    answerBtn: {
        flex: 1,
        backgroundColor: black,
        padding: 10,
        height: 25,
        marginHorizontal: 25,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
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
});

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
  