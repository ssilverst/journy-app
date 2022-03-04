import styles from "../Styles";
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';


const Tappable = (props) => {
    const textStyles = {
        "normal": styles.text,
        "underlined": buttonStyle.underlinedText
    }
    const TOStyles = {
        "normal": buttonStyle.normalTO,
        "underlined": buttonStyle.underlinedTO
    }
    if (props.borderColor) {
        TOStyles[props.type] = {...TOStyles[props.type], borderColor: props.borderColor}
    }
    if (props.backgroundColor) {
        TOStyles[props.type] = {...TOStyles[props.type], backgroundColor: props.backgroundColor}
    }
    return (
        <TouchableOpacity onPress={props.onPress} style={TOStyles[props.type]}>
            <Text style={textStyles[props.type]}>
                {props.text}
            </Text>
        </TouchableOpacity>
    );
}

export default Tappable;

const buttonStyle = StyleSheet.create({
    normalTO: {
        //elevation: 8,
        backgroundColor: "white",
        borderRadius: 10,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderWidth: 5,
        borderColor:'pink',
        marginVertical: 10
    },
    underlinedText: {
        fontFamily: 'CreamShoes', 
        color: 'black', 
        fontSize: 30,
        textAlign: 'center',
        textDecorationLine: "underline",
    },
    underlinedTO: {
        borderRadius: 10,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderColor:'pink',
        marginVertical: 10
    }
})