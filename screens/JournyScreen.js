import styles from "../Styles";
import { View, Text, ImageBackground, ScrollView } from 'react-native';
import mountain from '../assets/backgrounds/littleMountains.png';
import TeamRating from "../components/teamRating";
import pink from '../assets/backgrounds/pinkBackground.png'
import purple from '../assets/backgrounds/purpleBlueBackground.png'
import orange from '../assets/backgrounds/orangeBackground.png'
import green from '../assets/backgrounds/greenBackground.png'
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState, useEffect } from "react";
import Tappable from "../components/tappable";
import { Colors } from "../Colors";

export default function JournyScreen(props) {
    const keys = Object.keys(props.route.params.journy)
    const [checkRatings, setCheckRatings] = useState(false)
    const backgroundDict = {
        "mood": pink,
        "productivity": orange,
        "communication": purple,
        "free": green
    }
    const formatDate = (entryDate) => {
        if (entryDate) return entryDate.replace(/_/g, "/")
        return null
    }
    useEffect(() => {
        if (props.route.params.journy["rating"]) {
            if (props.route.params.journy["rating"]["communication"] && props.route.params.journy["rating"]["productivity"] && props.route.params.journy["rating"]["teamwork"]) { setCheckRatings(true) }
        }
    }, [props.route.params.journy]);
    const renderResponses = keys.map((entry, idx) => {
        if (entry != "rating" && entry != "entry-date" && entry != "feedback") {
            return (
                <TouchableOpacity onPress={() => props.navigation.navigate("EntryScreen", { team: props.route.params.team, entry: props.route.params.journy[entry], journal: props.route.params.journal })} key={idx}>

                    <ImageBackground source={backgroundDict[props.route.params.journy[entry]["type"]]} style={{
                        width: 150, borderRadius: 10, maxHeight: 200, overflow: 'hidden', marginBottom: 20
                    }}>
                        <Text style={[styles.text, { padding: 5, fontSize: 30, textAlign: 'left' }]}>{props.route.params.journy[entry]["writing-response"]}</Text>
                        {props.route.params.journy[entry]["images"] && <Text style={[styles.text, {padding: 5, fontSize: 30, textAlign: 'center'}]}>Image posted</Text>}
                    </ImageBackground>
                </TouchableOpacity>
            )
        }
    })
    return (
        <View style={styles.container}>
            <ImageBackground source={mountain} resizeMode="stretch" style={styles.image}>
                <View style={{ position: 'absolute', top: 10 }}>
                    <Text style={[styles.text, { fontSize: 35 }]}>{props.route.params.journal.name}'s Journy on {formatDate(props.route.params.entryDate)}</Text>
                </View>
                <View style={{ backgroundColor: 'white', borderRadius: 20, position: 'absolute', top: 130 }} >
                    {checkRatings && <TeamRating user={props.route.params.user} journy={props.route.params.journy} />}
                </View>
                <View style={{ position: 'absolute', top: 340, height: 350 }}>
                    <ScrollView>
                        <View style={{ width: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                            {renderResponses}
                        </View>
                    </ScrollView>
                </View>
                {props.route.params.journal.facilitator == props.route.params.user ?
                <View style={{position: 'absolute', bottom: 0, width: '100%', display: 'flex', alignItems: 'center', color: Colors.defaultBackground}}>
                    <View style={{ opacity: 1, width: '70%'}}>
                        <Tappable
                            onPress={() => props.navigation.navigate("FacilitatorPromptScreen", {
                                entryDate: props.route.params.entryDate,
                                user: props.route.params.user,
                                journal: props.route.params.journal
                            })}
                            text="GIVE FEEDBACK"
                            type="normal"
                        />
                    </View>
                </View> :
                <View style={{position: 'absolute', bottom: 0, width: '100%', display: 'flex', alignItems: 'center', color: Colors.defaultBackground}}>
                    <View style={{ opacity: 1, width: '70%'}}>
                        <Tappable
                            onPress={() => props.navigation.navigate("FeedbackFacilitatorScreen", {
                                entryDate: props.route.params.entryDate,
                                user: props.route.params.user,
                                journal: props.route.params.journal
                            })}
                            text="VIEW FEEDBACK"
                            type="normal"
                        />
                    </View>
                </View>
                    }

            </ImageBackground>
        </View>

    );
}


