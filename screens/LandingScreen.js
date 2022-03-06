import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import home from '../assets/homescreen.png'
import AppLoading from 'expo-app-loading';
import styles from '../Styles';
import {Colors} from '../Colors';
import Tappable from '../components/tappable';

export default function LandingScreen(props) {
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
                        text="SIGN IN"
                        type="normal"
<<<<<<< HEAD
                        //borderColor="white"
                        //backgroundColor={Colors.buttonDefaultBackground}
=======
                        borderColor="black"
                        backgroundColor="white"
>>>>>>> 419b9132924480a7673412b174aef57b48d8facc
                    />
                </View>
                <Tappable
                    onPress={() => props.navigation.navigate("SignUpScreen")}
                    text="CREATE ACCOUNT"
                    type="underlined"
                />
            </ImageBackground>

        </View>
        
    );``
}