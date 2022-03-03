import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import home from '../assets/backgrounds/littleMountains.png'
import Tappable from "../components/tappable";
import exStyles from "../Styles";

import pink from '../assets/backgrounds/pinkBackground.png'
import purple from '../assets/backgrounds/purpleBlueBackground.png'
import orange from '../assets/backgrounds/orangeBackground.png'
import green from '../assets/backgrounds/greenBackground.png'

export default function PromptTypeScreen(props) {
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
    
    return (
        <View style={styles.container}>
            <ImageBackground source={home} resizeMode="stretch" style={exStyles.image}>
                <Text style={exStyles.text}> What do you want to write about? </Text>
                <Tappable 
                    onPress={() => props.navigation.navigate("WritingPromptScreen", {journal: props.journal, promptObject: prompts.productivity})}
                    text="Productivity"
                    type="normal"
                    borderColor="white"
                    backgroundColor="pink"
                />
                <Tappable 
                    onPress={() => props.navigation.navigate("WritingPromptScreen", {journal: props.journal, promptObject: prompts.mood})}
                    text="Mood"
                    type="normal"
                    borderColor="white"
                    backgroundColor="orange"
                />
                <Tappable 
                    onPress={() => props.navigation.navigate("WritingPromptScreen", {journal: props.journal, promptObject: prompts.communication})}
                    text="Communication"
                    type="normal"
                    borderColor="white"
                    backgroundColor="lavender"
                />
                <Tappable 
                    onPress={() => props.navigation.navigate("WritingPromptScreen", {journal: props.journal, promptObject: prompts.free})}
                    text="Free Journal"
                    type="normal"
                    borderColor="white"
                    backgroundColor="teal"
                />

            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
