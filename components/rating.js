import styles from "../Styles";
import { View, Text, Image, StyleSheet } from 'react-native';
import database from "../config/firebase";
import { set, ref } from "firebase/database";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useState } from "react";
const Rating = (props) => {
    const [selected, setSelected] = useState(null)
    const typeDict = {
        'communication': "Communication",
        'productivity': "Productivity",
        'teamwork': "Overall Teamwork"
    }
    const setRating = (rating) => {
        console.log('all hell')
        console.log(rating)
        console.log(props.journyPath + "/rating/" + props.type + "/" + props.user)
        set(ref(database, props.journyPath + "/rating/" + props.type + "/" + props.user), rating)
        setSelected(rating)
        props.updateRating(rating)
    }
    return (
        <View >
            <Text style={styles.text}>{typeDict[props.type]}</Text>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => setRating(0.1)}><Image resizeMode="cover" 
                    style={[{ width: 50, margin: 8, height: 50 }, (selected && selected == 0.1) ? {opacity: 1} : {opacity:0.3}]} source={require('../assets/faces/face0.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setRating(0.3)} ><Image resizeMode="cover" 
                    style={[{ width: 50, margin: 8, height: 50 }, (selected && selected == 0.3) ? {opacity: 1} : {opacity:0.3}]} source={require('../assets/faces/face1.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setRating(0.5)} ><Image resizeMode="cover" 
                    style={[{ width: 50, margin: 8, height: 50 }, (selected && selected == 0.5) ? {opacity: 1} : {opacity:0.3}]} source={require('../assets/faces/face2.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setRating(0.7)} ><Image resizeMode="cover" 
                    style={[{ width: 50, margin: 8, height: 50 }, (selected && selected == 0.7) ? {opacity: 1} : {opacity:0.3}]} source={require('../assets/faces/face3.png')} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setRating(0.9)} ><Image resizeMode="cover" 
                    style={[{ width: 50, margin: 8, height: 50 }, (selected && selected == 0.9) ? {opacity: 1} : {opacity:0.3}]} source={require('../assets/faces/face4.png')} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Rating;
