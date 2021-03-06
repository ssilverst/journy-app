import { StyleSheet, Text, View, Alert, ImageBackground } from 'react-native';
import home from '../assets/backgrounds/littleMountains.png'
import Tappable from '../components/tappable';
import exStyles from "../Styles";
import { useState } from 'react';
import Rating from '../components/rating';
export default function RatingsScreen(props) {
    const [commSelected, setCommSelected] = useState(null)
    const [prodSelected, setProdSelected] = useState(null)
    const [teamSelected, setTeamSelected] = useState(null)
    const closeJournal = () => {
        if (commSelected && prodSelected && teamSelected){
            props.navigation.navigate("HomeScreenTeamMember", {user: props.route.params.user, journal: props.route.params.journal})
        }
        else {
            Alert.alert("Please rate all of the following.")
        }
    }
    return (
        <View style={styles.container}>
            <ImageBackground source={home} resizeMode="stretch" style={exStyles.image}>
                <Text style={exStyles.text}> Today how was your team's... </Text>
                <Rating type="communication" updateRating={(score) => setCommSelected(score)} journyPath={props.route.params.journyPath} user={props.route.params.user} />
                <Rating type="productivity" updateRating={(score) => setProdSelected(score)} journyPath={props.route.params.journyPath} user={props.route.params.user}/>
                <Rating type="teamwork" updateRating={(score) => setTeamSelected(score)} journyPath={props.route.params.journyPath} user={props.route.params.user}/>
                <Tappable
                    text="FINISH" 
                    type="normal"
                    onPress={() => closeJournal()}
                    />
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
});
