import {View, Text, StyleSheet} from 'react-native';
import { Link } from 'expo-router';
export default function Home(){
    return(
        <View style={styles.container}>
            <Text>Home Screen</Text>
            <Link href="/about">
            Go to About
            </Link>
            <Link href="/profile/123" style={{ marginTop: 12 }}>
            Go to Profile 123
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});