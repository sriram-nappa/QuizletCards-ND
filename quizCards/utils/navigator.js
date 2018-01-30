import React from 'react';
import { TabNavigator, StackNavigator, TabBarBottom } from 'react-navigation';
import { Text, View, Platform } from 'react-native';
import { Icon } from 'react-native-elements'
import { lightPurp, white, black, blue, shadowColor } from '../styles/colors';

import DecksView from '../components/DecksView';
import AddDeck from '../components/AddDeck';
import DeckDetails from '../components/DeckDetails';

const Tabs = TabNavigator(
    {
        DecksView: {
            screen: DecksView,
            navigationOptions: {
                tabBarLabel: 'Decks',
                tabBarIcon: ({tintColor}) => <Icon name='archive' size={35} color={tintColor}/>,
            }
        },
        AddDeck: {
            screen: AddDeck,
            navigationOptions: {
                tabBarLabel: 'Add Deck',
                tabBarIcon: ({tintColor}) => <Icon name='playlist-add' size={40} color={tintColor}/>,
            }
        }
    },
    {
        navigationOptions: {
          header: null
        },
        tabBarOptions: {
          activeTintColor: Platform.OS === 'ios' ? black : white,
          style: {
            height: 64,
            paddingBottom: 10,
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
        },
        DeckDetails:{
            screen: DeckDetails,
            navigationOptions:{
              header: false,
            }
        },
    }
)

export default AppNavigator;

