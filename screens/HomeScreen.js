import { StyleSheet, Text, View, Image } from 'react-native';
import home from '../assets/homescreen.png'
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
export default function HomeScreen() {
    let [fontsLoaded] = useFonts({
        'Cream-Shoes': require('../assets/CreamShoes.ttf'),
    });

    if (!fontsLoaded) {
        return <AppLoading />
    }
    return (
        <View style={styles.container}>
            <Image source={home} />
        <Text style={{ fontFamily: 'Cream-Shoes', position: 'absolute', color: 'black', fontSize: 60 }}>Journy</Text>

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
