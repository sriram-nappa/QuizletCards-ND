import React from 'react';
import { TabNavigator, StackNavigator, TabBarBottom } from 'react-navigation';
import { Text, View, Platform } from 'react-native';
import { Icon } from 'react-native-elements'
import { lightPurp, white, shadowColor } from '../styles/colors';


import DecksView from '../components/DecksView';

const Tabs = TabNavigator(
    {
        DecksView: {
            screen: DecksView,
            navigationOptions: {
                tabBarLabel: 'Decks',
                tabBarIcon: ({colorTag}) => <Icon name='archive' color={colorTag}/>,
            }
        }
    },
    {
        navigationOptions: {
          header: null
        },
        tabBarOptions: {
          activeTintColor: Platform.OS === 'ios' ? lightPurp : white,
          style: {
            height: 64,
            backgroundColor: Platform.OS === 'ios' ? white : white,
            shadowColor: shadowColor,
            shadowOffset: {
              width: 0,
              height: 6
            },
            shadowRadius: 10,
            shadowOpacity: 1
          }
        }
    }
);

const AppNavigator = StackNavigator(
    {
        Home: {
            screen: Tabs,
        }
    }
)

export default AppNavigator;

