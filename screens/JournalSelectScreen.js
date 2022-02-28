import { StyleSheet, Keyboard, Text, TextInput, View, SafeAreaView, TouchableOpacity, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import { useState, useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker'
import CreamShoes from "../assets/CreamShoes.ttf";
import mountain from '../assets/backgrounds/littleMountains.png';
import database from "../config/firebase";
import { ref, set, onValue } from "firebase/database";
import AddJournalPopup from './AddJournalPopup';
import CreateJournalPopup from './CreateJournalPopup';

export default function JournalSelectScreen(props) {
    const [showFacilitatorPopup, setShowFacilitatorPopup] = useState(false)
    const [showTeamPopup, setShowTeamPopup] = useState(false)

    return (
        <TouchableWithoutFeedback style={{backgroundColor: 'pink'}} onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <ImageBackground source={mountain} resizeMode="stretch" style={styles.image}>
                    {Array.isArray(props.route.params.user.journals)
                        ? props.route.params.user.journals.map((journalId, idx) => {
                            var journal = null
                            onValue(ref(database, 'journals/' + journalId), (snapshot) => {
                                console.log(snapshot.val())
                                journal = snapshot.val()
                            })
                            return (
                                <View style={{ height: 40, width: 100, backgroundColor: 'yellow', borderColor: 'black', borderWidth: 2 }}>
                                    <Text>{journal && journal.name}</Text>
                                </View>
                            )
                        })
                        : null}
                    <TouchableOpacity 
                        onPress={() => 
                            {
                                props.route.params.user.role === "team-member" ? setShowTeamPopup(true) : setShowFacilitatorPopup(true)
                            }}
                        style={styles.addButton}><Text style={{fontSize: 40}}>+</Text></TouchableOpacity>
                    {showTeamPopup && <AddJournalPopup user={props.route.params.user} closePopup={() => setShowTeamPopup(false)}/>}
                    {showFacilitatorPopup && <CreateJournalPopup navigation={props.navigation} user={props.route.params.user} closePopup={() => setShowFacilitatorPopup(false)} />}
                </ImageBackground>
            </View>
        </TouchableWithoutFeedback>
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