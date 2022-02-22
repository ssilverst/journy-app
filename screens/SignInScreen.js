import { Text, View, StyleSheet } from 'react-native';
import { useState } from 'react';
import CreamShoes from "../assets/CreamShoes.ttf";
import Background from '../components/Background';
import { isRequired } from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedColorPropType';


export default function SignInScreen() {

    return (
        <Background filepath={'../assets/homescreen.png'}>
            <Text> Hi there </Text>
        </Background>
    );

}

const styles = StyleSheet.create({

})