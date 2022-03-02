import { StyleSheet, Text, View, Image } from 'react-native';
import home from '../assets/homescreen.png'

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <Image source={home} />
        <Text style={{ fontFamily: 'CreamShoes', position: 'absolute', color: 'black', fontSize: 60 }}>Journy</Text>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
