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
                <TouchableOpacity style={{ top: 0, zIndex: 2, position: 'absolute', right: 10 }} onPress={props.closePopup}><Ionicons name="close" size={24} color="black" /></TouchableOpacity>
                <SafeAreaView style={{ display: 'flex', alignItems: 'center' }}>
                    <TextInput
                        style={[styles.input, {marginTop: 30, }]}
                        onChangeText={setJournalCode}
                        value={journalCode}
                        placeholder='Enter a Journal Code'
                    />
                    <View style={{ width: 200, }}>
                        <Tappable onPress={() => {
                            var checkingAlreadyHave = false
                            onValue(ref(database, "journals/" + journalCode), (snapshot) => {
                                // does the user have any journals
                                if (snapshot.exists()) {
                                    if (journals) {
                                        if (journals[journalCode]) {
                                            checkingAlreadyHave = true
                                            props.closePopup()
                                            props.showAlert("You already have this journal")
                                        }
                                    }
                                    if (!checkingAlreadyHave) {
                                        var journalObj = {
                                            name: snapshot.val().name,
                                            facilitator: snapshot.val().facilitator,
                                            id: snapshot.val().id
                                        }
                                        // we will update the users in this journal to include current user
                                        set(ref(database, 'journals/' + journalCode + '/users/' + props.user.id), props.user)
                                        // update the journals for the user
                                        set(ref(database, 'users/' + props.user.id + '/journals/' + journalCode), journalObj)
                                        props.updateJournals(journalObj)
                                    }

                                }
                                else {
                                    props.showAlert("Check the code you are using; this journal does not exist.")
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
                    </View>
                </SafeAreaView>
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
        opacity: 0.95,
        display: 'flex'
    },
})