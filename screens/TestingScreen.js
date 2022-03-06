import {View, Text} from 'react-native';
import { ImageBackground } from 'react-native-web';
import styles from '../Styles';
import home from '../assets/homescreen.png';
import EntryItem from "../components/entry";
import Book from '../components/book';
import MenuBar from '../components/menubar';

export default function TestingScreen() {


    return (
        <View style={styles.container}>
            <EntryItem
                title="Entry"
            />
            <Book
                title="Journal Name"
            />
            <MenuBar />
        </View>
    );
}
