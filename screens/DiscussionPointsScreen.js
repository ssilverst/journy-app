import { View, Text, Keyboard, ImageBackground, TouchableWithoutFeedback, Alert } from 'react-native';
import BouncyCheckbox from "react-native-bouncy-checkbox";

import { useState } from 'react';
import database from "../config/firebase";

import exStyles from "../Styles";
import grayBackground from '../assets/backgrounds/grayBackground.png'
import styles from '../Styles';
import { TextInput } from 'react-native-gesture-handler';
import Tappable from '../components/tappable';
import { set, ref } from '@firebase/database';
import { v4 as uuidv4 } from "uuid";

export default function DiscussionPoints(props) {
    const [performance, setPerformance] = useState(false)
    const [quality, setQuality] = useState(false)
    const [attitude, setAttitude] = useState(false)
    const [communication, setCommunication] = useState(false)
    const [goals, setGoals] = useState(false)
    const [reason, setReason] = useState(null)
    const FEEDBACK_ID = uuidv4();

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <ImageBackground source={grayBackground} resizeMode="stretch" style={exStyles.image}>
                <View style={{ top: 20, }} ><Text style={[styles.text, { fontSize: 40 }]}>"Hi Team, in your next meeting I'd like you to discuss your...</Text></View>
                <View style={{ display: 'flex', marginTop: 30 }}>
                    <BouncyCheckbox
                        size={25}
                        fillColor="#83c1da"
                        unfillColor="#FFFFFF"
                        text="Performance"
                        iconStyle={{ borderColor: "#83c1da" }}
                        textStyle={{ fontFamily: "CreamShoes", textDecorationLine: 'none', fontSize: 35, color: 'black' }}
                        onPress={() => setPerformance(!performance)}
                    />
                    <BouncyCheckbox
                        size={25}
                        fillColor="#83c1da"
                        unfillColor="#FFFFFF"
                        text="Quality of Work"
                        iconStyle={{ borderColor: "#83c1da" }}
                        textStyle={{ fontFamily: "CreamShoes", textDecorationLine: 'none', fontSize: 35, color: 'black' }}
                        onPress={() => setQuality(!quality)}
                    /><BouncyCheckbox
                        size={25}
                        fillColor="#83c1da"
                        unfillColor="#FFFFFF"
                        text="Attitude"
                        iconStyle={{ borderColor: "#83c1da" }}
                        textStyle={{ fontFamily: "CreamShoes", textDecorationLine: 'none', fontSize: 35, color: 'black' }}
                        onPress={() => setAttitude(!attitude)}
                    /><BouncyCheckbox
                        size={25}
                        fillColor="#83c1da"
                        unfillColor="#FFFFFF"
                        text="Communication"
                        iconStyle={{ borderColor: "#83c1da" }}
                        textStyle={{ fontFamily: "CreamShoes", textDecorationLine: 'none', fontSize: 35, color: 'black' }}
                        onPress={() => setCommunication(!communication)}
                    /><BouncyCheckbox
                        size={25}
                        fillColor="#83c1da"
                        unfillColor="#FFFFFF"
                        text="Goal Setting"
                        iconStyle={{ borderColor: "#83c1da" }}
                        textStyle={{ fontFamily: "CreamShoes", textDecorationLine: 'none', fontSize: 35, color: 'black' }}
                        onPress={() => setGoals(!goals)}
                    />
                </View>
                <View style={{ marginTop: 30 }}>
                    <TextInput
                        style={{ padding: 10, width: 320, borderRadius: 20, borderWidth: 1, fontSize: 30, fontFamily: 'CreamShoes', textAlignVertical: 'top' }}
                        onChangeText={setReason}
                        multiline={true}
                        numberOfLines={2}
                        value={reason}
                        placeholder='because...'
                    />
                </View>
            <Tappable 
                text="SEND FEEDBACK"
                onPress={() => {
                    if (!performance && !quality && !attitude && !communication && !goals && !reason){
                        Alert.alert("What feedback do you have for your team?")
                    }
                    else {
                        const feedback = {
                            'type': 'discussion_points',
                            'performance': performance, 
                            'communication': communication,
                            'quality': quality,
                            'goals': goals,
                            'attitude': attitude,
                            'reason': reason
                        }
                        set(ref(database, "journals/" + props.route.params.journal.id + "/journys/" + props.route.params.entryDate + "/feedback/" + FEEDBACK_ID), feedback)

                        set(ref(database, "journals/" + props.route.params.journal.id + "/feedback/" + props.route.params.entryDate + '/' + FEEDBACK_ID), feedback)

                        props.navigation.navigate("SentFeedbackScreen", {journal: props.route.params.journal, user: props.route.params.user})
                    }
                }}
                type="normal" />
            </ImageBackground>

        </TouchableWithoutFeedback>
    );
}