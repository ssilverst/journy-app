import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        margin: 12,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        width: 300,
        fontSize: 25,
        fontFamily: 'CreamShoes', 

    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontFamily: 'CreamShoes', 
        color: 'black', 
        fontSize: 60,
        textAlign: 'center',
    },
    buttons: {
        alignItems: 'center',
        display: 'flex'
    },
    title: {
        fontFamily: 'CreamShoes',
        color: 'black',
        fontSize: 100,
        textAlign: 'center',
        margin: 20,
    }
})

export default styles;