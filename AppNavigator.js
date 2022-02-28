import * as React from 'react';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './screens/LandingScreen';
import SignUpScreen from './screens/SignUpScreen';
import JournalSelectScreen from './screens/JournalSelectScreen';
import SignInScreen from './screens/SignInScreen';
import TestingScreen from './screens/TestingScreen';
import database from "./config/firebase";
import { ref, set, onValue } from "firebase/database";

const Stack = createStackNavigator();

export default function RootAppNavigator() {
  // USE THIS TO CLEAR ANY DATA FROM THE DATABASE 
  // useEffect(() => {
  //   set(ref(database, 'journals/'), {})
  // }, []);
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}