import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  StatusBar
} from 'react-native';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');

  const addTodo = () => {
    if (task.trim() === '') return;
    const newTodo = {
      id: Date.now().toString(),
      title: task,
    };
    setTodos([...todos, newTodo]);
    setTask('');
  };

  const TodoItem = ({ title }) => (
    <View style={styles.todoItem}>
      <Text style={styles.todoText}>{title}</Text>
    </View>
  );

  return (
    // 🔹 SafeAreaView ensures content is visible in notch/status bar areas
    <SafeAreaView style={styles.safeArea}>
      {/* 🔹 StatusBar color */}
      <StatusBar barStyle="light-content" backgroundColor="#1E1E1E" />

      <View style={styles.container}>
        {/* Title */}
        <Text style={styles.title}>To Do List</Text>

        {/* Input + Add button */}
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder="Enter a task"
            placeholderTextColor="#888"
            value={task}
            onChangeText={setTask}
          />
          <TouchableOpacity style={styles.addButton} onPress={addTodo}>
            <Text style={styles.addButtonText}>ADD</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={todos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <TodoItem title={item.title} />}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1E1E1E', // dark background extends into status bar
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20, // spacing below SafeAreaView
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    color: '#000000',
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: '#007AFF',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  todoItem: {
    backgroundColor: '#f2f2f2',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
  },
  todoText: {
    fontSize: 16,
  },
});