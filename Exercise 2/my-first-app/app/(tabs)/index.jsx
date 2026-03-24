import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { router } from 'expo-router';

export default function HomeScreen() {
  const [students, setStudents] = useState([
    { id: 1, name: 'John Doe', course: 'Computer Science', yearEnrolled: 2023, yearLevel: 3 },
    { id: 2, name: 'Jane Smith', course: 'Engineering', yearEnrolled: 2022, yearLevel: 4 },
    { id: 3, name: 'Bob Johnson', course: 'Business', yearEnrolled: 2024, yearLevel: 2 },
  ]);

  const [newId, setNewId] = useState('');
  const [newName, setNewName] = useState('');
  const [newCourse, setNewCourse] = useState('');
  const [newYearEnrolled, setNewYearEnrolled] = useState('');
  const [newYearLevel, setNewYearLevel] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  const [errors, setErrors] = useState({});

  const validateInputs = () => {
    let newErrors = {};

    // ID
    if (!newId || isNaN(newId)) {
      newErrors.id = true;
    } else if (students.some(s => s.id === parseInt(newId))) {
      newErrors.id = true;
    }

    // Name
    if (!newName || !/^[A-Za-z\s]+$/.test(newName)) {
      newErrors.name = true;
    }

    // Course (tech only)
    const coursePattern = /^(BS)?(CS|IT|IS|DS)$/i;

    if (!newCourse || !coursePattern.test(newCourse.trim())) {
      newErrors.course = true;
    }

    // Year Enrolled
    if (!newYearEnrolled || isNaN(newYearEnrolled) || newYearEnrolled < 2000 || newYearEnrolled > 2100) {
      newErrors.yearEnrolled = true;
    }

    // Year Level
    if (!newYearLevel || isNaN(newYearLevel) || newYearLevel < 1 || newYearLevel > 4) {
      newErrors.yearLevel = true;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addStudent = () => {
    if (!validateInputs()) return;

    setStudents([
      ...students,
      {
        id: parseInt(newId),
        name: newName,
        course: newCourse,
        yearEnrolled: parseInt(newYearEnrolled),
        yearLevel: parseInt(newYearLevel),
      },
    ]);

    setNewId('');
    setNewName('');
    setNewCourse('');
    setNewYearEnrolled('');
    setNewYearLevel('');
    setErrors({});
  };

  const deleteStudent = (id) => {
    setStudents(students.filter(student => student.id !== id));
  };

  useEffect(() => {
  if (router.params?.deletedId) {
    deleteStudent(router.params.deletedId); // remove student
    router.replace('/'); // clear deletedId param
  }
}, [router.params]);

  const goToDetail = (student) => {
    router.push({
      pathname: '/detail',
      params: student,
    });
  };

  const renderStudent = ({ item }) => (
  <View style={styles.studentItem}>
    <TouchableOpacity
      onPress={() => goToDetail(item)} // just navigate
      style={styles.nameContainer}
    >
      <Text style={styles.studentName}>{item.name}</Text>
    </TouchableOpacity>
  </View>
);

  const hasErrors = Object.keys(errors).length > 0;

    return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>Student List</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, errors.id && styles.errorInput]}
            placeholder="ID"
            placeholderTextColor="gray"
            value={newId}
            onChangeText={setNewId}
            keyboardType="numeric"
          />

          <TextInput
            style={[styles.input, errors.name && styles.errorInput]}
            placeholder="Name"
            placeholderTextColor="gray"
            value={newName}
            onChangeText={setNewName}
          />

          <TextInput
            style={[styles.input, errors.course && styles.errorInput]}
            placeholder="Course "
            placeholderTextColor="gray"
            value={newCourse}
            onChangeText={(text) => setNewCourse(text.toUpperCase())}
          />

          <TextInput
            style={[styles.input, errors.yearEnrolled && styles.errorInput]}
            placeholder="Year Enrolled"
            placeholderTextColor="gray"
            value={newYearEnrolled}
            onChangeText={setNewYearEnrolled}
            keyboardType="numeric"
          />

          <TextInput
            style={[styles.input, errors.yearLevel && styles.errorInput]}
            placeholder="Year Level"
            placeholderTextColor="gray"
            value={newYearLevel}
            onChangeText={setNewYearLevel}
            keyboardType="numeric"
          />

          <TouchableOpacity
            style={[styles.addButton, hasErrors && styles.errorButton]}
            onPress={addStudent}
          >
            <Text style={styles.addText}>
              {hasErrors ? 'Invalid Inputs' : 'Add Student'}
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={students}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => router.push({
              pathname: '/detail',
              params: item,
              // pass deleteStudent function via context or props
            })}>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  inputContainer: { marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  errorInput: {
    borderColor: 'red',
  },
  addButton: {
    backgroundColor: '#0EA5E9',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  errorButton: {
    backgroundColor: 'red',
  },
  addText: { color: '#fff', fontWeight: 'bold' },
  studentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  studentName: { fontSize: 18, fontWeight: 'bold' },
  deleteButton: {
    backgroundColor: '#ff4444',
    padding: 8,
    borderRadius: 5,
  },
  deleteText: { color: '#fff' },
  screen: {
  flex: 1,
  backgroundColor: '#f3f4f6',
  justifyContent: 'center',
  alignItems: 'center',
},

container: {
  width: '95%',
  maxWidth: 500,
  backgroundColor: '#fff',
  padding: 20,
  borderRadius: 15,

  // Shadow (iOS)
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 5,

  // Shadow (Android)
  elevation: 5,
},
});