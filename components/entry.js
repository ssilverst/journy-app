import styles from "../Styles";
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

const EntryItem = (props) => {

    return (
        <TouchableOpacity onPress={props.onPress} style={entryStyle.book}>
            <Text style={entryStyle.title}> {props.title} </Text>
        </TouchableOpacity>
    );
}

export default EntryItem;

const entryStyle = StyleSheet.create({
    book: {
        height: 100,
        width: 80,
        backgroundColor: 'tan',
        justifyContent: "center",
        borderRadius: 10,
    },
    title: {
        fontFamily: 'CreamShoes', 
        color: 'black', 
        fontSize: 20,
        textAlign: 'center',
    },

})