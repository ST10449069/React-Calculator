import React, { useState } from 'react';
import { SafeAreaView, Text, StyleSheet, View, Button, TextInput } from 'react-native';
import { Card } from 'react-native-paper';

export default function App() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handlePress = (value) => {
    setInput(prevInput => prevInput + value);
  };

  const handleOperation = (operation) => {
    setInput(prevInput => prevInput + ' ' + operation + ' ');
  };

  const calculateResult = () => {
    try {
      let expression = input;
      expression = expression.replace(/\√/g, 'Math.sqrt');
      expression = expression.replace(/\^/g, '**');
      const evalResult = eval(expression);
      setResult(evalResult.toString());
    } catch (error) {
      setResult('Error');
    }
  };

  const clearInput = () => {
    setInput('');
    setResult('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Calculator</Text>
      <Card style={styles.card}>
        <TextInput
          style={styles.display}
          value={input}
          placeholder="0"
          editable={false}
        />
        <TextInput
          style={styles.result}
          value={result}
          placeholder="Result"
          editable={false}
        />
        <View style={styles.buttonRow}>
          {['7', '8', '9', '/'].map(btn => (
            <Button key={btn} title={btn} onPress={() => handlePress(btn)} />
          ))}
        </View>
        <View style={styles.buttonRow}>
          {['4', '5', '6', '*'].map(btn => (
            <Button key={btn} title={btn} onPress={() => handlePress(btn)} />
          ))}
        </View>
        <View style={styles.buttonRow}>
          {['1', '2', '3', '-'].map(btn => (
            <Button key={btn} title={btn} onPress={() => handlePress(btn)} />
          ))}
        </View>
        <View style={styles.buttonRow}>
          {['0', '.', '√', '+'].map(btn => (
            <Button key={btn} title={btn} onPress={() => handleOperation(btn)} />
          ))}
        </View>
        <View style={styles.buttonRow}>
          <Button title="^" onPress={() => handleOperation('^')} />
          <Button title="C" onPress={clearInput} />
          <Button title="=" onPress={calculateResult} />
        </View>
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  title: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  card: {
    padding: 16,
    borderRadius: 8,
  },
  display: {
    width: '100%',
    fontSize: 40,
    marginBottom: 10,
    textAlign: 'right',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    backgroundColor: '#fff',
  },
  result: {
    width: '100%',
    fontSize: 30,
    marginBottom: 20,
    textAlign: 'right',
    padding: 10,
    color: '#555',
    backgroundColor: '#fff',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
});
