import styles from "../Styles";
import { View, Text, ImageBackground, ScrollView, Image } from 'react-native';
import mountain from '../assets/backgrounds/littleMountains.png';
import TeamRating from "../components/teamRating";
import pink from '../assets/backgrounds/pinkBackground.png'
import purple from '../assets/backgrounds/purpleBlueBackground.png'
import orange from '../assets/backgrounds/orangeBackground.png'
import green from '../assets/backgrounds/greenBackground.png'
import { FontAwesome } from '@expo/vector-icons';
export default function EntryScreen(props) {
    const backgroundDict = {
        "mood": pink,
        "productivity": orange,
        "communication": purple,
        "free": green
    }
    const images = props.route.params.entry["images"] ? props.route.params.entry["images"] : []
    const renderImages = images.map((image, idx) => {
        return (
            <Image key={idx} source={{ uri: image }} style={{ borderColor: 'white', borderWidth: 2, borderRadius: 10, width: 150, height: 150 }} />
        )
    })

    return (
        <View style={[styles.container, { backgroundColor: '#ece8d6' }]}>
            <ImageBackground source={backgroundDict[props.route.params.entry["type"]]} resizeMode="stretch" imageStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }} style={[styles.image, { top: '2%' }]}>
                <View style={{height: 630, position: 'absolute', top: 90 }}>
                    <ScrollView style={{ margin: 10, }}>
                        <Text style={[styles.text, { fontSize: 50, marginBottom: 20, textAlign: 'left', textDecorationLine: 'underline' }]}>"{props.route.params.entry["prompt"]}"</Text>
                        <Text style={[styles.text, { fontSize: 40, textAlign: 'left' }]}>{props.route.params.team[props.route.params.entry["user"]].name} says: <Text style={[styles.text, { fontSize: 30, textAlign: 'left' }]} >{props.route.params.entry["writing-response"]}</Text></Text>

                        <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                            {renderImages}
                        </View>
                    </ScrollView>
                </View>
                <FontAwesome style={{ position: 'absolute', top: 40, left: 20 }} name="quote-right" size={40} color="white" />
                <FontAwesome style={{ position: 'absolute', bottom: 40, right: 20 }} name="quote-left" size={40} color="white" />
            </ImageBackground>
        </View>

    );
}


