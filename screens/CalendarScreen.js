import styles from "../Styles";
import { useState, useEffect } from "react";
import { View, Text, ImageBackground, ScrollView, Image } from 'react-native';
import gradient from '../assets/backgrounds/littleBarGradients.png';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { onValue, ref } from "@firebase/database";
import database from "../config/firebase";
export default function CalendarScreen(props) {
    const [team, setTeam] = useState(null)
    const months = {
        "2022": {
            "1": [
                [" ", " ", " ", " ", " ", " ", 1],
                [2, 3, 4, 5, 6, 7, 8],
                [9, 10, 11, 12, 13, 14, 15],
                [16, 17, 18, 19, 20, 21, 22],
                [23, 24, 25, 26, 27, 28, 29],
                [30, 31, " ", " ", " ", " ", " "]
            ],
            "2": [
                [" ", " ", 1, 2, 3, 4, 5],
                [6, 7, 8, 9, 10, 11, 12],
                [13, 14, 15, 16, 17, 18, 19],
                [20, 21, 22, 23, 24, 25, 26],
                [27, 28, " ", " ", " ", " ", " "]
            ],
            "3": [
                [" ", " ", 1, 2, 3, 4, 5],
                [6, 7, 8, 9, 10, 11, 12],
                [13, 14, 15, 16, 17, 18, 19],
                [20, 21, 22, 23, 24, 25, 26],
                [27, 28, 29, 30, 31, " ", " "],
            ],
            "4": [
                [" ", " ", " ", " ", " ", 1, 2],
                [3, 4, 5, 6, 7, 8, 9],
                [10, 11, 12, 13, 14, 15, 16],
                [17, 18, 19, 20, 21, 22, 23],
                [24, 25, 26, 27, 28, 29, 30],
            ],
            "5": [
                [1, 2, 3, 4, 5, 6, 7],
                [8, 9, 10, 11, 12, 13, 14],
                [15, 16, 17, 18, 19, 20, 21],
                [22, 23, 24, 25, 26, 27, 28],
                [29, 30, 31, " ", " ", " ", " "]
            ],
            "6": [
                [" ", " ", " ", 1, 2, 3, 4],
                [5, 6, 7, 8, 9, 10, 11],
                [12, 13, 14, 15, 16, 17, 18],
                [19, 20, 21, 22, 23, 24, 25],
                [26, 27, 28, 29, 30, " ", " "],
            ]
        },
        "2021": {
            "9": [
                [" ", " ", " ", 1, 2, 3, 4],
                [5, 6, 7, 8, 9, 10, 11],
                [12, 13, 14, 15, 16, 17, 18],
                [19, 20, 21, 22, 23, 24, 25],
                [26, 27, 28, 29, 30, " ", " "],
            ],
            "10": [
                [" ", " ", " ", " ", " ", 1, 2],
                [3, 4, 5, 6, 7, 8, 9],
                [10, 11, 12, 13, 14, 15, 16],
                [17, 18, 19, 20, 21, 22, 23],
                [24, 25, 26, 27, 28, 29, 30],
                [31, " ", " ", " ", " ", " ", " "]
            ],
            "11": [
                [" ", 1, 2, 3, 4, 5, 6],
                [7, 8, 9, 10, 11, 12, 13],
                [14, 15, 16, 17, 18, 19, 20],
                [21, 22, 23, 24, 25, 26, 27],
                [28, 29, 30, " ", " ", " ", " "]
            ],
            "12": [
                [" ", " ", " ", 1, 2, 3, 4],
                [5, 6, 7, 8, 9, 10, 11],
                [12, 13, 14, 15, 16, 17, 18],
                [19, 20, 21, 22, 23, 24, 25],
                [26, 27, 28, 29, 30, 31, " "],
            ]
        }
    }
    const numsToMonths = {
        "1": "January",
        "2": "February",
        "3": "March",
        "4": "April",
        "5": "May",
        "6": "June",
        "7": "July",
        "8": "August",
        "9": "September",
        "10": "October",
        "11": "November",
        "12": "December"
    }
    const monthsToNums = {
        "January": "1",
        "February": "2",
        "March": "3",
        "April": "4",
        "May": "5",
        "June": "6",
        "July": "7",
        "August": "8",
        "September": "9",
        "October": "10",
        "November": "11",
        "December": "12"
    }
    const monthsArrDict = ["September, 2021", "October, 2021", "November, 2021", "December, 2021", "January, 2022", "February, 2022", "March, 2022", "April, 2022", "May, 2022", "June, 2022"]
    const [title, setTitle] = useState("")
    const [days, setDays] = useState([])
    const [idx, setIdx] = useState(0)

    const findFace = (average) => {
        if (average < 0.3) return require("../assets/faces/face0.png")
        if (average < 0.5) return require("../assets/faces/face1.png")
        if (average < 0.7) return require("../assets/faces/face2.png")
        if (average < 0.9) return require("../assets/faces/face3.png")
        else return require("../assets/faces/face4.png")
    }

    const checkIfFace = (day, idx) => {
        const date = monthsArrDict[idx].split(",")
        const datePath = `${monthsToNums[date[0].trim()]}_${day}_${date[1].trim()}`
        var faceValue = null
        onValue(ref(database, "journals/" + props.route.params.journal.id + "/journys/" + datePath), (snapshot) => {
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
                <TouchableOpacity key={idx} onPress={() => props.navigation.navigate("JournyScreen", {team: team, journy: faceValue, journal: props.route.params.journal, user: props.route.params.user, entryDate: faceValue["entry-date"]})}>
                    <Image source={findFace(avg)} style={{ width: 30, height: 30, borderRadius: 15, borderWidth: 2 }} />
                </TouchableOpacity>    
                     : <View style={[{ width: 30, height: 30, borderRadius: 15, borderWidth: 2}, day == ' ' ? 
                {backgroundColor: 'transparent', borderWidth: 0} : {backgroundColor: '#ebe8d6'} ]}></View>}
                <Text style={[styles.text, { fontSize: 20 }]}>{day}</Text>
            </View>
        )
    }
    useEffect(() => {
        const today = new Date
        setDays(months[`${today.getFullYear()}`][`${today.getMonth() + 1}`])
        setIdx(monthsArrDict.indexOf(`${numsToMonths[today.getMonth() + 1]}, ${today.getFullYear()}`))
        if (!team) {
            onValue(ref(database, "journals/" + props.route.params.journal.id + "/users"), (snapshot) => {
                setTeam(snapshot.val())
            })
        }
    }, []);

    useEffect(() => {
        setTitle(monthsArrDict[idx])
        const date = monthsArrDict[idx].split(",")
        setDays(months[date[1].trim()][monthsToNums[date[0]]])
    }, [idx]);
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
        <View style={[styles.container]}>
            <ImageBackground source={gradient} resizeMode="stretch" style={[styles.image,]}>
            <Text style={[styles.text, {position: 'absolute', top: 30, fontSize: 35}]}>Check your team's progress</Text>
                <View style={{ opacity: 0.7, backgroundColor: "#a7c4be", borderRadius: 20, overflow: 'hidden', position: 'absolute', top: 100 }}>
                    <View style={{ padding: 20, backgroundColor: "#bcd6e9", display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                        <TouchableOpacity onPress={() => idx > 0 && setIdx(idx - 1)}>
                            <Ionicons name="arrow-back-circle" size={30} color="black" />
                        </TouchableOpacity>
                        <Text style={[styles.text, { fontSize: 30 }]}>{title}</Text>
                        <TouchableOpacity onPress={() => idx < monthsArrDict.length - 1 && setIdx(idx + 1)}>
                            <Ionicons name="arrow-forward-circle" size={30} color="black" />
                        </TouchableOpacity>
                    </View>
                    <View style={{ padding: 20,  }}>
                        {renderMonth}
                    </View>
                </View>
            </ImageBackground>
        </View>

    );
}


