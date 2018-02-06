import React from 'react';
import { TabNavigator, StackNavigator, TabBarBottom } from 'react-navigation';
import { Text, View, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { lightPurp, white, black, blue, shadowColor } from '../styles/colors';

import DecksView from '../components/DecksView';
import AddDeck from '../components/AddDeck';
import DeckDetails from '../components/DeckDetails';
import AddCard from '../components/AddCard';
import Quiz from '../components/Quiz';

const Tabs = TabNavigator(
    {
        DecksView: {
            screen: DecksView,
            navigationOptions: {
                tabBarLabel: 'Decks',
                tabBarIcon: ({tintColor}) => <Ionicons name="md-card" size={32} color={tintColor} />,
            }
        },
        AddDeck: {
            screen: AddDeck,
            navigationOptions: {
                tabBarLabel: 'Add Deck',
                tabBarIcon: ({tintColor}) => <Ionicons name="md-add" size={32} color={tintColor} />,
            }
        }
    },
    {
        navigationOptions: {
          header: null
        },
        tabBarOptions: {
          activeTintColor: Platform.OS === 'ios' ? black : black,
          style: {
            height: 64,
            paddingBottom: 10,
            backgroundColor: Platform.OS === 'ios' ? white : lightPurp,
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
        AddCard:{
            screen: AddCard,
            navigationOptions: {
                header: false,
                title: "Add Card"
            }
        },
        Quiz: {
            screen: Quiz,
            navigationOptions: {
                header: false,
                title: "Quiz"
            }
        }
    }
)

export default AppNavigator;

