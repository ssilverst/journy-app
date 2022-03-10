import { View, Text, TextInput, ImageBackground, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useState } from 'react';
import Tappable from '../components/tappable';
import { AntDesign } from '@expo/vector-icons';
import styles from "../Styles";
import gray from '../assets/backgrounds/grayBackground.png'
import database from "../config/firebase";
import { ref, set, onValue } from "firebase/database";
import { v4 as uuidv4 } from "uuid";

export default function AffirmationsScreen(props) {
    const [affirmation, setAffirmation] = useState(null)
    const FEEDBACK_ID = uuidv4();

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

            <View style={styles.container}>
                <ImageBackground source={gray} resizeMode="stretch" style={styles.image}>
                    <View style={{ top: 20, }} ><Text style={[styles.text, { fontSize: 40 }]}>What words of affirmation do you have for your team?</Text></View>
                    <View style={{ marginTop: 30 }}>
                        <TextInput
                            style={{ padding: 10, width: 320, borderRadius: 20, borderWidth: 1, fontSize: 30, fontFamily: 'CreamShoes', textAlignVertical: 'top' }}
                            onChangeText={setAffirmation}
                            multiline={true}
                            numberOfLines={6}
                            value={affirmation}
                            placeholder='Write your thoughts here...'
                        />
                    </View>
                    <View>
                        <Tappable
                            onPress={() => {
                                if (!performance && !quality && !attitude && !communication && !goals && !reason) {
                                    Alert.alert("What feedback do you have for your team?")
                                }
                                else {
                                    const feedback = {
                                        'type': 'affirmation',
                                        'affirmation': affirmation
                                    }
                                    set(ref(database, "journals/" + props.route.params.journal.id + "/journys/" + props.route.params.entryDate + "/feedback/" + FEEDBACK_ID), feedback)
                                    set(ref(database, "journals/" + props.route.params.journal.id + "/feedback/" + props.route.params.entryDate + '/' + FEEDBACK_ID), feedback)

                                    props.navigation.navigate("SentFeedbackScreen", { journal: props.route.params.journal, user: props.route.params.user })
                                }
                            }}
                            text="SEND FEEDBACK"
                            type="normal"
                            fontSize={30}
                            borderColor="black"
                        />
                    </View>


                </ImageBackground>
            </View>
        </TouchableWithoutFeedback>

    );
}