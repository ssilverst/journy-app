import { Text, View, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard, SafeAreaView, TextInput } from 'react-native';
import { useState } from 'react';
import exStyles from '../Styles';
import CreamShoes from "../assets/CreamShoes.ttf";
import Background from '../components/Background';
import { isRequired } from 'react-native/Libraries/DeprecatedPropTypes/DeprecatedColorPropType';

// ISSUE: TouchableWithoutFeedback is not working on this screen - does this have anything to do 
// with it beign only able to support one child, and the background not being configured correctly?

// ALso: need to implement keeping track if the screen has been navigate to with the team member button
// or the facilitator button.

export default function SignInScreen(props) {
    const [emailText, setEmailText] = useState("")
    const [passwordText, setPasswordText] = useState("")
    const signInType = props.route.params["type"] + " sign-in"

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <Background image={require('../assets/homescreen.png')}>
                <Text>{signInType}</Text>
                <SafeAreaView>
                    <TextInput
                        style={exStyles.input}
                        onChangeText={setEmailText}
                        value={emailText}
                        placeholder='Email'
                    />
                    <TextInput
                        style={exStyles.input}
                        onChangeText={setPasswordText}
                        value={passwordText}
                        secureTextEntry={true}
                        placeholder='Password'
                    />
                </SafeAreaView>
                <TouchableOpacity>
                    <Text> Sign in </Text>
                </TouchableOpacity>
            </Background>
        </TouchableWithoutFeedback>
    );

}

const styles = StyleSheet.create({

})