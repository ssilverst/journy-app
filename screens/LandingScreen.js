import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import home from '../assets/homescreen.png'
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
export default function LandingScreen(props) {
    let [fontsLoaded] = useFonts({
        'Cream-Shoes': require('../assets/CreamShoes.ttf'),
    });

    if (!fontsLoaded) {
        return <AppLoading />
    }
    return (
        <View style={styles.container}>
            <ImageBackground source={home} resizeMode="stretch" style={styles.image}>
                <Text style={styles.text}>Journy</Text>
                <View style={styles.buttons}>
                    <TouchableOpacity onPress={() => props.navigation.navigate("SignInScreen", {"type": "team member"})}>
                        <Text style={styles.text}>Team Member</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => props.navigation.navigate("SignInScreen", {"type": "facilitator"})}>
                        <Text style={styles.text}>Facilitator</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.text} onPress={() => props.navigation.navigate("SignUpScreen")}>
                    <Text style={styles.text}>Create Account</Text>
                </TouchableOpacity>
            </ImageBackground>

        </View>
    );``
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontFamily: 'Cream-Shoes', 
        color: 'black', 
        fontSize: 60,
        textAlign: 'center',
    },
    buttons: {
       alignItems: 'center',
       display: 'flex'
    },
    image: {
        flex: 1,
        backgroundColor: 'purple',
        width: '100%',
        height: '100%',
        justifyContent: "center",
    }
});