import styles from "../Styles";
import { View, Text, ImageBackground, ScrollView, Image } from 'react-native';
import gray from '../assets/backgrounds/grayBackground.png'
import { FontAwesome } from '@expo/vector-icons';
import { set, ref, onValue } from '@firebase/database';
import database from "../config/firebase";
import { useState, useEffect } from "react";
import mountain from '../assets/backgrounds/littleMountains.png'
import discussionIcon from '../assets/icons/discussionIcon.png'
import affirmationIcon from '../assets/icons/affirmationIcon.png'
import freeFeedback from '../assets/icons/freeFeedbackIcon.png'
import { Colors } from "../Colors";
import Tappable from "../components/tappable";

export default function FeedbackNotificationScreen(props) {
    const [feedback, setFeedback] = useState(null)
    const [facilitatorName, setFacilitatorName] = useState(null)
    const [feedbackKeys, setFeedbackKeys] = useState([])
    const [feedbackDates, setFeedbackDates] = useState([])
    useEffect(() => {
        onValue(ref(database, 'journals/' + props.route.params.journal.id), snapshot => {

            if (snapshot.exists()) {
                setFacilitatorName(snapshot.val().users[snapshot.val().facilitator].name)
            }
        })
        onValue(ref(database, 'journals/' + props.route.params.journal.id + "/feedback"), (snapshot) => {
            if (snapshot.exists()) {
                setFeedback(snapshot.val())
                setFeedbackDates(Object.keys(snapshot.val()))
            }
        }
        )
    }, []);
    const navigateJourny = (entryDate) => {
        onValue(ref(database, 'journals/' + props.route.params.journal.id + '/journys/' + entryDate), snapshot => {
            props.navigation.navigate("JournyScreen", { team: props.route.params.team, user: props.route.params.user, journal: props.route.params.journal, journy: snapshot.val(), entryDate: entryDate })
        })
    }
    const renderAffirmation = (fBack, entryDate) => {
        return (
            <View style={{ borderWidth: 2, backgroundColor: Colors.popUpBackground, width: '100%', marginBottom: 20 }}>
                <View style={{ display: 'flex', flexDirection: 'row', padding: 10, justifyContent: 'space-between' }}>
                    <Image style={{ width: 60, height: 60 }} source={affirmationIcon} />
                    <View style={{ width: 150 }}>
                        <Tappable
                            onPress={() => navigateJourny(entryDate)}
                            text="See Journy"
                            type="normal"
                            fontSize={30}
                        />
                    </View>
                </View>
                <Text style={[styles.text, { fontSize: 30 }]}>{fBack["affirmation"]}</Text>
            </View>
        )
    }
    const renderDiscussion = (fBack, entryDate) => {
        return (
            <View style={{ borderWidth: 2, backgroundColor: Colors.popUpBackground, width: '100%', marginBottom: 20 }}>
                <View style={{ display: 'flex', flexDirection: 'row', padding: 10, justifyContent: 'space-between' }}>
                    <Image style={{ width: 60, height: 60 }} source={discussionIcon} />
                    <View style={{ width: 150 }}>
                        <Tappable
                            text="See Journy"
                            onPress={() => navigateJourny(entryDate)}
                            type="normal"
                            fontSize={30}
                        />
                    </View>
                </View>
                <Text style={[styles.text, { fontSize: 30 }]}>Hi team, in your next meeting I would like you to discuss your {fBack["communication"] && 'communication,'} {fBack["goals"] && 'goal setting,'}{fBack["performance"] && 'performance,'}{fBack["quality"] && 'quality of work,'}{fBack["attitude"] && 'attitude,'}{fBack["reason"] && `because ${fBack["reason"]}`}</Text>

            </View>
        )
    }
    const renderFreeFeedback = (fBack, entryDate) => {
        return (
            <View style={{ borderWidth: 2, backgroundColor: Colors.popUpBackground, width: '100%', marginBottom: 20 }}>
                <View style={{ display: 'flex', flexDirection: 'row', padding: 10, justifyContent: 'space-between' }}>
                    <Image style={{ width: 60, height: 60 }} source={freeFeedback} />
                    <View style={{ width: 150 }}>
                        <Tappable
                            text="See Journy"
                            onPress={() => navigateJourny(entryDate)}
                            type="normal"
                            fontSize={30}
                        />
                    </View>
                </View>
                <Text style={[styles.text, { fontSize: 30 }]}>{fBack["feedback"]}</Text>
            </View>
        )
    }
    const renderFeedback = feedbackDates.map((entryDate) => {
        var feedbackObjects = feedback[entryDate]
        console.log(Object.keys(feedbackObjects))
        return (
            <View>
                {Object.keys(feedbackObjects).map((fKey, idx) => {
                    var fBack = feedbackObjects[fKey]
                    return (
                        <View key={idx} style={{ borderRadius: 20, overflow: "hidden", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <View style={{ width: '100%', padding: 10, backgroundColor: '#aecfb3' }}>
                                <Text style={[styles.text, { textAlign: 'left', fontSize: 30 }]}>{entryDate}</Text>
                            </View>
                            {fBack["type"] == 'affirmation' && renderAffirmation(fBack, entryDate)}
                            {fBack["type"] == 'discussion_points' && renderDiscussion(fBack, entryDate)}
                            {fBack["type"] == 'free' && renderFreeFeedback(fBack, entryDate)}
                        </View>
                    )
                })}
            </View>
        )

    })
    return (
        <View style={[styles.container, { backgroundColor: '#ece8d6' }]}>
            <ImageBackground source={mountain} resizeMode="stretch" style={[styles.image]}>
                <Text style={[styles.text, { top: 50, fontSize: 40 }]}>{facilitatorName}'s feedback</Text>
                <View style={{ top: 130 }}>
                    <ScrollView>
                        {feedbackDates.length > 0 ? renderFeedback : <Text style={styles.text}>No feedback yet!</Text>}
                    </ScrollView>
                </View>

            </ImageBackground>
        </View>

    );
}