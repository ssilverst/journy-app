import { StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import home from '../assets/backgrounds/littleMountains.png'
import Tappable from "../components/tappable";
import exStyles from "../Styles";

export default function PromptTypeScreen(props) {
    
    return (
        <View style={styles.container}>
            <ImageBackground source={home} resizeMode="stretch" style={exStyles.image}>
                <Text style={exStyles.text}> What do you want to write about? </Text>
                <Tappable 
                    onPress={() => props.navigation.navigate("PromptSelectorScreen", {journal: props.journal, prompts: "productivity"})}
                    text="Productivity"
                    type="normal"
                    borderColor="white"
                    backgroundColor="orange"
                />
                <Tappable 
                    onPress={() => props.navigation.navigate("PromptSelectorScreen", {journal: props.journal, prompts: "mood"})}
                    text="Mood"
                    type="normal"
                    borderColor="white"
                    backgroundColor="pink"
                />
                <Tappable 
                    onPress={() => props.navigation.navigate("PromptSelectorScreen", {journal: props.journal, prompts: "communication"})}
                    text="Communication"
                    type="normal"
                    borderColor="white"
                    backgroundColor="lavender"
                />
                <Tappable 
                    onPress={() => props.navigation.navigate("PromptSelectorScreen", {journal: props.journal, prompts: "free"})}
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
