import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { getDecks } from '../utils/api';
import { loadDecks } from '../actions';
import { AppLoading } from 'expo'

import Deck from './Deck';

class DecksView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true
        }
        this.deckEventHandler = this.deckEventHandler.bind(this)
    }

    componentDidMount() {
        getDecks().then((decks) => {
            this.props.loadDecks(decks)
        }).then(() => {
            this.setState({
                loading: false
            })
        })
    }
    
    deckEventHandler = (decks, item) => {
        this.props.navigation.navigate('DeckDetails', {deck : decks[item], title: item})
    }

    _keyExtractor = (item, index) => index;

    _renderItem = ({ item }) => {
        const { decks } = this.props.decks;
        console.log("Item", decks)
        return (
          <TouchableOpacity
            onPress={() => this.deckEventHandler(decks, item)}
          >
            <Deck title={decks[item].title} questions={decks[item].questions} />
          </TouchableOpacity>
        );
    }

    render () {
        const { deckIds, decks } = this.props.decks;
        return (
            <View style={{flex: 1, marginTop: 15}}>
                {
                (this.state.loading) ? 
                    <AppLoading/> :
                    <FlatList
                        data={deckIds}
                        extraData={decks}
                        renderItem={this._renderItem}
                        keyExtractor={this._keyExtractor}
                    />
                }
            </View>
        )
    }
}

const mapDispatchToProps = (dispatch)=>{
    return {
      loadDecks: (decks)=>dispatch(loadDecks(decks))
    }
};

const mapStateToProps = (decks) => {
    return {decks}
}
  
export default connect(mapStateToProps, mapDispatchToProps)(DecksView);