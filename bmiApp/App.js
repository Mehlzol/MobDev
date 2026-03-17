import React, { useState } from "react";
import { View, Text, TextInput, Button, Image, StyleSheet } from "react-native";

import UnderweightImg from './assets/Underweight.png';
import NormalImg from './assets/Normal.png';
import OverweightImg from './assets/Overweight.png';
import ObeseImg from './assets/Obese.png';

export default function App() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  const calculateBMI = () => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);

    if (!h || !w) return;

    const result = w / (h * h);
    const rounded = result.toFixed(2);
    setBmi(rounded);

    if (result < 18.5) {
      setCategory("Underweight");
      setImage(UnderweightImg);
    } else if (result < 25) {
      setCategory("Normal");
      setImage(NormalImg);
    } else if (result < 30) {
      setCategory("Overweight");
      setImage(OverweightImg);
    } else {
      setCategory("Obese");
      setImage(ObeseImg);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BMI Calculator</Text>

      <TextInput
        style={styles.input}
        placeholder="Height (cm)"
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
      />

      <TextInput
        style={styles.input}
        placeholder="Weight (kg)"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />

      <Button title="Calculate BMI" onPress={calculateBMI} />

      {bmi !== "" && (
        <View style={styles.result}>
          <Text style={styles.text}>BMI: {bmi}</Text>
          <Text style={styles.text}>Category: {category}</Text>
          {image && <Image source={image} style={styles.image} />}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  result: {
    marginTop: 20,
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    marginBottom: 5,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
  },
});