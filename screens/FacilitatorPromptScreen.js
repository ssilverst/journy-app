import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import home from '../assets/backgrounds/littleMountains.png'
import Tappable from "../components/tappable";
import exStyles from "../Styles";
import prompts from "../components/prompts";
import {Colors} from "../Colors";

export default function FacilitatorPromptScreen(props) {
    return (
        <View style={exStyles.container}>
            <ImageBackground source={home} resizeMode="stretch" style={exStyles.image}>
                <Text style={[exStyles.text, {fontSize: 30, position: 'absolute', top: 30}]}> How would you like to give feedbck to your team? </Text>
                
                <Tappable 
                    onPress={() => props.navigation.navigate("AffirmationsScreen", {
                        journal: props.route.params.journal, 
                        entryDate: props.route.params.entryDate, 
                        user: props.route.params.user, 
                        journyPath: props.route.params.journyPath, 
                        prompts: "communication"})}
                    text="WORDS OF AFFIRMATION"
                    type="normal"
                    borderColor="white"
                    backgroundColor="#eec87c"
                />
                <Tappable 
                    onPress={() => props.navigation.navigate("WritingPromptScreen", {
                        journal: props.route.params.journal, 
                        entryDate: props.route.params.entryDate, 
                        user: props.route.params.user, 
                        journyPath: props.route.params.journyPath, 
                        promptObject: {image: prompts["free"].image, prompt: prompts["free"].prompts[0], promptType: 'free'}})}
                    text="Draft You Own"
                    type="normal"
                    borderColor="white"
                    backgroundColor="#a8d3c0"
                />

            </ImageBackground>
        </View>
    );
}