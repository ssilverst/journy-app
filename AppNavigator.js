import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './components/LandingScreen'
import SignUpScreen from './components/SignUpScreen'
import JournalSelectScreen from './components/JournalSelectScreen';
import SignInScreen from './components/SignInScreen';

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
          name="SignUpScreen"
          component={SignUpScreen}
          options={{ title: 'SignUp' }}
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