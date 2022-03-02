import { StyleSheet, Text, TextInput, View, SafeAreaView, TouchableOpacity } from 'react-native';
import * as Clipboard from 'expo-clipboard'

import { useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import database from "../config/firebase";
import { ref, set, onValue } from "firebase/database";
export default function CreateJournalPopup(props) {
    const [journalName, setJournalName] = useState(null)
    const [journalId, setJournalId] = useState(null)


    const journals = props.user.journals
    const userJournals = ref(database, 'users/' + props.user.id + '/journals')
    const [showCode, setShowCode] = useState(false)
    return (
        <View style={styles.container}>
            <TouchableOpacity style={{ left: 305 }} onPress={props.closePopup}><Text style={{ fontSize: 20 }}>x</Text></TouchableOpacity>
            {!showCode ? <SafeAreaView>
                <TextInput
                    style={styles.input}
                    onChangeText={setJournalName}
                    value={journalName}
                    placeholder='Enter Your Team Name'
                />
                <TouchableOpacity style={{ width: 100, height: 30, left: 110, backgroundColor: 'white', alignItems: 'center', borderRadius: 10 }} onPress={() => {
                    const JOURNAL_ID = uuidv4();
                    setJournalId(JOURNAL_ID)
                    setShowCode(true)
                    if (journals) {
                        journals.push(JOURNAL_ID)
                    }
                    set(ref(database, 'journals/' + JOURNAL_ID), {
                        name: journalName,
                        users: [props.user.id],
                        facilitator: props.user.id
                    });
                    set(userJournals, (journals ? journals : [JOURNAL_ID]))
                    props.updateJournals(JOURNAL_ID)
                }}><Text>Enter</Text></TouchableOpacity>

            </SafeAreaView> :
                <SafeAreaView>
                    <TouchableOpacity onPress={() => Clipboard.setString(journalId)}><Text>Code: {journalId}</Text></TouchableOpacity>

                    <Text>When team members on this team log in, have them enter this code to access this journal.</Text>
                </SafeAreaView>}

        </View >
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