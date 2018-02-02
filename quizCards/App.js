import React, {Component} from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { View, StatusBar, StyleSheet, Text } from 'react-native';
import { Constants } from 'expo';
import { lightPurp, blue } from './styles/colors';
import quizReducer from './reducers';
import initState from './utils/initialState';
import AppNavigator from './utils/navigator';

AppStatusBar = ({backgroundColor, ...props}) => {
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}

export default class App extends Component {
  render() {
    return (
      <Provider store={createStore(quizReducer)}>  
        <View style={styles.container}>
          <AppStatusBar backgroundColor={lightPurp} barStyle="light-content"/>
          <AppNavigator/>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
