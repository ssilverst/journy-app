import { StyleSheet, Keyboard, Text, Alert, View, TouchableOpacity, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import { useState, useEffect } from 'react';
import mountain from '../assets/backgrounds/littleMountains.png';
import database from "../config/firebase";
import { ref, onValue } from "firebase/database";
import pink from '../assets/backgrounds/pinkBackground.png'
import purple from '../assets/backgrounds/purpleBlueBackground.png'
import orange from '../assets/backgrounds/orangeBackground.png'
import green from '../assets/backgrounds/greenBackground.png'
import Tappable from '../components/tappable';

export default function HomeScreenTeamMember(props) {
    const prompts = {
        'mood': 
        {
            'image': pink,
            'prompt': 'How did you feel after today’s meeting?'
        },
        'communication':
        {
            'image': purple,
            'prompt': 'What can be improved about the team’s communication?'
        },
        'productivity':
        {
            'image': orange,
            'prompt': 'What were your biggest breakthroughs today?'
        },
        'free': 
        {
            'image': green,
            'prompt': 'The space is yours!'
        }
    }
    const [recentJourny, setRecentJourny] = useState(null)
    useEffect(() => {
        if (props.route.params.journal.entry) {
            setRecentJourny(props.route.params.journal.entry.recent)
        }
    }, []);
    
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <ImageBackground source={mountain} resizeMode="stretch" style={styles.image}>
                    {recentJourny ? <Text>displaying recent journy</Text> : props.navigation.navigate("WritingPromptScreen", {journal: props.journal, promptObject: prompts.mood})}
                    <TouchableOpacity><Tappable  onPress={() => props.navigation.navigate("PromptTypeScreen", {journal: props.journal})}
                    text="New Entry"
                    type="normal"/></TouchableOpacity>
                </ImageBackground>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
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