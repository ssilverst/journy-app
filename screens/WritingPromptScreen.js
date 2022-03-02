import { StyleSheet, Keyboard, Text, Image, View, TouchableOpacity, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import { useState } from 'react';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { v4 as uuidv4 } from "uuid";
import styles from '../Styles';
import * as ImagePicker from 'expo-image-picker';

export default function WritingPromptScreen(props) {
    const [writingResponse, setWritingResponse] = useState('')
    const [images, setImages] = useState([])
    const [writing, setWriting] = useState(true)
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImages(images => [result.uri, ...images])
        }
    };
    const removeImage = (imageToRemove) => {
        setImages(images.filter(image => imageToRemove != image));
    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={[styles.container, { backgroundColor: '#ece8d6' }]}>
                <ImageBackground imageStyle={{ borderTopRightRadius: 10, borderTopLeftRadius: 10 }} source={props.route.params.promptObject.image} resizeMode="stretch" style={writingStyles.image}>
                    <View style={{ backgroundColor: '#ece8d6', position: 'absolute', top: 20, padding: 10, borderRadius: 10 }}>
                        <Text style={{ textAlign: 'center', fontFamily: 'CreamShoes', fontSize: 25 }}>{props.route.params.promptObject.prompt}</Text>
                    </View>
                    {writing ? <View style={writingStyles.inputBox}>
                        <TextInput
                            style={writingStyles.input}
                            onChangeText={setWritingResponse}
                            value={writingResponse}
                            placeholder='Write your response here...'
                        />
                        <TouchableOpacity onPress={() => setWriting(false)} style={{ position: 'absolute', top: 0, right: 5 }}>
                            <AntDesign name="closecircle" size={20} color="#CA8FB5" />

                        </TouchableOpacity>
                    </View> :
                        <TouchableOpacity style={writingStyles.box} onPress={() => setWriting(true)}>
                            <FontAwesome style={{ backgroundColor: 'black',}} name="pencil-square" size={32} color="#ece8d6"  />
                        </TouchableOpacity>}

                    <ScrollView horizontal={true} style={writingStyles.scroll}>
                        <TouchableOpacity style={writingStyles.box} onPress={() => pickImage()}>
                            <AntDesign style={{ position: 'absolute' }} name="camera" size={32} color='#ece8d6' />
                            <AntDesign style={{ position: 'absolute' }} name="camerao" size={32} color='black' />
                        </TouchableOpacity>
                        {images ? images.map((image, idx) => {
                            return (
                                <View style={{ padding: 10 }}>
                                    <Image key={idx} style={writingStyles.scrollItems} source={{ uri: image }} style={writingStyles.box} />
                                    <TouchableOpacity style={{ position: 'absolute', top: 0, right: 5 }} onPress={() => removeImage(image)}>
                                        <AntDesign name="closecircle" size={20} color="#CA8FB5" />
                                    </TouchableOpacity>
                                </View>
                            )
                        }) : null}
                    </ScrollView>
                    <TouchableOpacity onPress={() => console.log('recording audio')} style={writingStyles.box}>
                        <FontAwesome name="microphone" size={32} />
                    </TouchableOpacity>
                </ImageBackground>
            </View>
        </TouchableWithoutFeedback>
    );
}

const writingStyles = StyleSheet.create({
    box: {
        backgroundColor: 'rgba(255, 255, 255, 0.14)',
        width: 80,
        height: 80,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    input: {
        padding: 10,
        width: 320,
        fontSize: 30,
        fontFamily: 'CreamShoes'
    },
    inputBox: {
        backgroundColor: 'rgba(255, 255, 255, 0.14)',
        borderRadius: 30,
        margin: 10,
        height: 200
    },
    image: {
        flex: 1,
        width: '100%',
        height: '98%',
        top: '2%',
        justifyContent: "center",
        alignItems: "center",
    },
    scroll: {
        width: '90%',
        flexGrow: 0
    },
    scrollItems: {
        marginRight: 10
    }
})