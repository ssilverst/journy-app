import {Text, View, StyleSheet, ImageBackground} from 'react-native';
import {useState} from 'react';
import CreamShoes from "../assets/CreamShoes.ttf";

export default function Background(props) {
    return (
        <View style={styles.container}>
            <ImageBackground source={props.image} resizeMode="stretch" style={styles.image}>
                {props.children}
            </ImageBackground>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'orange'
    },
    image: {
        flex: 1,
        backgroundColor: 'purple',
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center"
    },
});