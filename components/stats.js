import styles from "../Styles";
import { useState, useEffect } from "react";
import { View, Text, Image, Dimensions } from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { onValue, ref } from "@firebase/database";
import { LineChart } from 'react-native-chart-kit'
import database from "../config/firebase";
export default function Stats(props) {
    const { navigation, idx, team, title, monthsArrDict, monthsToNums, updateIdx, days, journal, user } = props
    const [value, setValue] = useState([])
    const [labels, setLabels] = useState([])
    const [xData, setXData] = useState([])
    const legend = {
        enabled: true,
        textSize: 14,
        form: 'CIRCLE',
        wordWrapEnabled: true
    }
    const marker = {
        enabled: true,
        type: 'com.github.reactNativeMPAndroidChart.example.marker.OvalBlueMarker'
    }
    const data = {
        dataSets: [{
            data: [
                { x: 5, y: 90 },
                { x: 10, y: 130 },
                { x: 50, y: 2000, marker: "eat more" },
                { x: 80, y: 9000, marker: "eat less" }
            ],
        }]
    }
    useEffect(() => {
        var weekIdx = 1
        for (week in days) {
            setLabels[labels => [...labels, weekIdx]]
            weekIdx +=1 
            console.log(days[week])
            for (var i; i< days[week].length; i++){
                setXData(xData => [...xData, days[week][i]])
            }
        }
    }, []);
    return (
        <View>
            <LineChart
                data={{
                    labels: labels,
                    datasets: [
                        {
                            data: [20, 45, 28, 80, 99, 43],
                            strokeWidth: 2,
                        },
                    ],
                }}
                width={Dimensions.get('window').width - 16}
                height={220}
                chartConfig={{
                    // backgroundColor: '#1cc910',
                    backgroundGradientFrom: '#eff3ff',
                    backgroundGradientTo: '#efefef',
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                }}
                style={{
                    marginVertical: 8,
                    borderRadius: 16,
                }}
            />
        </View>

    );
}


