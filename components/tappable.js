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
        fontFamily: 'Cream-Shoes', 
        color: 'black', 
        fontSize: 30,
        textAlign: 'center',
        textDecorationLine: "underline",
    },
    underlinedTO: {
        //backgroundColor: "white",
        borderRadius: 10,
        paddingVertical: 6,
        paddingHorizontal: 12,
        //borderWidth: 5,
        borderColor:'pink',
        marginVertical: 10
    }
})