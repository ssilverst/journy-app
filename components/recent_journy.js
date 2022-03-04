import styles from "../Styles";
import { View, Text, Image, StyleSheet } from 'react-native';
import database from "../config/firebase";
import { set, ref } from "firebase/database";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useState, useEffect } from "react";
const RecentJourny = (props) => {
    const keys = Object.keys(props.journy)
    const [avgs, setAvgs] = useState(null)
    const backgroundDict = {
        "mood": '#f7c2d8',
        "productivity": "#eec87c",
        "communication": "#c5b3ef",
        "free": "#a8d3c0"
    }
    const findFace = (average) => {
        if (average < 0.3) return require("../assets/faces/face0.png")
        if (average < 0.5) return require("../assets/faces/face1.png")
        if (average < 0.7) return require("../assets/faces/face2.png")
        if (average < 0.9) return require("../assets/faces/face3.png")
        else return require("../assets/faces/face4.png")
    }
    useEffect(() => {
        if (props.journy["rating"]) {

            const averages = []
            var commRatings = Object.values(props.journy["rating"]["communication"])
            var total = 0
            for (var i = 0; i < commRatings.length; i++) {
                total += commRatings[i];
            }
            var avg = (total / commRatings.length)

            averages["communication"] = findFace(avg)
            var prodRatings = Object.values(props.journy["rating"]["productivity"])
            total = 0
            for (var i = 0; i < prodRatings.length; i++) {
                total += prodRatings[i];
            }
            avg = (total / prodRatings.length)
            averages["productivity"] = findFace(avg)

            var teamRatings = Object.values(props.journy["rating"]["teamwork"])
            total = 0
            for (var i = 0; i < teamRatings.length; i++) {
                total += teamRatings[i];
            }
            avg = (total / teamRatings.length)
            averages["teamwork"] = findFace(avg)
            setAvgs(averages)
        }
    }, []);
    return (
        <View>
            <View style={{ borderRadius: 10, backgroundColor: '#fcf2d9', shadowColor: 'black', padding: 10, borderWidth: 3, borderColor: 'black' }}>
                <Text style={[styles.text, { fontSize: 30, textDecorationLine: 'underline' }]}>Journy on {props.entryDate}</Text>
                {avgs &&
                    <View>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <Text style={[styles.text, { fontSize: 30, textAlign: 'left' }]}>Communication: </Text>
                                <Image resizeMode="cover"
                                    style={{ width: 30, margin: 8, height: 30, }} source={avgs["communication"]} />
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <Text style={[styles.text, { fontSize: 30, textAlign: 'left' }]}>Productivity: </Text>
                                <Image resizeMode="cover"
                                    style={{ width: 30, margin: 8, height: 30 }} source={avgs["productivity"]} />
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <Text style={[styles.text, { fontSize: 30, textAlign: 'left' }]}>Overall Teamwork: </Text>
                                <Image resizeMode="cover"
                                    style={{ width: 30, margin: 8, height: 30 }} source={avgs["teamwork"]} />
                            </View>
                        </View>}


                <View style={{ width: 280, display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <View style={{ width: 130, height: 150, borderRadius: 10, overflow: 'hidden', backgroundColor: backgroundDict[props.journy[keys[0]]["type"]] }}>
                        <Text style={[styles.text, { padding: 5, fontSize: 22, textAlign: 'left' }]}>{props.journy[keys[0]]["writing-response"]}</Text>
                    </View>
                    {keys.length > 1 &&
                        <View style={{ width: 130, height: 150, borderRadius: 10, overflow: 'hidden', backgroundColor: backgroundDict[props.journy[keys[1]]["type"]] }}>
                            <Text style={[styles.text, { padding: 5, fontSize: 22, textAlign: 'left' }]}>{props.journy[keys[1]]["writing-response"]}</Text>
                        </View>}
                </View>

            </View>
        </View>

    );
}

export default RecentJourny;

