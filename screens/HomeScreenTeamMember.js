import { Image, ScrollView, Keyboard, Text, View, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import { useState, useEffect } from 'react';
import mountain from '../assets/backgrounds/littleMountains.png';
import Tappable from '../components/tappable';
import { TouchableOpacity } from 'react-native';
import database from "../config/firebase";
import { ref, set, onValue } from "firebase/database";
import RecentJourny from '../components/recent_journy';
import styles from '../Styles';
import { AntDesign } from '@expo/vector-icons';
import MenuBar from '../components/menubar';
import JournalInfo from '../components/journalinfo';
import { Colors } from '../Colors';
import notificationIcon from '../assets/icons/notificationIcon.png'
export default function HomeScreenTeamMember(props) {
    const [recentJourny, setRecentJourny] = useState(null)
    const [entryDate, setEntryDate] = useState(null)
    const [journyPath, setJournyPath] = useState(null)
    const [team, setTeam] = useState(null)
    const [showInfo, setShowInfo] = useState(false)
    useEffect(() => {
        const today = new Date()
        const month = new Date().getMonth() + 1
        const date = month + "_" + today.getDate() + "_" + today.getFullYear()
        setEntryDate(date)
        // have we had a recent journy in this journal? if it is not the date of today let's override
        onValue(ref(database, "journals/" + props.route.params.journal.id + "/journys/recent-journy"), (snapshot) => {
            if (snapshot.exists()) {
                onValue(ref(database, "journals/" + props.route.params.journal.id + "/journys/" + snapshot.val()), (snapshot) => {
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
                return (
                    <View style={{ backgroundColor: '#aecfb3', marginTop: 40, padding: 20, width: 300, borderRadius: 20 }}>
                        <Text style={[styles.text, { textAlign: 'left', fontSize: 30 }]}>This is where you will see your team's most recent Journy. To start writing, tap on "New Journy". Happy journaling! </Text>
                    </View>
                )
            }
            else {
                return (
                    <TouchableOpacity style={{ zIndex: 2 }} onPress={() => props.navigation.navigate("JournyScreen", { team: team, user: props.route.params.user, journal: props.route.params.journal, journy: recentJourny, entryDate: recentJourny["entry-date"] })}>
                        <RecentJourny style={{ maxHeight: 40, }} journy={recentJourny} user={props.route.params.user} entryDate={recentJourny["entry-date"]} />
                    </TouchableOpacity>
                )
            }
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <ImageBackground source={mountain} resizeMode="stretch" style={styles.image}>
                    <View style={{ position: 'absolute', top: 20, right: 20, zIndex: 4, width: 30 }}>
                        <TouchableOpacity onPress={() => props.navigation.navigate("FeedbackNotificationScreen", { team: team, user: props.route.params.user, journal: props.route.params.journal })}><Image style={{ flex: 1, width: 30, height: 30, resizeMode: 'contain', }} source={notificationIcon} /></TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{ position: 'absolute', top: 80, right: 10, zIndex: 2 }} onPress={() => setShowInfo(true)}>
                        <AntDesign name="sharealt" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={[styles.text, { position: 'absolute', top: 20, fontSize: 40, }]}>{props.route.params.journal.name}'s Journy</Text>
                    <View style={{position: 'absolute', height: '80%', top: 130}}>
                        <ScrollView>
                            {
                                addRecentEntry()
                            }

                            <View style={{ }}>
                                <Tappable onPress={() => props.navigation.navigate("PromptTypeScreen", { entryDate: entryDate, user: props.route.params.user, journal: props.route.params.journal, journyPath: journyPath })}
                                    text="NEW JOURNY"
                                    type="normal"
                                    backgroundColor="white"
                                    borderColor="black" />
                            </View>
                        </ScrollView>
                    </View>
                    {showInfo && <View style={{ borderWidth: 2, position: 'absolute', padding: 10, borderRadius: 20, zIndex: 5, backgroundColor: Colors.popUpBackground }}>
                        <JournalInfo closePopup={() => setShowInfo(false)} journal={props.route.params.journal} />
                    </View>}
                </ImageBackground>
                <MenuBar selected="home" onCalendarPress={() => props.navigation.navigate("CalendarScreen", { journal: props.route.params.journal, user: props.route.params.user })} />
            </View>
        </TouchableWithoutFeedback>
    );
}
