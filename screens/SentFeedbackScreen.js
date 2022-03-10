import { View,  ImageBackground,} from 'react-native';
import styles from "../Styles";
import feedbackSent from '../assets/backgrounds/feedbackSent.png'
import MenuBar from '../components/menubar';

export default function SentFeedbackScreen(props) {
    return (

            <View style={styles.container}>
                <ImageBackground source={feedbackSent} resizeMode="stretch" style={styles.image}>
                <MenuBar onHomePress={() => props.navigation.navigate("HomeScreenTeamMember", { journal: props.route.params.journal, user: props.route.params.user })} onCalendarPress={() => props.navigation.navigate("CalendarScreen", { journal: props.route.params.journal, user: props.route.params.user })}/>
                </ImageBackground>
            </View>

    );
}