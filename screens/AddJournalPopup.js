import { StyleSheet, Keyboard, Text, TextInput, View, SafeAreaView, TouchableOpacity, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import { useState, useEffect, useReducer } from 'react';
import DropDownPicker from 'react-native-dropdown-picker'
import CreamShoes from "../assets/CreamShoes.ttf";
import mountain from '../assets/backgrounds/littleMountains.png';
import database from "../config/firebase";
import { ref, set, onValue } from "firebase/database";

export default function AddJournalPopup(props) {
    const [journalCode, setJournalCode] = useState(null)
    const journals = props.user.journals
    return (
        <View style={styles.container}>
            <SafeAreaView>
                <TouchableOpacity style={{ left: 305 }} onPress={props.closePopup}><Text style={{ fontSize: 20 }}>x</Text></TouchableOpacity>
                <TextInput
                    style={styles.input}
                    onChangeText={setJournalCode}
                    value={journalCode}
                    placeholder='Enter a Journal Code'
                />
                <TouchableOpacity style={{ width: 100, height: 30, left: 110, backgroundColor: 'white', alignItems: 'center', borderRadius: 10 }} onPress={() => {
                    onValue(ref(database, "journals/" + journalCode), (snapshot) => {
                        if (snapshot.exists()) {
                            const journalRef = ref(database, 'journals/' + journalCode + '/users')
                            if (journals) {
                                journals.push(journalCode)
                            }
                            onValue(journalRef, (snapshot) => {
                                var journalUsers = snapshot.val()
                                if (journalUsers.indexOf(props.user.id) <= -1) {
                                    journalUsers.push(props.user.id)
                                    console.log(journalUsers)
                                    set(journalRef, journalUsers)
                                }
                            })
                            set(ref(database, "users/" + props.user.id + "/journals"), (journals ? journals : [journalCode]))
                            props.closePopup()

                        }
                        else {
                            console.log("this journal does not exist")
                        }
                    });
                }}><Text>Enter</Text></TouchableOpacity>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderColor: 'tan',
        backgroundColor: 'tan',
        borderWidth: 6,
        borderRadius: 20,
        height: 200,
        display: 'flex'
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