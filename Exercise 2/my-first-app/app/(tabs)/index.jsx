import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';

export default function HomeScreen() {

  function goToDetail() {
    router.push('/detail?id=42');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏠 Home</Text>
      <Text style={styles.subtitle}>Welcome to the app!</Text>
      <TouchableOpacity style={styles.button} onPress={goToDetail}>
        <Text style={styles.btnText}>See Details</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center',
    justifyContent: 'center', backgroundColor: '#fff' },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 32 },
  button: { backgroundColor: '#0EA5E9',
    paddingVertical: 14, paddingHorizontal: 32, borderRadius: 10 },
  btnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});