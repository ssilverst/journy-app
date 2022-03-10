import styles from "../Styles";
import { View, Text, Image } from 'react-native';
import { useState, useEffect } from "react";
const TeamRating = (props)  => {
    const [avgs, setAvgs] = useState(null)
    const [you, setYou] = useState(null)
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
            setYou({
                "communication": findFace(props.journy["rating"]["communication"][props.user]),
                "productivity": findFace(props.journy["rating"]["productivity"][props.user]),
                "teamwork": findFace(props.journy["rating"]["teamwork"][props.user])
            })
        }
    }, [props.journy]);

    return (
        <View>
                {avgs &&
                    <View style={{ borderRadius: 20, padding: 10 }}>
                        <View style={{ display: 'flex', flexDirection: 'row', }}>
                            <View style={{ display: 'flex', flexDirection: 'column', }}>
                                <Text style={[styles.text, { height: 30, margin: 8, marginBottom: -10, fontSize: 20, textAlign: 'left' }]}></Text>
                                <Text style={[styles.text, { height: 30, margin: 8, fontSize: 30, textAlign: 'left' }]}>Communication: </Text>
                                <Text style={[styles.text, { height: 30, margin: 8, fontSize: 30, textAlign: 'left' }]}>Productivity: </Text>
                                <Text style={[styles.text, { height: 30, margin: 8, fontSize: 30, textAlign: 'left' }]}>Overall Teamwork: </Text>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <Text style={[styles.text, { height: 30, margin: 8, marginBottom: -10, fontSize: 20, textAlign: 'center' }]}>TEAM</Text>
                                <Image resizeMode="cover"
                                    style={{ width: 30, margin: 8, marginRight: 20, height: 30, }} source={avgs["communication"]} />
                                <Image resizeMode="cover"
                                    style={{ width: 30, margin: 8, marginRight: 20, height: 30 }} source={avgs["productivity"]} />
                                <Image resizeMode="cover"
                                    style={{ width: 30, margin: 8, marginRight: 20, height: 30 }} source={avgs["teamwork"]} />

                            </View>
                            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <Text style={[styles.text, { height: 30, margin: 8, marginBottom: -10, fontSize: 20, textAlign: 'center' }]}>YOU</Text>
                                <Image resizeMode="cover"
                                    style={{ width: 30, margin: 8, marginRight: 20, height: 30, }} source={you["communication"]} />
                                <Image resizeMode="cover"
                                    style={{ width: 30, margin: 8, marginRight: 20, height: 30 }} source={you["productivity"]} />
                                <Image resizeMode="cover"
                                    style={{ width: 30, margin: 8, marginRight: 20, height: 30 }} source={you["teamwork"]} />
                            </View>
                        </View>
                    </View>

                }
        </View>

    );
}

export default TeamRating;

