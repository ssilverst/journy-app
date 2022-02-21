import { StyleSheet, Keyboard, Text, TextInput, View, SafeAreaView, TouchableOpacity, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker'
import CreamShoes from "../assets/CreamShoes.ttf";
import home from '../assets/homescreen.png';
import { Picker } from 'react-native-web';
export default function LandingScreen() {
    const [nameText, setNameText] = useState("")
    const [emailText, setEmailText] = useState("")
    const [passwordText, setPasswordText] = useState("")
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Apple', value: 'apple' },
        { label: 'Banana', value: 'banana' }
    ]);


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <ImageBackground source={home} resizeMode="stretch" style={styles.image}>
                    <SafeAreaView>
                        <TextInput
                            style={styles.input}
                            onChangeText={setNameText}
                            value={nameText}
                            placeholder='Name'
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={setEmailText}
                            value={emailText}
                            placeholder='Email'
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={setPasswordText}
                            value={passwordText}
                            placeholder='Password'
                        />
                    </SafeAreaView>
                    <View style={{height: 50, width: 200, backgroundColor:'blue', margin:0}}>
                        <DropDownPicker
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            //containerStyle={styles.picker}
                            labelStyle={styles.label}
                        />
                    </View>
                    <TouchableOpacity>
                        <Text>Finish Sign-up</Text>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
        </TouchableWithoutFeedback >
    );
}

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
        backgroundColor: 'purple',
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center"
    },
})