import { StyleSheet, Alert, Keyboard, Text, TextInput, View, SafeAreaView, TouchableOpacity, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import { useState } from 'react';
import home from '../assets/homescreen.png';
import database from "../config/firebase";
import { ref, set, onValue } from "firebase/database";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useLinkProps } from '@react-navigation/native';
import styles from "../Styles";
import Tappable from '../components/tappable';

const auth = getAuth();
export default function SignInScreen(props) {
    const [emailText, setEmailText] = useState("")
    const [passwordText, setPasswordText] = useState("")

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <ImageBackground source={home} resizeMode="stretch" style={styles.image}>
                    <SafeAreaView>
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

                    <Tappable
                        onPress={() => 
                        {
                            signInWithEmailAndPassword(auth, emailText, passwordText)
                                .then((userCredential) => {
                                    // Signed in 
                                    const user = userCredential.user;
                                    // const userRef = ref(db, 'posts/' + postId + '/starCount');
                                    onValue(ref(database, "users/" + user.uid), (snapshot) => {
                                        if (snapshot.exists()) {
                                            const userData = snapshot.val();
                                            if (userData.password == passwordText) {
                                                props.navigation.navigate("JournalSelectScreen", { user: userData })
                                            }
                                        }
                                        else {
                                            console.log("user does not exist")
                                        }
                                    });
                                })
                                .catch((error) => {
                                    Alert.alert(error.code.substring(5))
                                    console.log(error)
                                });
                        }}
                        text="Sign In"
                        type="underlined"
                    />
            </ImageBackground>
        </View>
        </TouchableWithoutFeedback >
    );
}
/*
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: 300
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center"
    },
})
*/