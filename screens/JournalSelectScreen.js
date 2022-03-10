import { StyleSheet, Keyboard, Text, Alert, View, ScrollView, TouchableOpacity, ImageBackground, TouchableWithoutFeedback, Platform } from 'react-native';
import { useState, useEffect } from 'react';
import mountain from '../assets/backgrounds/littleMountains.png';
import database from "../config/firebase";
import { ref, onValue } from "firebase/database";
import AddJournalPopup from '../components/AddJournalPopup';
import CreateJournalPopup from '../components/CreateJournalPopup';
import Book from '../components/book';
import styles from '../Styles';
import { Colors } from "../Colors";
import { AntDesign } from '@expo/vector-icons';
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';
export default function JournalSelectScreen(props) {
    const [showFacilitatorPopup, setShowFacilitatorPopup] = useState(false)
    const [showTeamPopup, setShowTeamPopup] = useState(false)
    const [journals, setJournals] = useState([])
    const [journalKeys, setJournalKeys] = useState([])
    const [chooseRole, setChooseRole] = useState(false)
    const windowHeight = useWindowDimensions().height;
    // var journalObjects = props.route.params.user.journals
    useEffect(() => {
        console.log('im aer')
        if (props.route.params.user.journals) {
            setJournals(props.route.params.user.journals)
            console.log(Object.keys(props.route.params.user.journals))
            setJournalKeys(Object.keys(props.route.params.user.journals))
        }

    }, []);
    const renderJournals = journalKeys.map((journalId, idx) => {
        return (
            <TouchableOpacity key={idx} style={{ padding: 10 }}>
                <Book onPress={() => props.navigation.navigate("HomeScreenTeamMember", { journal: journals[journalId], user: props.route.params.user.id })} title={journals[journalId].name} />
                <Text style={[styles.text, {fontSize: 30}]}>{journals[journalId].facilitator === props.route.params.user.id ? "Facilitator" : "Team Member"}</Text>
            </TouchableOpacity>
        )
    })
    const updateJournals = (journal) => {
        var newJournals = journals
        newJournals[journal.id] = journal
        setJournals(newJournals)
        setJournalKeys(journalKeys => [...journalKeys, journal.id])
    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={[{ minHeight: Math.round(windowHeight) }, styles.container]}>
                <ImageBackground source={mountain} resizeMode="stretch" style={styles.image}>
                <View style={{position: 'absolute', top: 50}}><Text style={[styles.text, {fontSize: 30}]}>Select a Journal</Text></View>
                    <View style={{ position: 'absolute', top: 130, height: '60%' }}>
                        <ScrollView>
                            <View style={{ width: '100%', display: 'flex', alignItems: 'center', flexBasis: '100%', flexWrap: 'wrap', justifyContent: 'center', flexDirection: 'row' }}>
                                {journalKeys.length > 0 ? renderJournals :
                                    <View style={{ backgroundColor: '#aecfb3', marginTop: 70, padding: 20, width: 300, borderRadius: 20 }}>
                                        <Text style={[styles.text, { textAlign: 'left', fontSize: 30 }]}>Welcome to Journy! To add your first team journal, tap the button below :) You can join an existing journal or create one as a team leader/facilitator. {'\n'}{'\n'}Facilitators will have the ability to give feedback to the group based on their journal entries (we call them the journy). </Text>
                                    </View>}
                            </View>

                        </ScrollView>
                    </View>
                    {showTeamPopup && <AddJournalPopup style={{ opacity: 0.7, position: 'absolute', top: 60 }} showAlert={(alertText) => Alert.alert(alertText)} updateJournals={(journal) => updateJournals(journal)} user={props.route.params.user} closePopup={() => setShowTeamPopup(false)} />}

                    {showFacilitatorPopup && <CreateJournalPopup style={{ opacity: 0.7, position: 'absolute', top: 60 }} updateJournals={(journal) => updateJournals(journal)} navigation={props.navigation} user={props.route.params.user} closePopup={() => setShowFacilitatorPopup(false)} />}

                    {chooseRole &&
                        <View style={{ position: 'absolute', borderRadius: 20, bottom: 180, display: 'flex', backgroundColor: Colors.popUpBackground, }}>
                            <TouchableOpacity style={{ padding: 10, borderBottomWidth: 2 }} onPress={() => { setShowTeamPopup(true); setChooseRole(false) }} ><Text style={[styles.text, { fontSize: 30 }]}>Join as Team Member</Text></TouchableOpacity>
                            <TouchableOpacity style={{ padding: 10 }} onPress={() => { setShowFacilitatorPopup(true); setChooseRole(false) }}><Text style={[styles.text, { fontSize: 30 }]}>Create as Facilitator</Text></TouchableOpacity>
                        </View>
                    }

                    <TouchableOpacity
                        onPress={() => setChooseRole(!chooseRole)}
                        style={journalStyles.addButton}>
                        <AntDesign name={chooseRole ? 'minuscircle' : 'pluscircle'} size={50} color="black" />
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
        bottom: 120,
        width: 50,
        alignItems: 'center'
    }
})