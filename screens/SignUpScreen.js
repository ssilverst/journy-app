import { StyleSheet, Alert, Keyboard, Text, TextInput, View, SafeAreaView, TouchableOpacity, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import { useState } from 'react';

import Tappable from '../components/tappable';
import home from '../assets/homescreen.png';
import database from "../config/firebase";
import { ref, set, onValue } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import 'firebase/firestore'
import styles from '../Styles';

const auth = getAuth();

export default function SignUpScreen(props) {
    const [nameText, setNameText] = useState("")
    const [emailText, setEmailText] = useState("")
    const [passwordText, setPasswordText] = useState("")
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Team Member', value: 'team-member' },
        { label: 'Facilitator', value: 'facilitator' }
    ]);
    


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <ImageBackground source={home} resizeMode="stretch" style={styles.image}>
                    <SafeAreaView>
                        <TextInput
                            style={styles.input}
                            onChangeText={setNameText}
                            value={nameText}
                            placeholder='Name'
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={setEmailText}
                            value={emailText}
                            placeholder='Email'
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={setPasswordText}
                            value={passwordText}
                            secureTextEntry={true}
                            placeholder='Password'
                        />
                    </SafeAreaView>
                    <Tappable onPress={() => {
                        createUserWithEmailAndPassword(auth, emailText, passwordText)
                            .then((userCredential) => {
                                // Signed in 
                                const user = userCredential.user;
                                user.displayName = nameText
                                console.log(user)
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
                </ImageBackground>
            </View>
        </TouchableWithoutFeedback >
    );
}
