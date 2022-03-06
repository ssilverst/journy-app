import { StyleSheet, Text, TextInput, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import database from "../config/firebase";
import { ref, set, onValue } from "firebase/database";
import {Colors} from "../Colors";

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
                        // does the user have any journals
                        if (journals) {
                            // does the user already have this journal
                            if (journals.indexOf(journalCode) <= -1) {
                                if (snapshot.exists()) {
                                    const journalRef = ref(database, 'journals/' + journalCode + '/users')
                                    journals.push(journalCode)
                                    // we will update the users in this journal to include current user
                                    onValue(journalRef, (snapshot) => {
                                        var journalUsers = snapshot.val()
                                        if (journalUsers.indexOf(props.user.id) <= -1) {
                                            journalUsers.push(props.user.id)
                                            set(journalRef, journalUsers)
                                        }
                                    })
                                    // update the journals for the user
                                    set(ref(database, "users/" + props.user.id + "/journals"), (journals))
                                    props.updateJournals(journalCode)
                                    props.closePopup()

                                }
                                else {
                                    props.showAlert("Check the code you are using. This journal does not exist.")
                                }
                            }
                            else {
                                props.showAlert("You already have this journal")
                            }
                        }
                        // aw this is your first journal, welcome baby
                        else {
                            set(ref(database, "users/" + props.user.id + "/journals"), ([journalCode]))
                            console.log(snapshot.val())
                            const newShit = snapshot.val().users
                            console.log(newShit)
                            // newShit.push(props.user.id)

                            // set(ref(database, 'journals/' + journalCode + '/users'), newShit)
                            // onValue(ref(database, 'journals/' + journalCode + '/users'), (snapshot) => {
                            //     console.log(newShit)
                            // })
                            // console.log('gonna set shit on fire')
                        }
                    });
                }}><Text>Enter</Text></TouchableOpacity>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderColor: Colors.popUpBorder,
        backgroundColor: Colors.popUpBackground,
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