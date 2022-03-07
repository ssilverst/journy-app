import styles from "../Styles";
import { useState, useEffect } from "react";
import { View, Text, Image } from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import { onValue, ref } from "@firebase/database";

import database from "../config/firebase";
export default function Stats(props) {
    const { idx, monthsArrDict, monthsToNums, days, journal } = props
    const faces = [require('../assets/faces/face4.png'), require('../assets/faces/face3.png'), require('../assets/faces/face2.png'), require('../assets/faces/face1.png'), require('../assets/faces/face0.png')]
    const [data, setData] = useState([])
    const [labels, setLabels] = useState([])

    const renderLabels = labels.map((label, idx) => {
        return (
            <View key={idx}>
                <Text style={[styles.text, { fontSize: 20 }]}>WK {label + 1}</Text>
            </View>
        )
    })
    const findFace = (average) => {
        if (average < 0.3) return require("../assets/faces/face0.png")
        if (average < 0.5) return require("../assets/faces/face1.png")
        if (average < 0.7) return require("../assets/faces/face2.png")
        if (average < 0.9) return require("../assets/faces/face3.png")
        else return require("../assets/faces/face4.png")
    }
    useEffect(() => {
        setLabels([])
        setData([])
        setLabels(Array.from(Array(days.length).keys()))
        for (var w = 0; w < days.length; w++) {
            for (var i = 0; i < days[w].length; i++) {
                const currDay = i
                const date = monthsArrDict[idx].split(",")
                const datePath = `${monthsToNums[date[0].trim()]}_${days[w][i]}_${date[1].trim()}`
                var faceValue = null
                onValue(ref(database, "journals/" + journal.id + "/journys/" + datePath), (snapshot) => {
                    if (snapshot.val()) {
                        faceValue = snapshot.val()
                        var teamRatings = Object.values(faceValue["rating"]["teamwork"])
                        var total = 0
                        var avg = 0
                        for (var i = 0; i < teamRatings.length; i++) {
                            total += teamRatings[i];
                        }
                        avg = (total / teamRatings.length)
                        var dayData = {
                            "x": w * 7 + currDay,
                            "y": avg,
                            "image": findFace(avg)
                        }
                        setData(data => [...data, dayData])
                    }

                })
            }
        }
    }, [props.idx, days]);
    const findColor = (rating) => {
        if (rating < 0.3) return '#f0914a'
        if (rating < 0.5) return '#f4b03e'
        if (rating < 0.7) return '#c1d453'
        if (rating < 0.9) return '#83ba9b'
        else return '#569e70'
    }
    const renderData = data.map((datum, idx) => {
        return (
            <View key={idx} style={{ zIndex: 1, marginLeft: (270 * (datum.x / (7 * days.length))), height: 1, position: 'absolute' }}>
                <TouchableOpacity style={{ marginTop: (200 - (200 * (datum.y))), borderWidth: 1, width: 20, height: 20, borderRadius: 10, opacity: 1, backgroundColor: findColor(datum.y) }}></TouchableOpacity>
            </View>
        )

    })
    const renderAxis = faces.map((face, idx) => {
        return (
            <View key={idx}>
                <Image source={face} style={{ width: 20, height: 20 }} />
            </View>
        )
    })
    const grid = labels.map((_, idx) => {

        return (
            <View key={idx} style={{ height: 200, width: 2, backgroundColor: 'black', opacity: 0.2 }}></View>
        )
    })
    return (
        <View style={{ padding: 20, backgroundCololr: 'white',}}>
            <View style={{ position: 'absolute', marginLeft: 50, marginTop: 20, height: 200, width: 270 }}>
                {renderData}
            </View>
            <View style={{ position: 'absolute', marginLeft: 20, marginTop: 20, flexDirection: 'column', display: 'flex', justifyContent: 'space-between', height: 200 }}>
                {renderAxis}
            </View>
            <View style={{ marginLeft: 30 }}>
                <View style={{ display: 'flex', flexDirection: 'row', width: 270, justifyContent: 'space-between' }}>{grid}</View>
                <View style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-between', width: 270 }}>
                    {renderLabels}
                </View>
            </View>
            <View style={{position: 'absolute', backgroundColor: 'white', width: 400, height: 400, zIndex: -2}}></View>
        </View>

    );
}


