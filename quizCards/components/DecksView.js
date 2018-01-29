import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import { getDecks } from '../utils/api';
import { loadDecks } from '../actions';
import { AppLoading } from 'expo'

class DecksView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true
        }
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
    
    _keyExtractor = (item, index) => item.id;

    _renderItem = ({ item }) => {
        const { decks } = this.props;
        console.log("Item",item)
        return (
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate(
              'IndividualDeck',
              { deckId: item, title: decks[item].title }
            )}
          >
            <Text key={item}>Decks here</Text>
            {/* <Deck title={decks[item].title} questions={decks[item].questions} /> */}
          </TouchableOpacity>
        );
    }

    render () {
        const { deckIds, decks } = this.props.decks;
        return (
            <View style={{flex: 1}}>
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