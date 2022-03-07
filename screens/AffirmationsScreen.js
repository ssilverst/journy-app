import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import Tappable from '../components/tappable';
import { AntDesign } from '@expo/vector-icons';
import exStyles from "../Styles";
import orange from "../assets/backgrounds/orangeBackground.png";

export default function AffirmationsScreen(props) {

    const questions = [
        "You are doing great!",
        "Keep up the good work",
        "I'm really impressed with your outstanding work ethic."
    ];

    const [curPrompt, setCurPrompt] = useState(questions[0]);
    const [curI, setCurI] = useState(1);
    console.log(questions.length);
    return (
        <View style={exStyles.container}>
            <ImageBackground source={orange} resizeMode="stretch" style={exStyles.image}>
                
                <View style={{ alignItems: "center", display: 'flex', height: '25%', width: '90%', flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: '5%' }}>
                    <TouchableOpacity
                        onPress={() => {
                            if (curI == 0) {
                                setCurI(questions.length - 1);
                            } else {
                                setCurI(curI - 1);
                            }
                            setCurPrompt(questions[curI % questions.length]);
                            console.log(curPrompt);
                            console.log(curI);
                        }}>
                        <AntDesign name="leftcircleo" size={35} color="black" />
                    </TouchableOpacity>
                    <Text style={[exStyles.text, { fontSize: 30, width:"70%" }]}> "{curPrompt}" </Text>
                    <TouchableOpacity
                        onPress={() => {
                            setCurI(curI + 1);
                            setCurPrompt(questions[curI % questions.length]);
                            console.log(curPrompt);
                            console.log(curI);
                        }}>
                        <AntDesign name="rightcircleo" size={35} color="black" />
                    </TouchableOpacity>
                </View>
                <View>
                    <Tappable
                        onPress={() => {
                            /*const promptObject = {
                                "image": background,
                                "prompt": curPrompt,
                                "promptType": props.route.params.prompts
                            }*/

                            // TODO: Record affirmation into the database


                            props.navigation.navigate("HomeScreenTeamMember", {journal: props.route.params.journal})
                            //props.navigation.navigate("WritingPromptScreen", { journal: props.route.params.journal, entryDate: props.route.params.entryDate, user: props.route.params.user, journyPath: props.route.params.journyPath, promptObject: promptObject })
                        }}
                        text="Use Affirmation"
                        type="normal"
                        fontSize={30}
                        borderColor="black"
                    />
                </View>


            </ImageBackground>
        </View>
    );
}