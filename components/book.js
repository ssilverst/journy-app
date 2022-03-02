import styles from "../Styles";
import { TouchableOpacity, ImageBackground, Text, StyleSheet } from 'react-native';

const Book = (props) => {

    return (
        <TouchableOpacity onPress={props.onPress} style={bookStyle.book}>
            <ImageBackground source={require("../assets/icons/bookIcon.png")}
                resizeMode='stretch'
                style={bookStyle.image}>
                <Text style={bookStyle.title}>{props.title}</Text>
            </ImageBackground>
        </TouchableOpacity>
    );
}

export default Book;

const bookStyle = StyleSheet.create({
    book: {
        justifyContent: "center",
        borderRadius: 10,
    },
    title: {
        fontFamily: 'CreamShoes',
        color: 'black',
        fontSize: 20,
        textAlign: 'center',
    },
    image: {
        width: 131,
        height: 171,
        justifyContent: "center",
    }

})