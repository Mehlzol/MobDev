import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet
} from 'react-native';

export default function Index() {

  const [todos, setTodos] = useState<{ id: string; title: string }[]>([]);
  const [task, setTask] = useState<string>('');

  const addTodo = () => {
    if (task.trim() === '') return; // optional, prevents empty tasks
    const newTodo = {
      id: Date.now().toString(),
      title: task,
    };

    setTodos([...todos, newTodo]);
    setTask('');
  };

  const TodoItem = ({ title }: { title: string }) => {
    return (
      <View style={styles.todoItem}>
        <Text style={styles.todoText}>{title}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>

      {/* 🔥 Title at Top */}
      <Text style={styles.title}>To Do List</Text>

      {/* 🔥 Input + Button in Same Row */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter a task"
          placeholderTextColor="#888"
          value={task}
          onChangeText={(text) => setTask(text)}
        />

        <TouchableOpacity style={styles.addButton} onPress={addTodo}>
          <Text style={styles.addButtonText}>ADD</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TodoItem title={item.title} />
        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 60,
    backgroundColor: '#1E1E1E', // dark background for visibility
  },

  // 🔥 Title styling
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ffffff', // white text
  },

  // 🔥 Input row
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