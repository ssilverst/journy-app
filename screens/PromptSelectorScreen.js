import {View, Text, ImageBackground} from 'react-native';
import {useState} from 'react';
import Tappable from '../components/tappable';

import exStyles from "../Styles"
import prompts from "../components/prompts"

export default function PromptSelectorScreen(props) {

    const background = prompts[props.route.params.prompts].image;
    const questions = prompts[props.route.params.prompts].prompts;

    const [curPrompt, setCurPrompt] = useState(questions[0]);
    const [curI, setCurI] = useState(1);
    console.log(questions.length);
    return (
        <View style={exStyles.container}>
            <ImageBackground source={background} resizeMode="stretch" style={exStyles.image}>
                <Text style={[exStyles.text, {fontSize: 30}]}> "{curPrompt}" </Text>
                <View style={{display: 'flex', width: '100%', flexDirection: 'row', justifyContent: 'space-evenly'}}>
                    <Tappable 
                        onPress={() => {
                            setCurI(curI + 1);
                            setCurPrompt(questions[curI % questions.length]);
                            console.log(curPrompt);
                            console.log(curI);
                        }}
                        text="Next"
                        type="normal"
                        fontSize={30}
                        borderColor="black"
                    />
                    <Tappable 
                        onPress={() => {
                            setCurI(curI - 1);
                            setCurPrompt(questions[curI % questions.length]);
                            console.log(curPrompt);
                            console.log(curI);
                        }}
                        text="Previous"
                        type="normal"
                        fontSize={30}
                        borderColor="black"
                    />
                    <Tappable 
                        onPress = {() => {
                            const promptObject = {
                                "image": background,
                                "prompt": curPrompt,
                                "promptType": props.route.params.prompts
                            }
                            props.navigation.navigate("WritingPromptScreen", {journal: props.route.params.journal, entryDate: props.route.params.entryDate, user: props.route.params.user, journyPath: props.route.params.journyPath, promptObject: promptObject})
                        }}
                        text= "Use Prompt"
                        type= "normal"
                        fontSize={30}
                        borderColor="black"
                    />
                </View>


            </ImageBackground>
        </View>
    );
}