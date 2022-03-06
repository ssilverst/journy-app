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
        return entryDate.replace(/_/g, "/")
    }
    useEffect(() => {
        if (props.route.params.journy["rating"])
        {
            if (props.route.params.journy["rating"]["communication"] && props.route.params.journy["rating"]["productivity"] && props.route.params.journy["rating"]["teamwork"])
            { setCheckRatings(true)}
        }
    }, [props.route.params.journy]);
    const renderResponses = keys.map((entry, idx) => {
        if (entry != "rating" && entry != "entry-date") {
            return (
                <TouchableOpacity onPress={() => props.navigation.navigate("EntryScreen", { team: props.route.params.team, entry: props.route.params.journy[entry], journal: props.route.params.journal})} key={idx}>

                    <ImageBackground source={backgroundDict[props.route.params.journy[entry]["type"]]} style={{
                        width: 150, borderRadius: 10, maxHeight: 200, overflow: 'hidden', marginBottom: 20
                    }}>
                        <Text style={[styles.text, { padding: 5, fontSize: 30, textAlign: 'left' }]}>{props.route.params.journy[entry]["writing-response"]}</Text>
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
                <View style={{ position: 'absolute', top: 340, height: 400 }}>
                    <ScrollView>
                        <View style={{ width: '100%', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
                            {renderResponses}
                        </View>
                    </ScrollView>
                </View>
            </ImageBackground>
        </View>

    );
}


