import styles from "../Styles";
import { useState, useEffect } from "react";
import { View, Text, ImageBackground, ScrollView, Image } from 'react-native';
import gradient from '../assets/backgrounds/littleBarGradients.png';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { onValue, ref } from "@firebase/database";
import database from "../config/firebase";
import Calendar from "../components/calendar";
import Stats from "../components/stats"
import MenuBar from "../components/menubar";
export default function CalendarScreen(props) {
    const [team, setTeam] = useState(null)
    const [selected, setSelected] = useState('calendar')
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

    return (
        <View style={[styles.container]}>
            <ImageBackground source={gradient} resizeMode="stretch" style={[styles.image,]}>
                <Text style={[styles.text, { position: 'absolute', top: 30, fontSize: 35 }]}>Check your team's progress</Text>
                <View style={{ position: 'absolute', top: 100, right: 0, display: 'flex', flexDirection: 'row' }}>

                    <TouchableOpacity style={[{ padding: 10, backgroundColor: '#ece9d6', borderRadius: 10, paddingLeft: 20, paddingRight: 20, margin: 10, borderWidth: 2 }]} onPress={() => setSelected('stats')}><Ionicons name="stats-chart" size={20} color={selected != "stats" ? "#ccc" : "black"} /></TouchableOpacity>
                    <TouchableOpacity style={[{ padding: 10, backgroundColor: '#ece9d6', borderRadius: 10, paddingLeft: 20, paddingRight: 20, margin: 10, borderWidth: 2 }]} onPress={() => setSelected('calendar')}><AntDesign name="calendar" size={20} color={selected != "calendar" ? "#ccc" : "black"} /></TouchableOpacity>
                </View>
                <View style={{position: 'absolute', top: 180, height: '60%'}}>
                <ScrollView>

                    <View style={{ opacity: 0.80, backgroundColor: "#a7c4be", borderRadius: 20, overflow: 'hidden',  }}>
                        <View style={{ padding: 20, backgroundColor: "#bcd6e9", display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <TouchableOpacity onPress={() => idx > 0 && setIdx(idx - 1)}>
                                <Ionicons name="arrow-back-circle" size={30} color="black" />
                            </TouchableOpacity>
                            <Text style={[styles.text, { fontSize: 30 }]}>{title.replace(',', '')}</Text>
                            <TouchableOpacity onPress={() => idx < monthsArrDict.length - 1 && setIdx(idx + 1)}>
                                <Ionicons name="arrow-forward-circle" size={30} color="black" />
                            </TouchableOpacity>
                        </View>
                        {selected === 'calendar' ? <Calendar navigation={props.navigation} idx={idx} team={team} monthsArrDict={monthsArrDict} monthsToNums={monthsToNums} days={days} journal={props.route.params.journal} user={props.route.params.user} /> : <Stats navigation={props.navigation} idx={idx} team={team} monthsArrDict={monthsArrDict} monthsToNums={monthsToNums} days={days} journal={props.route.params.journal} user={props.route.params.user} />}
                    </View>
                </ScrollView></View>
                <MenuBar selected="calendar" onHomePress={() => props.navigation.navigate("HomeScreenTeamMember", { journal: props.route.params.journal, user: props.route.params.user })} />
            </ImageBackground>
        </View>

    );
}


