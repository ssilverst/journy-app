import { StyleSheet, Keyboard, Alert, Text, Image, View, TouchableOpacity, ImageBackground, TouchableWithoutFeedback } from 'react-native';
import { useState, useEffect } from 'react';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import database from "../config/firebase";
import { set, ref } from "firebase/database";
import styles from '../Styles';
import * as ImagePicker from 'expo-image-picker';
import Tappable from '../components/tappable';
import { v4 as uuidv4 } from "uuid";
import useWindowDimensions from 'react-native/Libraries/Utilities/useWindowDimensions';

export default function WritingPromptScreen(props) {
    const ENTRY_ID = uuidv4();
    const [writingResponse, setWritingResponse] = useState('')
    const [images, setImages] = useState([])
    const [writing, setWriting] = useState(true)
    const [topic, setTopic] = useState(null)
    const windowHeight = useWindowDimensions().height;
    const [uploading, setUploading] = useState(false)
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });


        if (!result.cancelled) {
            uploadImageToBucket(result.uri)
            setImages(images => [result.uri, ...images])
        }
    };
    const getPictureBlob = (uri) => {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                console.log(xhr.response)
              resolve(xhr.response);
            };
            xhr.onerror = function (e) {
              console.log(e);
              reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', uri, true);
            xhr.send(null);
          });
    }
    const uploadImageToBucket = async (imageUri) => {
        let blob;
        try {
          setUploading(true);
          blob = await getPictureBlob(imageUri);
        //   const ref = await storage.ref().child(uuid.v4());
        //   const snapshot = await ref.put(blob);
      
        //   return await snapshot.ref.getDownloadURL();
        } catch (e) {
          alert(e.message);
        } finally {
          blob.close();
          setUploading(false);
        }
      };

    const removeImage = (imageToRemove) => {
        setImages(images.filter(image => imageToRemove != image));
    }
    const craftingEntry = (submitType) => {
        if ((!writingResponse || writingResponse.trim() == '') && images.length == 0) {
            Alert.alert(`${submitType=="submit" ? "Jot down your thoughts before submitting!" : "Tap the back button to discard an entry."}`)
        }
        else {
            const entry =
            {
                'user': props.route.params.user,
                id: ENTRY_ID,
                'prompt': props.route.params.promptObject.promptType == 'free' ? topic : props.route.params.promptObject.prompt,
                'writing-response': writing ? writingResponse : null,
                'type': props.route.params.promptObject.promptType,
                'images': images,
                'audio': null
            }
            set(ref(database, props.route.params.journyPath + "/" + ENTRY_ID), entry)
            set(ref(database, props.route.params.journyPath + "/entry-date"), props.route.params.entryDate)
            set(ref(database, "/journals/" + props.route.params.journal.id + "/journys/recent-journy"), props.route.params.entryDate)

            if (submitType == 'submit') {
                props.navigation.navigate("RatingsScreen", { user: props.route.params.user, journal: props.route.params.journal, journyPath: props.route.params.journyPath })
            }
            else {
                props.navigation.navigate("PromptTypeScreen", { entryDate: props.route.params.entryDate, user: props.route.params.user, journal: props.route.params.journal, journyPath: props.route.params.journyPath })
            }
        }
    }
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={[{ minHeight: Math.round(windowHeight) }, styles.container]}>
                <ImageBackground source={props.route.params.promptObject.image} resizeMode="stretch" imageStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }} style={[styles.image, { top: '2%' }]}>
                    <View style={{ backgroundColor: '#ece8d6', position: 'absolute', top: 20, width: 300, padding: 10, borderRadius: 10 }}>
                        <Text style={[styles.text, { fontSize: 25 }]}>{props.route.params.promptObject.prompt}</Text>
                    </View>
                    {props.route.params.promptObject.promptType == 'free' &&
                        <View style={{ position: 'absolute', top: 80 }}>
                            <TextInput
                                style={[writingStyles.input, {borderRadius: 20, borderWidth: 2}]}
                                onChangeText={setTopic}
                                multiline={true}
                                value={topic}
                                maxLength={100}
                                placeholder='Add a topic...'
                            />
                        </View>
                    }
                    <View style={[writingStyles.inputBox, { position: 'absolute', top: 140 }]}>
                        <TextInput
                            style={writingStyles.input}
                            onChangeText={setWritingResponse}
                            multiline={true}
                            numberOfLines={4}
                            value={writingResponse}
                            placeholder='Write your response here...'
                        />
                    </View>


                    <View style={{ display: 'flex', flexDirection: 'row', width: '95%' }}>
                        <View style={{ padding: 10, }} >
                            <TouchableOpacity style={writingStyles.box} onPress={() => pickImage()}>
                                <AntDesign style={{ position: 'absolute' }} name="camera" size={32} color='#ece8d6' />
                                <AntDesign style={{ position: 'absolute' }} name="camerao" size={32} color='black' />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <ScrollView horizontal={true} style={writingStyles.scroll}>
                                {images ? images.map((image, idx) => {
                                    return (
                                        <View style={{ paddingTop: 10 }}>
                                            <Image key={idx} style={[writingStyles.scrollItems, writingStyles.box]} source={{ uri: image }} />
                                            <TouchableOpacity style={{ position: 'absolute', top: 0, right: 0 }} onPress={() => removeImage(image)}>
                                                <AntDesign name="closecircle" size={20} color="#CA8FB5" />
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }) : null}
                            </ScrollView>
                        </View>
                    </View>

                    <View style={{ width: '100%' }}>
                        <TouchableOpacity onPress={() => Alert.alert("Upgrade your account to premium to unlock this feature ;)")} style={[writingStyles.box, { position: 'absolute', left: '6%', top: 30 }]}>
                            <FontAwesome name="microphone" size={32} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ position: 'absolute', bottom: 120, display: 'flex', width: '100%', justifyContent: 'space-evenly', flexDirection: 'row' }}>
                        <Tappable onPress={() => craftingEntry('more')}
                            text="WRITE MORE"
                            type="normal"
                            fontSize={30}
                            borderColor="black"
                        />
                        <Tappable onPress={() => craftingEntry('submit')}
                            text="SUBMIT"
                            type="normal"
                            fontSize={40}
                            borderColor="black"
                        />
                    </View>
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
        justifyContent: 'center',
    },
    input: {
        padding: 10,
        width: 320,
        fontSize: 30,
        fontFamily: 'CreamShoes',
        textAlignVertical: 'top'
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
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    scroll: {
        width: 200,
        position: 'absolute',

    },
    scrollItems: {
        marginRight: 10,
    }
})