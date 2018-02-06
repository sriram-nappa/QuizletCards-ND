import React, {Component} from 'react';
import {View, Text, StyleSheet, Platform} from 'react-native';
import {black, gray, lightPurp} from '../styles/colors';

class Deck extends Component {
  render() {
    const {title, questions} = this.props;
    let bigFonts = true;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.count}>{questions.length} cards</Text>
      </View>
    )
  }
}

export default Deck;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 5,
    borderWidth: 3,
    borderColor: lightPurp,
    marginHorizontal: 30,
    marginVertical: 5,
    height: 100
  },
  title: {
    color: black,
    fontSize: 36,
    textAlign: 'center'
  },
  count: {
    color: gray,
    fontSize: 20,
    textAlign: 'center'
  }
})
