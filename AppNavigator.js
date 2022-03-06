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
import PromptSelectorScreen from './screens/PromptSelectorScreen';
import PromptTypeScreen from './screens/PromptTypeScreen';
import RatingsScreen from './screens/RatingsScreen';
import JournyScreen from './screens/JournyScreen';
import EntryScreen from './screens/EntryScreen';
import CalendarScreen from './screens/CalendarScreen';
import FacilitatorPromptScreen from './screens/FacilitatorPromptScreen';
import AffirmationsScreen from './screens/AffirmationsScreen';
import { useFonts } from '@use-expo/font';
import AppLoading from 'expo-app-loading';
import { LogBox } from 'react-native';

const customFonts = {
  CreamShoes: require("./assets/fonts/CreamShoes.ttf"),
};
import database from "./config/firebase";
import { ref, set, onValue } from "firebase/database";

const Stack = createStackNavigator();

export default function RootAppNavigator() {
  console.disableYellowBox = true;

  LogBox.ignoreLogs(['Setting a timer']);
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
        <Stack.Screen
          name="PromptSelectorScreen"
          component={PromptSelectorScreen}
          options={{ title: 'Journy' }}
        />
        <Stack.Screen
          name="RatingsScreen"
          component={RatingsScreen}
          options={{ title: 'Journy' }}
        />
        <Stack.Screen
          name="JournyScreen"
          component={JournyScreen}
          options={{ title: 'Journy' }}
        />
        <Stack.Screen
          name="EntryScreen"
          component={EntryScreen}
          options={{ title: 'Journy' }}
        />
        <Stack.Screen
          name="CalendarScreen"
          component={CalendarScreen}
          options={{ title: 'Journy' }}
        />
        <Stack.Screen
          name="FacilitatorPromptScreen"
          component={FacilitatorPromptScreen}
          options={{ title: 'Journy' }}
        />
        <Stack.Screen
          name="AffirmationsScreen"
          component={AffirmationsScreen}
          options={{ title: 'Journy' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}