import styles from "../Styles";
import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';
import calendarIcon from '../assets/icons/calendarIcon.png';
import calendarIconFill from '../assets/icons/calendarIconFill.png';
import mountainIconFill from '../assets/icons/mountainIconFill.png';
import mountainIcon from '../assets/icons/mountainIcon.png';
import { Colors } from "../Colors";

const MenuBar = (props) => {

    return (
        <View style={menuStyle.container}>

            <TouchableOpacity onPress={props.onHomePress}>
                <Image source={props.selected == 'home' ? mountainIconFill : mountainIcon} style={menuStyle.image} />
            </TouchableOpacity>

            <TouchableOpacity onPress={props.onCalendarPress}>
                <Image source={props.selected == 'calendar' ? calendarIconFill : calendarIcon} style={menuStyle.image} />
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
        borderBottomWidth: 0,
        borderColor: "black",
        backgroundColor: Colors.defaultBackground,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 5,
        width: '100%',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,

    }
})