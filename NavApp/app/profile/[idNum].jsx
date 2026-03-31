import {useLocalSearchParams} from 'expo-router';

export default function Profile() {
  const { idNum } = useLocalSearchParams();
  return(
    <View>
        <Text>Profile ID: {idNum}</Text>
    </View>
    )
}