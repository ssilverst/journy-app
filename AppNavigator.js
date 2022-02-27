import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './screens/LandingScreen';
import SignUpScreen from './screens/SignUpScreen';
import JournalSelectScreen from './screens/JournalSelectScreen';
import SignInScreen from './screens/SignInScreen';
import AddJournalScreen from './screens/AddJournalScreen';
import TestingScreen from './screens/TestingScreen';

const Stack = createStackNavigator();

export default function RootAppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LandingScreen">
        <Stack.Screen
          name="LandingScreen"
          component={LandingScreen}
          options={{ title: 'Landing' }}
        />
        <Stack.Screen
          name="TestingScreen"
          component={TestingScreen}
          options={{ title: 'Testing' }}
        />
        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={{ title: 'Sign Up' }}
        />
        <Stack.Screen
          name="JournalSelectScreen"
          component={JournalSelectScreen}
          options={{ title: 'Journal Select' }}
        />
        <Stack.Screen
          name="SignInScreen"
          component={SignInScreen}
          options={{ title: 'Sign In' }}
        />
        <Stack.Screen
          name="AddJournalScreen"
          component={AddJournalScreen}
          options={{ title: 'Add a Journal' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}