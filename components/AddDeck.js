import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, Platform, StyleSheet } from 'react-native';
import {connect} from 'react-redux';
import {addDeck} from '../actions';
import {saveDeck} from '../utils/api';
import {NavigationActions} from 'react-navigation';
import {black, gray, lightPurp} from '../styles/colors';
import FormWidget from '../components/FormWidget';

class AddDeck extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: ""
        }
    }

    goToHomePage = () => {
        this.props.navigation.navigate('DecksView', {title: this.state.title})
    }

    submitFn = () => {
        const {title} = this.state
        const {addDeck} = this.props
        if (title) {
            saveDeck(title)
            addDeck(title)
            this.goToHomePage()
        }
    }

    cancelFn = () => {
        this.setState({title: ""})
        this.goToHomePage()
    }

    render () {
        return (
            <View style={styles.container}>
                <Text style={styles.textLabel}>Enter a title for your new deck</Text>
                <TextInput style={styles.title} editable={true} maxLength={50} placeholder="Title of your deck" onChangeText={(title) => this.setState({title})}/>
                <FormWidget onSubmit={this.submitFn} onCancel={this.cancelFn} submitBtnVal={'Add Deck'} cancelBtnVal={'Cancel'}/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20
    },
    textLabel: {
      margin: 10,
      color: black,
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 40
    },
    title: {
      marginTop: 10,
      marginBottom: 10,
      padding: 10,
      paddingTop: 10,
      paddingBottom: 10,
      borderWidth: 1,
      borderRadius: 4,
      borderColor: gray
    }
  })

function mapStateToProps(decks) {
    return {decks}
}

const mapDispatchToProps = (dispatch)=>{
    return {
      addDeck: (deckTitle)=>dispatch(addDeck(deckTitle))
    }
};

export default connect(mapStateToProps, {addDeck})(AddDeck)