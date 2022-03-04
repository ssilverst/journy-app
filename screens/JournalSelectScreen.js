import { StyleSheet, Keyboard, Text, Alert, View, TouchableOpacity, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import { useState, useEffect } from 'react';
import mountain from '../assets/backgrounds/littleMountains.png';
import database from "../config/firebase";
import { ref, onValue } from "firebase/database";
import AddJournalPopup from './AddJournalPopup';
import CreateJournalPopup from './CreateJournalPopup';
import Book from '../components/book';
import styles from '../Styles';

export default function JournalSelectScreen(props) {
    const [showFacilitatorPopup, setShowFacilitatorPopup] = useState(false)
    const [showTeamPopup, setShowTeamPopup] = useState(false)
    const [journals, setJournals] = useState([])
    const [chooseRole, setChooseRole] = useState(false)
    useEffect(() => {
        setJournals([])
        Array.isArray(props.route.params.user.journals) && props.route.params.user.journals.map((journalId, idx) => {
            addToJournal(journalId)
        })
    }, []);
    const addToJournal = (journalId) => {
        if (journalId) {
            onValue(ref(database, 'journals/' + journalId), (snapshot) => {
                setJournals(journals => [...journals, snapshot.val()])
            })
        }
    }
    return (
        <TouchableWithoutFeedback style={{ backgroundColor: 'pink' }} onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <ImageBackground source={mountain} resizeMode="stretch" style={styles.image}>
                    <View style={{ width: '100%', height: '70%', position: 'absolute', top: 130, display: 'flex', alignItems: 'center', flexBasis: '100%', flexWrap: 'wrap', justifyContent: 'center', flexDirection: 'row' }}>
                        {Array.isArray(journals)
                            ? journals.map((journal, idx) => {
                                return (
                                    <TouchableOpacity key={idx} style={{ padding: 10 }}>
                                        <Book onPress={() => props.navigation.navigate("HomeScreenTeamMember", {journal: journal, user: props.route.params.user.id})} title={journal.name} />
                                    </TouchableOpacity>
                                )
                            })
                            : null}
                    </View>
                    {chooseRole &&
                        <View style={{ position: 'absolute', borderRadius: 20, bottom: 80, display: 'flex', backgroundColor: '#fffdd0' }}>
                            <TouchableOpacity style={{ padding: 10, borderBottomWidth: 2 }} onPress={() => { setShowTeamPopup(true); setChooseRole(false) }} ><Text style={[styles.text, {fontSize: 30}]}>Join as Team Member</Text></TouchableOpacity>
                            <TouchableOpacity style={{ padding: 10 }} onPress={() => { setShowFacilitatorPopup(true); setChooseRole(false) }}><Text style={[styles.text, {fontSize: 30}]}>Create as Facilitator</Text></TouchableOpacity>
                        </View>
                    }
                    {showTeamPopup && <AddJournalPopup style={{ position: 'absolute', top: 40 }} showAlert={(alertText) => Alert.alert(alertText)} updateJournals={(journalId) => addToJournal(journalId)} user={props.route.params.user} closePopup={() => setShowTeamPopup(false)} />}

                    {showFacilitatorPopup && <CreateJournalPopup style={{ position: 'absolute', top: 40 }} updateJournals={(journalId) => addToJournal(journalId)} navigation={props.navigation} user={props.route.params.user} closePopup={() => setShowFacilitatorPopup(false)} />}


                    <TouchableOpacity
                        onPress={() => setChooseRole(!chooseRole)}
                        style={journalStyles.addButton}><Text style={{ fontSize: 40 }}>+</Text></TouchableOpacity>
                </ImageBackground>
            </View >
        </TouchableWithoutFeedback >
    );
}

const journalStyles = StyleSheet.create({
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