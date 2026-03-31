import {View, Text, Button} from 'react-native';
import { useRouter } from 'expo-router';
export default function About(){
    const router = useRouter();
    return(
        <View>
            <Text>About Screen</Text>
            <Button title="Go Back" onPress ={()=>router.back()}/>
        </View>
    )
}
