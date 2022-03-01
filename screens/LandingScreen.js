import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import home from '../assets/homescreen.png'
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import styles from '../Styles';
import Tappable from '../components/tappable';

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
                <Tappable 
                    onPress={() => props.navigation.navigate("TestingScreen")}
                    text="tester"
                    type="underlined"
                />
                <Text style={styles.title}>Journy</Text>
                <View style={styles.buttons}>
                    <Tappable 
                        onPress={() => props.navigation.navigate("SignInScreen")}
                        text="Sign In"
                        type="normal"
                    />
                </View>
                <Tappable
                    onPress={() => props.navigation.navigate("SignUpScreen")}
                    text="Create Account"
                    type="underlined"
                />
            </ImageBackground>

        </View>
        
    );``
}
/*
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
*/