import { StyleSheet, Keyboard, Text, TextInput, View, SafeAreaView, TouchableOpacity, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import { useState, useEffect, useReducer } from 'react';
import DropDownPicker from 'react-native-dropdown-picker'
import CreamShoes from "../assets/CreamShoes.ttf";
import mountain from '../assets/backgrounds/littleMountains.png';
import database from "../config/firebase";
import { ref, set, onValue } from "firebase/database";

export default function AddJournalScreen(props) {
    const [journalCode, setJournalCode] = useState(null)
    return (
        <View style={styles.container}>
            <ImageBackground source={mountain} resizeMode="stretch" style={styles.image}>
                <SafeAreaView>
                    <TextInput
                        style={styles.input}
                        onChangeText={setJournalCode}
                        value={journalCode}
                        placeholder='Enter a Journal Code'
                    />
                    <TouchableOpacity onPress={() => {
                        onValue(ref(database, "journals/" + journalCode), (snapshot) => {
                            if (snapshot.exists()) {
                            }
                            else {
                                console.log("this journal does not exist")
                            }
                        });
                    }}></TouchableOpacity>
                </SafeAreaView>
            </ImageBackground>
        </View>
    );
}

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
    addButton:
    {
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: 'black',
        position: 'absolute',
        bottom: 5,
        borderRadius: 20,
        width: 50,
        alignItems: 'center'
    }
})