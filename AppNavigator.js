import * as React from 'react';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './screens/LandingScreen';
import SignUpScreen from './screens/SignUpScreen';
import JournalSelectScreen from './screens/JournalSelectScreen';
import SignInScreen from './screens/SignInScreen';
import TestingScreen from './screens/TestingScreen';
import HomeScreenTeamMember from './screens/HomeScreenTeamMember';
import WritingPromptScreen from './screens/WritingPromptScreen';
import { useFonts } from '@use-expo/font';
import AppLoading from 'expo-app-loading';
import PromptTypeScreen from './screens/PromptTypeScreen';
const customFonts = {
  CreamShoes: require("./assets/fonts/CreamShoes.ttf"),
};
import database from "./config/firebase";
import { ref, set, onValue } from "firebase/database";

const Stack = createStackNavigator();

export default function RootAppNavigator() {
  // USE THIS TO CLEAR ANY DATA FROM THE DATABASE 
  // useEffect(() => {
  //   set(ref(database, 'journals/'), {})
  // }, []);
  const [isLoaded] = useFonts(customFonts);


  if (!isLoaded) {
    return <AppLoading />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LandingScreen">
        <Stack.Screen
          name="LandingScreen"
          component={LandingScreen}
          options={{ title: 'Journy' }}
        />
        <Stack.Screen
          name="TestingScreen"
          component={TestingScreen}
          options={{ title: 'Journy' }}
        />
        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={{ title: 'Journy' }}
        />
        <Stack.Screen
          name="JournalSelectScreen"
          component={JournalSelectScreen}
          options={{ title: 'Journy' }}
        />
        <Stack.Screen
          name="SignInScreen"
          component={SignInScreen}
          options={{ title: 'Journy' }}
        />
        <Stack.Screen
          name="HomeScreenTeamMember"
          component={HomeScreenTeamMember}
          options={{ title: 'Journy' }}
        />
        <Stack.Screen
          name="WritingPromptScreen"
          component={WritingPromptScreen}
          options={{ title: 'Journy' }}
        />
        <Stack.Screen
          name="PromptTypeScreen"
          component={PromptTypeScreen}
          options={{ title: 'Journy' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}