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
        borderRadius: 10,
        

    },
    title: {
        fontFamily: 'CreamShoes',
        color: 'black',
        fontSize: 30,
        textAlign: 'center',
        width: 80,
    },
    image: {
        width: 131,
        height: 171,
        alignItems: "center",
        display: 'flex',
        justifyContent: 'center'
    }

})