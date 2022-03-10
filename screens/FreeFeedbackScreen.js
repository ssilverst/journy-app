import { View, Keyboard, ImageBackground, TouchableWithoutFeedback, Alert } from 'react-native';

import { useState } from 'react';
import database from "../config/firebase";

import exStyles from "../Styles";
import grayBackground from '../assets/backgrounds/grayBackground.png'
import { TextInput } from 'react-native-gesture-handler';
import Tappable from '../components/tappable';
import { set, ref } from 'firebase/database';
import { v4 as uuidv4 } from "uuid";
export default function FreeFeedback(props) {
    const [response, setResponse] = useState(null)
    const [topic, setTopic] = useState(null)
    const FEEDBACK_ID = uuidv4();

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <ImageBackground source={grayBackground} resizeMode="stretch" style={exStyles.image}>
                <View >
                    <TextInput
                        style={{ padding: 10, borderRadius: 20, width: 320, borderWidth: 1, fontSize: 30, fontFamily: 'CreamShoes', textAlignVertical: 'top' }}
                        onChangeText={setTopic}
                        multiline={true}
                        numberOfLines={2}
                        value={topic}
                        maxLength={100}
                        placeholder='Add a topic...'
                    />
                </View>
                <View style={{ marginTop: 30 }}>
                    <TextInput
                        style={{ padding: 10, width: 320, borderRadius: 20, borderWidth: 1, fontSize: 30, fontFamily: 'CreamShoes', textAlignVertical: 'top' }}
                        onChangeText={setResponse}
                        multiline={true}
                        numberOfLines={6}
                        value={response}
                        placeholder='Write your message here...'
                    />
                </View>
                <Tappable
                    text="SEND FEEDBACK"
                    onPress={() => {
                        if (!response) {
                            Alert.alert("What feedback do you have for your team?")
                        }
                        else {
                            const feedback = {
                                'type': 'free',
                                'feedback': response,
                                'topic': topic
                            }
                            set(ref(database, "journals/" + props.route.params.journal.id + "/journys/" + props.route.params.entryDate + "/feedback/" + FEEDBACK_ID), feedback)
                            set(ref(database, "journals/" + props.route.params.journal.id + "/feedback/" + props.route.params.entryDate + '/' + FEEDBACK_ID), feedback)

                            props.navigation.navigate("SentFeedbackScreen", { journal: props.route.params.journal, user: props.route.params.user })
                        }
                    }}
                    type="normal" />
            </ImageBackground>

        </TouchableWithoutFeedback>
    );
}