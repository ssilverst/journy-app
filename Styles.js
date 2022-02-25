import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: 300
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center"
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
     }
})

export default styles;