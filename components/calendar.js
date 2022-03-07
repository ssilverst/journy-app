import styles from "../Styles";
import { View, Text, Image } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { onValue, ref } from "@firebase/database";
import database from "../config/firebase";
export default function Calendar(props) {
    const { navigation, idx, team, monthsArrDict, monthsToNums, days, journal, user } = props
    const findFace = (average) => {
        if (average < 0.3) return require("../assets/faces/face0.png")
        if (average < 0.5) return require("../assets/faces/face1.png")
        if (average < 0.7) return require("../assets/faces/face2.png")
        if (average < 0.9) return require("../assets/faces/face3.png")
        else return require("../assets/faces/face4.png")
    }

    const checkIfFace = (day, keyIdx) => {
        const date = monthsArrDict[idx].split(",")
        const datePath = `${monthsToNums[date[0].trim()]}_${day}_${date[1].trim()}`
        var faceValue = null
        onValue(ref(database, "journals/" + journal.id + "/journys/" + datePath), (snapshot) => {
            faceValue = snapshot.val()
        })
        if (faceValue) {
            var teamRatings = Object.values(faceValue["rating"]["teamwork"])
            var total = 0
            var avg = 0
            for (var i = 0; i < teamRatings.length; i++) {
                total += teamRatings[i];
            }
            avg = (total / teamRatings.length)
        }
        return (
            <View>
                {faceValue ?
                    <TouchableOpacity key={keyIdx} onPress={() => navigation.navigate("JournyScreen", { team: team, journy: faceValue, journal: journal, user: user, entryDate: faceValue["entry-date"] })}>
                        <Image source={findFace(avg)} style={{ width: 30, height: 30, borderRadius: 15, borderWidth: 2 }} />
                    </TouchableOpacity>
                    : <View key={keyIdx} style={[{ width: 30, height: 30, borderRadius: 15, borderWidth: 2 }, day == ' ' ?
                        { backgroundColor: 'transparent', borderWidth: 0 } : { backgroundColor: '#ebe8d6' }]}></View>}
                <Text style={[styles.text, { fontSize: 20 }]}>{day}</Text>
            </View>
        )
    }
    const renderMonth = days.map((week) => {
        return (
            <View style={{ flexDirection: 'row', display: 'flex', }}>
                {week.map((day, idx) => {
                    return (
                        <View key={idx} style={{ margin: 4, marginBottom: 6 }}>
                            {checkIfFace(day, idx)}
                        </View>
                    )
                })}
            </View>
        )
    })
    return (
        <View>

            <View style={{ padding: 20, }}>
                {renderMonth}
            </View>
        </View>

    );
}


