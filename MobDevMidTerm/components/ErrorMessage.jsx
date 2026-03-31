import { View, Text, StyleSheet } from 'react-native';

export default function ErrorMessage({ message }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    alignItems: 'center',
  },
  text: {
    color: 'red',
    fontSize: 16,
  },
});