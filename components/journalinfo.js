import styles from "../Styles";
import { View, Text } from 'react-native';
import * as Clipboard from 'expo-clipboard'
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from '@expo/vector-icons';
export default function JournalInfo(props) {
    const { journal } = props
    return (
        <View style={{ padding: 10, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity style={{ marginLeft: 220, marginTop: -10 }} onPress={props.closePopup}><Ionicons name="close" size={24} color="black" /></TouchableOpacity>
            <Text style={[styles.text, {fontSize: 30}]}>{journal.name}</Text>
            <Text style={[styles.text, {fontSize: 20}]}>{journal.id}</Text>
            <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => Clipboard.setString(journal.id)}>
                <Ionicons name="ios-copy-outline" size={24} color="black" />
            </TouchableOpacity>
            <Text style={[styles.text, {fontSize: 30}]}>When team members on this team log in, have them enter this code to access this journal.</Text>
        </View>
    );
}