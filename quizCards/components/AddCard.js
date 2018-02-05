import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import {connect} from 'react-redux';
import {addCard} from '../actions';
import {addCardAPI} from '../utils/api';
import {NavigationActions} from 'react-navigation';
import {black, gray, lightPurp} from '../styles/colors';
import FormWidget from '../components/FormWidget';

class AddCard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            question: '',
            answer: '',
        }
        this.submitFn = this.submitFn.bind(this)
        this.resetFn = this.resetFn.bind(this)
    }

    submitFn() {
        const {deck, addCard} = this.props
        console.log("This Props", this.props)
        const {cardQuestion, cardAnswer} = this.state
        console.log("IN")
        if(cardQuestion && cardAnswer) {
            addCard(deck.title, {cardQuestion, cardAnswer})
            addCardAPI(deck.title, {cardQuestion,cardAnswer})
            this.props.goToHomePage()
        }
    }

    resetFn() {
        this.setState({question: '', answer: ''})
        this.props.goToHomePage()
    }

    render() {
        const {deck} = this.props
        console.log("DECK", deck)
        return (
        <View style={styles.container}>
            <Text style={styles.title}>{deck.title}</Text>
            <TextInput style={styles.question} underlineColorAndroid={'transparent'} editable={true} maxLength={100} placeholder="Type question" onChangeText={(cardQuestion) => this.setState({cardQuestion})}/>
            <TextInput style={styles.answer} underlineColorAndroid={'transparent'} editable={true} maxLength={200} multiline={true} placeholder="Type answer" onChangeText={(cardAnswer) => this.setState({cardAnswer})}/>
            <FormWidget onSubmit={this.submitFn} onCancel={this.resetFn} submitBtnText={'Add Card'}/>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20
    },
    title: {
      color: black,
      fontSize: 24,
      textAlign: 'center'
    },
    question: {
      marginTop: 10,
      marginBottom: 10,
      padding: 10,
      paddingTop: 5,
      paddingBottom: 5,
      borderWidth: 1,
      borderColor: lightPurp,
      borderRadius: 4
    },
    answer: {
      marginTop: 10,
      marginBottom: 10,
      padding: 10,
      paddingTop: 5,
      paddingBottom: 5,
      borderWidth: 1,
      borderRadius: 4,
      borderColor: lightPurp,
      height: 70
    }
  })

function mapStateToProps(decks, {navigation}) {
    const {deckTitle} = navigation.state.params
    console.log("DECKSOBJ", decks)
    return {
        deck: decks.decks[deckTitle] || {}
    }
}

function mapDispatchToProps(dispatch, {navigation}) {
    // const {deckTitle} = navigation.state.params
    return {
      goToHomePage: () => navigation.goBack(),
      addCard: (deckTitle, card) => dispatch(addCard(deckTitle, card))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCard)