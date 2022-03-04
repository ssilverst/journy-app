import {View, Text, ImageBackground} from 'react-native';
import {useState} from 'react';
import Tappable from '../components/tappable';

import exStyles from "../Styles"
import prompts from "../components/prompts"

export default function PromptSelectorScreen(props) {

    const background = prompts[props.route.params.prompts].image;
    const questions = prompts[props.route.params.prompts].prompts;

    const [curPrompt, setCurPrompt] = useState(questions[0]);
    const [curI, setCurI] = useState(0);
    console.log(questions.length);
    return (
        <View style={exStyles.container}>
            <ImageBackground source={background} resizeMode="stretch" style={exStyles.image}>
                <Text style={exStyles.text}> {curPrompt} </Text>
                <Tappable 
                    onPress={() => {
                        setCurI(curI + 1);
                        setCurPrompt(questions[curI % questions.length]);
                        console.log(curPrompt);
                        console.log(curI);
                    }}
                    text="Next Prompt"
                    type="normal"
                />
                <Tappable 
                    onPress = {() => {
                        const promptObject = {
                            "image": background,
                            "prompt": curPrompt,
                        }
                        props.navigation.navigate("WritingPromptScreen", {journal: props.journal, promptObject: promptObject})
                    }}
                    text= "Use Prompt"
                    type= "normal"
                />


            </ImageBackground>
        </View>
    );
}