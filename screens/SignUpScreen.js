import { StyleSheet, Alert, Keyboard, Text, TextInput, View, SafeAreaView, TouchableOpacity, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import { useState } from 'react';

import Tappable from '../components/tappable';
import home from '../assets/homescreen.png';
import database from "../config/firebase";
import { ref, set, onValue } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import 'firebase/firestore'
import styles from '../Styles';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';

const auth = getAuth();

export default function SignUpScreen(props) {
    const [nameText, setNameText] = useState("")
    const [emailText, setEmailText] = useState("")
    const [passwordText, setPasswordText] = useState("")
    const windowHeight = useWindowDimensions().height;


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={[{ minHeight: Math.round(windowHeight) }, styles.container]}>
                <ImageBackground source={home} resizeMode="stretch" style={styles.image}>
                <SafeAreaView style={{position: 'absolute', top: 200}}>
                        <TextInput
                            style={[styles.input, {fontSize: 40}]}
                            onChangeText={setNameText}
                            value={nameText}
                            placeholder='Name'
                        />
                        <TextInput
                            style={[styles.input, {fontSize: 40}]}
                            onChangeText={setEmailText}
                            value={emailText}
                            placeholder='Email'
                        />
                        <TextInput
                            style={[styles.input, {fontSize: 40}]}
                            onChangeText={setPasswordText}
                            value={passwordText}
                            secureTextEntry={true}
                            placeholder='Password'
                        />
                    <Tappable onPress={() => {
                        createUserWithEmailAndPassword(auth, emailText, passwordText)
                            .then((userCredential) => {
                                // Signed in 
                                const user = userCredential.user;
                                user.displayName = nameText

                                set(ref(database, 'users/' + user.uid), {
                                    name: nameText,
                                    id: user.uid,
                                    email: emailText,
                                    password: passwordText,
                                    journals: []
                                });
                                props.navigation.navigate("SignInScreen")
                            })
                            .catch((error) => {
                                Alert.alert(error.code.substring(5))
                                console.log(error)
                            });
                    }} text={"SIGN UP"} type={"underlined"}/>
                    </SafeAreaView>
                </ImageBackground>
            </View>
        </TouchableWithoutFeedback>
    );
}
