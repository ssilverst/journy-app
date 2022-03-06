import styles from "../Styles";
import { View, Text, Image, ImageBackground } from 'react-native';
import TeamRating from "./teamRating";
import pink from '../assets/backgrounds/pinkBackground.png'
import purple from '../assets/backgrounds/purpleBlueBackground.png'
import orange from '../assets/backgrounds/orangeBackground.png'
import green from '../assets/backgrounds/greenBackground.png'

import { useState, useEffect } from "react";
const RecentJourny = (props) => {
    const keys = Object.keys(props.journy)
    const backgroundDict = {
        "mood": pink,
        "productivity": orange,
        "communication": purple,
        "free": green
    }
    const [checkRatings, setCheckRatings] = useState(false)
    const formatDate = (entryDate) => {
        return entryDate.replace(/_/g, "/")
    }
    useEffect(() => {
        console.log(props.journy)
        setCheckRatings(false)
        if (props.journy["rating"])
        {
            console.log('okay so far so good')
            if (props.journy["rating"]["communication"] && props.journy["rating"]["productivity"] && props.journy["rating"]["teamwork"])
            { 
                console.log('great!')
                setCheckRatings(true)
            }
        }
    }, [props.journy]);
    return (
        <View>
            <View style={{ borderRadius: 10, backgroundColor: '#fcf2d9', alignItems: 'center', shadowColor: 'black', padding: 10, borderWidth: 3, borderColor: 'black' }}>
                <Text style={[styles.text, { fontSize: 35, marginBottom: 10, textDecorationLine: 'underline' }]}>Journy on {formatDate(props.entryDate)}</Text>
                {checkRatings && <TeamRating user={props.user} journy={props.journy} />}

                <View style={{ height: 1, width: '100%', backgroundColor: 'black' }}></View>
                <View style={{ width: 300, marginTop: 20,  display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <ImageBackground source={backgroundDict[props.journy[keys[0]]["type"]]} style={{
                        width: 130, height: 150, borderRadius: 10, overflow: 'hidden',
                    }}>
                        <Text style={[styles.text, { padding: 5, fontSize: 30, textAlign: 'left' }]}>{props.journy[keys[0]]["writing-response"]}</Text>
                    </ImageBackground>
                    {keys.length > 1 &&
                        <ImageBackground source={backgroundDict[props.journy[keys[1]]["type"]]} style={{ width: 130, height: 150, borderRadius: 10, overflow: 'hidden' }}>
                            <Text style={[styles.text, { padding: 5, fontSize: 30, textAlign: 'left' }]}>{props.journy[keys[1]]["writing-response"]}</Text>
                        </ImageBackground>}
                </View>

            </View>
        </View>

    );
}

export default RecentJourny;

