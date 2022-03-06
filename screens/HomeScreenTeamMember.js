import { StyleSheet, Keyboard, Text, View, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import { useState, useEffect } from 'react';
import mountain from '../assets/backgrounds/littleMountains.png';
import Tappable from '../components/tappable';
import { TouchableOpacity } from 'react-native';
import database from "../config/firebase";
import { ref, set, onValue } from "firebase/database";
import RecentJourny from '../components/recent_journy';
import styles from '../Styles';
import { AntDesign } from '@expo/vector-icons'; 

export default function HomeScreenTeamMember(props) {
    const [recentJourny, setRecentJourny] = useState(null)
    const [entryDate, setEntryDate] = useState(null)
    const [journyPath, setJournyPath] = useState(null)
    const [team, setTeam] = useState(null)
    useEffect(() => {
        console.log("i am here lsjdfljs")
        const today = new Date()
        const month = new Date().getMonth() + 1
        const date = month + "_" + today.getDate() + "_" + today.getFullYear()
        setEntryDate(date)
        // have we had a recent journy in this journal? if it is not the date of today let's override
        onValue(ref(database, "journals/" + props.route.params.journal.id + "/journys/recent-journy"), (snapshot) => {
            if (snapshot.exists()) {
                onValue(ref(database, "journals/"+props.route.params.journal.id +"/journys/" + snapshot.val()), (snapshot) => {
                    if (snapshot.exists()) {
                        setRecentJourny(snapshot.val())
                    }
                })
            }
            else {
                setRecentJourny('none')
            }
        })
        if (!team) {
            onValue(ref(database, "journals/" + props.route.params.journal.id + "/users"), (snapshot) => {
                setTeam(snapshot.val())
            })
        }

        setJournyPath("journals/" + props.route.params.journal.id + "/journys/" + date)
    }, []);
    const addRecentEntry = () => {
        if (recentJourny) {
            if (recentJourny == "none") {
                props.navigation.navigate("PromptTypeScreen", { entryDate: entryDate, user: props.route.params.user, journal: props.route.params.journal, entryDate: entryDate, journyPath: journyPath })
            }
            else {
                return (
                    <TouchableOpacity onPress={() => props.navigation.navigate("JournyScreen", { team: team, user: props.route.params.user, journal: props.route.params.journal, journy: recentJourny, entryDate: recentJourny["entry-date"] })}><RecentJourny style={{ maxHeight: 40 }} journy={recentJourny} user={props.route.params.user} entryDate={recentJourny["entry-date"]} /></TouchableOpacity>
                )
            }
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <ImageBackground source={mountain} resizeMode="stretch" style={styles.image}>
                    <Text style={[styles.text, { fontSize: 50, position: 'absolute', top: 30 }]}>{props.route.params.journal.name}'s Journy</Text>
                    {
                        addRecentEntry()
                    }
                    <View style={{ position: 'absolute', bottom: 20 }}>

                        <Tappable onPress={() => props.navigation.navigate("PromptTypeScreen", { entryDate: entryDate, user: props.route.params.user, journal: props.route.params.journal, journyPath: journyPath })}
                            text="NEW JOURNY"
                            type="normal"
                            backgroundColor="white"
                            borderColor="black" />
                    </View>
                    <TouchableOpacity onPress={() => props.navigation.navigate("CalendarScreen", {journal: props.route.params.journal})}><AntDesign name="calendar" size={50} color="black" /></TouchableOpacity>
                </ImageBackground>
            </View>
        </TouchableWithoutFeedback>
    );
}
