import { StyleSheet, Keyboard, Text, View, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import { useState, useEffect } from 'react';
import mountain from '../assets/backgrounds/littleMountains.png';
import Tappable from '../components/tappable';
import database from "../config/firebase";
import { ref, set, onValue } from "firebase/database";
import RecentJourny from '../components/recent_journy';
import styles from '../Styles';

export default function HomeScreenTeamMember(props) {
    const [recentJourny, setRecentJourny] = useState(null)
    const [entryDate, setEntryDate] = useState(null)
    const [journyPath, setJournyPath] = useState(null)

    useEffect(() => {
        const today = new Date()
        const month = new Date().getMonth() + 1
        const date = month + "_" + today.getDate() + "_" + today.getFullYear()
        setEntryDate(date)
        onValue(ref(database, "journals/" + props.route.params.journal.id + "/journys/" + date), (snapshot) => {
            if (snapshot.exists()) {
                setRecentJourny(snapshot.val())
            }
            else {
                setRecentJourny('none')
            }
        })

        setJournyPath("journals/" + props.route.params.journal.id + "/journys/" + date)
    }, []);
    const addRecentEntry = () => {
        if (recentJourny) {
            if (recentJourny == "none") {
                props.navigation.navigate("PromptTypeScreen", { user: props.route.params.user, journal: props.route.params.journal, entryDate: entryDate, journyPath: journyPath })
            }
            else {
                return (
                    <RecentJourny journy={recentJourny} entryDate={entryDate}/>
                )
            }
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <ImageBackground source={mountain} resizeMode="stretch" style={styles.image}>
                    <Text style={[styles.text, {fontSize: 50, position: 'absolute', top: 30}]}>{props.route.params.journal.name}'s JOURNY</Text>
                    {
                        addRecentEntry()
                    }
                    <Tappable onPress={() => props.navigation.navigate("PromptTypeScreen", { user: props.route.params.user, journal: props.route.params.journal, journyPath: journyPath })}
                        text="NEW JOURNY"
                        type="normal"
                        backgroundColor="white"
                        borderColor="black" />
                </ImageBackground>
            </View>
        </TouchableWithoutFeedback>
    );
}

const homeStyles = StyleSheet.create({
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