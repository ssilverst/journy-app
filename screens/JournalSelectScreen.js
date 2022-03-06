import { StyleSheet, Keyboard, Text, Alert, View, KeyboardAvoidingView, TouchableOpacity, ImageBackground, TouchableWithoutFeedback, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import mountain from '../assets/backgrounds/littleMountains.png';
import database from "../config/firebase";
import { ref, onValue } from "firebase/database";
import AddJournalPopup from '../components/AddJournalPopup';
import CreateJournalPopup from '../components/CreateJournalPopup';
import Book from '../components/book';
import styles from '../Styles';
import {Colors} from "../Colors";

import { Ionicons } from '@expo/vector-icons';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
export default function JournalSelectScreen(props) {
    const [showFacilitatorPopup, setShowFacilitatorPopup] = useState(false)
    const [showTeamPopup, setShowTeamPopup] = useState(false)
    const [journals, setJournals] = useState([])
    const [chooseRole, setChooseRole] = useState(false)
    const windowHeight = useWindowDimensions().height;

    useEffect(() => {
        props.route.params.user.journals && setJournals(Object.keys(props.route.params.user.journals))
    }, []);
    const addToJournal = (journalId) => {
        setJournals(journals => [...journals, journalId])
    }
    const renderJournals = journals.map((journalId, idx) => {
        return (
            <TouchableOpacity key={idx} style={{ padding: 10 }}>
                <Book onPress={() => props.navigation.navigate("HomeScreenTeamMember", { journal: props.route.params.user.journals[journalId], user: props.route.params.user.id })} title={props.route.params.user.journals[journalId].name} />
            </TouchableOpacity>
        )
    })
    return (
        <TouchableWithoutFeedback style={{ backgroundColor: 'pink' }} onPress={Keyboard.dismiss} accessible={false}>
            <View style={[{ minHeight: Math.round(windowHeight) }, styles.container]}>
                <ImageBackground source={mountain} resizeMode="stretch" style={styles.image}>
                    <View style={{ width: '100%', height: '70%', position: 'absolute', top: 130, display: 'flex', alignItems: 'center', flexBasis: '100%', flexWrap: 'wrap', justifyContent: 'center', flexDirection: 'row' }}>
                        {journals.length > 0 ? renderJournals : 
                        <View style={{backgroundColor: '#aecfb3', marginTop: 40, padding: 20, width: 300, borderRadius: 20}}>
                            <Text style={[styles.text, {textAlign: 'left', fontSize: 30}]}>Welcome to Journy! To add your first team journal, tap the button below :) You can join an existing journal or create one as a team leader/facilitator. {'\n'}{'\n'}Facilitators will have the ability to give feedback to the group based on their journal entries (we call them the journy). </Text>
                        </View>}
                    </View> 
                    {showTeamPopup && <AddJournalPopup style={{ position: 'absolute', top: 60 }} showAlert={(alertText) => Alert.alert(alertText)} updateJournals={(journalId) => addToJournal(journalId)} user={props.route.params.user} closePopup={() => setShowTeamPopup(false)} />}

                    {showFacilitatorPopup && <CreateJournalPopup style={{ position: 'absolute', top: 60 }} updateJournals={(journalId) => addToJournal(journalId)} navigation={props.navigation} user={props.route.params.user} closePopup={() => setShowFacilitatorPopup(false)} />}

                    {chooseRole &&
                        <View style={{ position: 'absolute', borderRadius: 20, bottom: 80, display: 'flex', backgroundColor: Colors.joinColor }}>
                            <TouchableOpacity style={{ padding: 10, borderBottomWidth: 2 }} onPress={() => { setShowTeamPopup(true); setChooseRole(false) }} ><Text style={[styles.text, {fontSize: 30}]}>Join as Team Member</Text></TouchableOpacity>
                            <TouchableOpacity style={{ padding: 10 }} onPress={() => { setShowFacilitatorPopup(true); setChooseRole(false) }}><Text style={[styles.text, {fontSize: 30}]}>Create as Facilitator</Text></TouchableOpacity>
                        </View>
                    }

                <TouchableOpacity
                    onPress={() => setChooseRole(!chooseRole)}
                    style={journalStyles.addButton}>
                    <Ionicons name="add-circle" size={50} color="black" />
                </TouchableOpacity>
                </ImageBackground>
            </View>
        </TouchableWithoutFeedback>
    );
}

const journalStyles = StyleSheet.create({
    addButton:
    {
        position: 'absolute',
        bottom: 70,
        width: 50,
        alignItems: 'center'
    }
})