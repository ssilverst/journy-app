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
                        prompts: "communication"})}
                    text="WORDS OF AFFIRMATION"
                    type="normal"
                    borderColor="black"
                    backgroundColor="white"
                />
                <Tappable 
                    onPress={() => props.navigation.navigate("DiscussionPoints", {
                        journal: props.route.params.journal, 
                        entryDate: props.route.params.entryDate, 
                        user: props.route.params.user})}
                    text="DISCUSSION POINTS"
                    type="normal"
                    borderColor="black"
                    backgroundColor="white"
                />
                <Tappable 
                    onPress={() => props.navigation.navigate("FreeFeedback", {
                        journal: props.route.params.journal, 
                        entryDate: props.route.params.entryDate, 
                        user: props.route.params.user, 
                        })}
                    text="DRAFT YOUR OWN"
                    type="normal"
                    borderColor="black"
                    backgroundColor="white"
                />

            </ImageBackground>
        </View>
    );
}