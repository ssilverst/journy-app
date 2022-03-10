import { Text, View, ImageBackground, Image } from 'react-native';
import home from '../assets/homescreen.png'
import styles from '../Styles';
import Tappable from '../components/tappable';
import logo from '../assets/icons/logo.png'
export default function LandingScreen(props) {
    return ( 
        <View style={styles.container}>
            <ImageBackground source={home} resizeMode="stretch" style={styles.image}>
                <Image style={{width: 300, height: 80, marginBottom: 50}} source={logo} />
                <View style={styles.buttons}>
                    <Tappable 
                        onPress={() => props.navigation.navigate("SignInScreen")}
                        text="SIGN IN"
                        type="normal"
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