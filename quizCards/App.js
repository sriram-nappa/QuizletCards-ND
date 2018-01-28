import React, {Component} from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { View, StatusBar, StyleSheet, Text } from 'react-native';
import { Constants } from 'expo';
import { lightPurp, blue } from './styles/colors';
import configureStore from './store';
import initState from './utils/initialState';
import AppNavigator from './utils/navigator';

const store = configureStore(initState)

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
      <Provider store={store}>  
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
