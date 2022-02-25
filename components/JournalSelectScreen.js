import { StyleSheet, Keyboard, Text, TextInput, View, SafeAreaView, TouchableOpacity, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import { useState, useEffect } from 'react';
import DropDownPicker from 'react-native-dropdown-picker'
import CreamShoes from "../assets/CreamShoes.ttf";
import mountain from '../assets/backgrounds/littleMountains.png';
import database from "../config/firebase";
import { ref, set, onValue } from "firebase/database";

export default function JournalSelectScreen(props) {
    const currJournalsId = ref(database, 'journals');
    const [journals, setJournals] = useState([])
    useEffect(() => {
        onValue(currJournalsId, (snapshot) => {
            setJournals(snapshot.val())
        });
    }, [currJournalsId]);

    return (
        <View style={styles.container}>
            <ImageBackground source={mountain} resizeMode="stretch" style={styles.image}>
                {Array.isArray(journals)
                    ? journals.map((journal, idx) => {
                        return (
                            <View style={{ height: 40, width: 40, backgroundColor: 'yellow' }}>
                                <Text>journal.name</Text>
                            </View>
                        )
                    })
                    : null}
                <TouchableOpacity 
                    onPress={() => props.navigation.navigate("AddJournalScreen", {user: props.user})}
                    style={styles.addButton}><Text style={{fontSize: 40}}>+</Text></TouchableOpacity>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: 300
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center"
    },
    addButton: 
    {
        backgroundColor: 'white', 
        borderWidth: 2,
        borderColor: 'black',
        position: 'absolute', 
        bottom: 5, 
        borderRadius: 20, 
        width: 50, 
        alignItems: 'center'
    }
})