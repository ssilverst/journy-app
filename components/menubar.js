import styles from "../Styles";
import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';
import calendarIcon from '../assets/icons/calendarIcon.png';
import barGraphIcon from '../assets/icons/barGraphIcon.png';
import mountainIcon from '../assets/icons/mountainIcon.png';

const MenuBar = (props) => {

    return (
        <View style={menuStyle.container}>
            <TouchableOpacity onPress={props.onPress}>
                <Image source={barGraphIcon} style={menuStyle.image} />
            </TouchableOpacity>

            <TouchableOpacity onPress={props.onPress}>
                <Image source={mountainIcon} style={menuStyle.image} />
            </TouchableOpacity>

            <TouchableOpacity onPress={props.onPress}>
                <Image source={calendarIcon} style={menuStyle.image} />
            </TouchableOpacity>

        </View>
    );
}

export default MenuBar;

const menuStyle = StyleSheet.create({
    image: {
        width: 60,
        height: 60,
        marginHorizontal: 30,
    },
    container: {
        marginTop: 'auto',
        borderWidth: 5,
        borderColor: "black",
        backgroundColor: "white",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 5,
    }
})