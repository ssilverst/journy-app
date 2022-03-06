import { StyleSheet, Text, TextInput, View, SafeAreaView, TouchableOpacity } from 'react-native';
import * as Clipboard from 'expo-clipboard'
import { Ionicons } from '@expo/vector-icons';

import { useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import database from "../config/firebase";
import styles from '../Styles';
import Tappable from '../components/tappable';
import { ref, set, onValue } from "firebase/database";
export default function CreateJournalPopup(props) {
    const [journalName, setJournalName] = useState(null)

    const journals = props.user.journals
    const [showCode, setShowCode] = useState(false)
    const JOURNAL_ID = uuidv4();
    return (
        <View style={createStyles.container}>
            <TouchableOpacity style={{ left: 305 }} onPress={props.closePopup}><Ionicons name="close" size={24} color="black" /></TouchableOpacity>
            {!showCode ? <SafeAreaView style={{ display: 'flex', alignItems: 'center' }}>
                <TextInput
                    style={styles.input}
                    onChangeText={setJournalName}
                    value={journalName}
                    placeholder='Enter Your Team Name'
                />
                <View style={{ width: 200 }}>
                    <Tappable onPress={() => {
                        setShowCode(true)
                        const USER_ID = props.user.id
                        const journal =
                        {
                            name: journalName,
                            facilitator: props.user.id,
                            id: JOURNAL_ID
                        }
                        set(ref(database, 'journals/' + JOURNAL_ID), journal);
                        set(ref(database, 'journals/' + JOURNAL_ID + '/users/' + USER_ID), props.user)
                        set(ref(database, 'users/' + props.user.id + '/journals/' + JOURNAL_ID), {
                            name: journalName,
                            facilitator: props.user.id,
                            id: JOURNAL_ID
                        })
                        props.updateJournals(JOURNAL_ID)
                    }}
                        text="CREATE JOURNAL"
                        type="normal"
                        backgroundColor="white"
                        borderColor="black"
                        fontSize={25}
                    />
                </View>

            </SafeAreaView> :
                <SafeAreaView>
                    <Text style={[styles.text, { fontSize: 30 }]}>Shareable Code:</Text>
                    <View style={{ width: 300, padding: 20, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={[styles.text, { fontSize: 20 }]}>{JOURNAL_ID}</Text>
                        <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => Clipboard.setString(JOURNAL_ID)}>
                            <Ionicons name="ios-copy-outline" size={24} color="black" />
                        </TouchableOpacity>
                    </View>
                    <Text>When team members on this team log in, have them enter this code to access this journal.</Text>
                </SafeAreaView>}
        </View>
    );
}

const createStyles = StyleSheet.create({
    container: {
        borderColor: '#fcf2d9',
        backgroundColor: '#fcf2d9',
        borderWidth: 6,
        borderRadius: 20,
        height: 200,
        display: 'flex',
        alignContent: 'center',
        justifyContent: 'center',

    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center"
    }
})