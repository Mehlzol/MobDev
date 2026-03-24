import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function DetailScreen() {
  const { id, name, course, yearEnrolled, yearLevel } = useLocalSearchParams();
  const router = useRouter();

  const getYearLevelText = (level) => {
    const levels = ['Freshman', 'Sophomore', 'Junior', 'Senior'];
    return levels[parseInt(level) - 1] || 'Unknown';
  };

  const handleDelete = () => {
    router.push({
      pathname: '/', 
      params: { deletedId: parseInt(id) },
    });
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Student Details</Text>
      <View style={styles.detailContainer}>
        <Text style={styles.detailText}>ID: {id}</Text>
        <Text style={styles.detailText}>Name: {name}</Text>
        <Text style={styles.detailText}>Course: {course}</Text>
        <Text style={styles.detailText}>Year Enrolled: {yearEnrolled}</Text>
        <Text style={styles.detailText}>Year Level: {getYearLevelText(yearLevel)}</Text>
      </View>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteText}>Delete Student</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  detailContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  detailText: {
    fontSize: 18,
    marginBottom: 10,
    color: '#333',
  },
});
