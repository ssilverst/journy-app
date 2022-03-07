import { StyleSheet, TextInput, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import database from "../config/firebase";
import { ref, set, onValue } from "firebase/database";
import { Colors } from "../Colors";
import styles from '../Styles';
import { Ionicons } from '@expo/vector-icons';
import Tappable from './tappable';

export default function AddJournalPopup(props) {
    const [journalCode, setJournalCode] = useState(null)
    const journals = props.user.journals
    return (
        <View style={addStyles.container}>
            <SafeAreaView>
                <TouchableOpacity style={{ left: 305 }} onPress={props.closePopup}><Ionicons name="close" size={24} color="black" /></TouchableOpacity>
                <SafeAreaView style={{ display: 'flex', alignItems: 'center' }}>
                    <TextInput
                        style={styles.input}
                        onChangeText={setJournalCode}
                        value={journalCode}
                        placeholder='Enter a Journal Code'
                    /></SafeAreaView>
                <Tappable onPress={() => {
                    onValue(ref(database, "journals/" + journalCode), (snapshot) => {
                        // does the user have any journals
                        if (journals) {
                            // does the user already have this journal
                            if (journals[journalCode]) {
                                if (snapshot.exists()) {
                                    props.updateJournals(journalCode)
                                    // we will update the users in this journal to include current user
                                    set(ref(database, 'journals/' + journalCode + '/users/' + USER_ID), props.user)
                                    // update the journals for the user
                                    set(ref(database, 'users/' + props.user.id + '/journals/' + JOURNAL_ID), {
                                        name: snapshot.val().name,
                                        facilitator: snapshot.val().facilitator,
                                        id: snapshot.val().id
                                    })

                                }
                                else {
                                    props.showAlert("Check the code you are using. This journal does not exist.")
                                }
                            }
                            else {
                                props.showAlert("You already have this journal")
                            }
                        }
                        props.closePopup()
                    });
                }}
                    text="ADD JOURNAL"
                    type="normal"
                    backgroundColor="white"
                    borderColor="black"
                    fontSize={25}
                />
            </SafeAreaView>
        </View>
    );
}

const addStyles = StyleSheet.create({
    container: {
        borderColor: Colors.popUpBorder,
        backgroundColor: Colors.popUpBackground,
        borderWidth: 6,
        borderRadius: 20,
        height: 200,
        display: 'flex'
    },
})