import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { fetchDecks } from '../actions/decksActions';

class DecksView extends Component {
    componentDidMount() {
        this.props.fetchDecks();
    }
    
    _keyExtractor = (item, index) => item.id;

    _renderItem = ({ item }) => {
        const { decks } = this.props;
    
        return (
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate(
              'IndividualDeck',
              { deckId: item, title: decks[item].title }
            )}
          >
            {/* <Deck title={decks[item].title} questions={decks[item].questions} /> */}
            "Deck Component"
          </TouchableOpacity>
        );
    }

    render () {
        const { deckId, decks } = this.props;
        console.log("Props" ,decks, deckId)
        return (
            <View style={{flex: 1}}>
                <FlatList
                    data={deckId}
                    extraData={decks}
                    renderItem={this._renderItem}
                    keyExtractor={this._keyExtractor}
                />
            </View>
        )
    }
}

const mapStateToProps = ({ deckId, decks }) => {
    return {
      deckId,
      decks,
    }
  };
  
export default connect(mapStateToProps, {
    fetchDecks,
})(DecksView);