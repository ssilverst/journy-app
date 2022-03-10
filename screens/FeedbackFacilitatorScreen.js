import styles from "../Styles";
import { View, Text, ImageBackground, ScrollView, Image } from 'react-native';
import gray from '../assets/backgrounds/grayBackground.png'
import { FontAwesome } from '@expo/vector-icons';
import { set, ref, onValue } from '@firebase/database';
import database from "../config/firebase";
import { useState, useEffect } from "react";
import discussionIcon from '../assets/icons/discussionIcon.png'
import affirmationIcon from '../assets/icons/affirmationIcon.png'
import freeFeedback from '../assets/icons/freeFeedbackIcon.png'
export default function FeedbackFacilitatorScreen(props) {
    const [feedback, setFeedback] = useState(null)
    const [facilitatorName, setFacilitatorName] = useState(null)
    const [feedbackKeys, setFeedbackKeys] = useState([])
    useEffect(() => {
        onValue(ref(database, 'journals/' + props.route.params.journal.id), snapshot => {

            if (snapshot.exists()) {
                setFacilitatorName(snapshot.val().users[snapshot.val().facilitator].name)
            }
        })
        onValue(ref(database, 'journals/' + props.route.params.journal.id + "/feedback/" + props.route.params.entryDate), (snapshot) => {
            if (snapshot.exists()) {
                setFeedback(snapshot.val())
                console.log(snapshot.feedback)
                setFeedbackKeys(Object.keys(snapshot.val()))
            }
        }

        )
    }, []);
    const renderAffirmation = (fBack) => {
        return (
            <View>
                <Image style={{ width: 60, height: 60 }} source={affirmationIcon} />
                <Text style={[styles.text, {fontSize: 50}]}>{fBack["affirmation"]}</Text>
            </View>
        )
    }
    const renderDiscussion = (fBack) => {
        return (
            <View>
                <Image style={{ width: 60, height: 60 }} source={discussionIcon} />
                <Text style={[styles.text, { fontSize: 50 }]}>Hi team, in your next meeting I would like you to discuss your {fBack["communication"] && 'communication,'} {fBack["goals"] && 'goal setting,'}{fBack["performance"] && 'performance,'}{fBack["quality"] && 'quality of work,'}{fBack["attitude"] && 'attitude,'}{fBack["reason"] && `because ${fBack["reason"]}`}</Text>
            </View>
        )
    }
    const renderFreeFeedback = (fBack) => {
        return (
            <View>
                <Image style={{width: 60, height: 60}} source={freeFeedback} />
                <Text style={[styles.text, {fontSize: 50}]}>{fBack["feedback"]}</Text>
            </View>
        )
    }
    return (
        <View style={[styles.container, { backgroundColor: '#ece8d6' }]}>
            <ImageBackground source={gray} resizeMode="stretch" style={[styles.image]}>
                <View style={{top: 50}}>
                    <ScrollView>
                        <Text style={styles.text}>{facilitatorName} says:</Text>
                        {feedback ? feedbackKeys.map((fKey, idx) => {
                            var fBack = feedback[fKey]
                            return (
                                <View key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {fBack["type"] == 'affirmation' && renderAffirmation(fBack)}
                                    {fBack["type"] == 'discussion_points' && renderDiscussion(fBack)}
                                    {fBack["type"] == 'free' && renderFreeFeedback(fBack)}
                                </View>
                            )
                        }) : <Text style={styles.text}>No feedback yet!</Text>}
                    </ScrollView>
                </View>
                <FontAwesome style={{ position: 'absolute', top: 40, left: 20 }} name="quote-left" size={40} color="white" />
                <FontAwesome style={{ position: 'absolute', bottom: 40, right: 20 }} name="quote-right" size={40} color="white" />
            </ImageBackground>
        </View>

    );
}