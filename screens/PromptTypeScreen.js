import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import home from '../assets/backgrounds/littleMountains.png'
import Tappable from "../components/tappable";
import exStyles from "../Styles";
import prompts from "../components/prompts"

export default function PromptTypeScreen(props) {
    return (
        <View style={styles.container}>
            <ImageBackground source={home} resizeMode="stretch" style={exStyles.image}>
                <Text style={[exStyles.text, {fontSize: 30, position: 'absolute', top: 30}]}> What do you want to write about? </Text>
                <Tappable 
                    onPress={() => props.navigation.navigate("PromptSelectorScreen", {journal: props.route.params.journal, entryDate: props.route.params.entryDate, user: props.route.params.user, journyPath: props.route.params.journyPath, prompts: "productivity"})}
                    text="PRODUCTIVITY"
                    type="normal"
                    borderColor="white"
                    backgroundColor="#eec87c"
                />
                <Tappable 
                    onPress={() => props.navigation.navigate("PromptSelectorScreen", {journal: props.route.params.journal, entryDate: props.route.params.entryDate, user: props.route.params.user, journyPath: props.route.params.journyPath, prompts: "mood"})}
                    text="MOOD"
                    type="normal"
                    borderColor="white"
                    backgroundColor="#f7c2d8"
                />
                <Tappable 
                    onPress={() => props.navigation.navigate("PromptSelectorScreen", {journal: props.route.params.journal, entryDate: props.route.params.entryDate, user: props.route.params.user, journyPath: props.route.params.journyPath, prompts: "communication"})}
                    text="COMMUNICATION"
                    type="normal"
                    borderColor="white"
                    backgroundColor="#c5b3ef"
                />
                <Tappable 
                    onPress={() => props.navigation.navigate("WritingPromptScreen", {
                        journal: props.route.params.journal, entryDate: props.route.params.entryDate, 
                        user: props.route.params.user, journyPath: props.route.params.journyPath, 
                        promptObject: {image: prompts["free"].image, prompt: prompts["free"].prompts[0], promptType: 'free'}})}
                    text="FREE JOURNAL"
                    type="normal"
                    borderColor="white"
                    backgroundColor="#a8d3c0"
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
