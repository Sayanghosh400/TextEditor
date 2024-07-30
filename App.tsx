import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const App = () => {
  const [fontSize, setFontSize] = useState(16);
  const [fontColor, setFontColor] = useState('black');
  const [fontFamily, setFontFamily] = useState('Roboto');
  const [newText, setNewText] = useState('New Text')

  const [history, setHistory] = useState([
    { fontSize, fontColor, fontFamily, newText }
  ]);
  const historyIndex = useRef(0);

  const updateHistory = () => {
    const currentState = { fontSize, fontColor, fontFamily, newText };
    setHistory([...history.slice(0, historyIndex.current + 1), currentState]);
    historyIndex.current = historyIndex.current + 1;
  };

  const undo = () => {
    if (historyIndex.current > 0) {
      historyIndex.current = historyIndex.current - 1;
      const prevState = history[historyIndex.current];
      setFontSize(prevState.fontSize);
      setFontColor(prevState.fontColor);
      setFontFamily(prevState.fontFamily);
      setNewText(prevState.newText);
    }
  };

  const redo = () => {
    if (historyIndex.current < history.length - 1) {
      historyIndex.current = historyIndex.current + 1;
      const nextState = history[historyIndex.current];
      setFontSize(nextState.fontSize);
      setFontColor(nextState.fontColor);
      setFontFamily(nextState.fontFamily);
      setNewText(nextState.newText);
    }
  };

  const reset = () => {
    const initialState = { fontSize: 16, fontColor: 'black', fontFamily: 'Roboto', newText: 'New Text' };
    setFontSize(initialState.fontSize);
    setFontColor(initialState.fontColor);
    setFontFamily(initialState.fontFamily);
    setNewText(initialState.newText);
    setHistory([initialState]);
    historyIndex.current = 0;
  };

  const increaseFontSize = () => {
    setFontSize(fontSize + 2);
    updateHistory();
  };

  const decreaseFontSize = () => {
    setFontSize(fontSize - 2);
    updateHistory();
  };

  const changeFontColor = (newColor: string) => {
    setFontColor(newColor);
    updateHistory();
  };

  const changeFontStyle = (newStyle: string) => {
    setFontFamily(newStyle);
    updateHistory();
  };

  
  const changeText = (newTextValue : string) => {
    setNewText(newTextValue);
    updateHistory();
  };

  const textStyles: any = {
    fontSize,
    color: fontColor,
    fontFamily,
    fontWeight: 'bold',
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={textStyles}>{newText}</Text>

      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10, padding: 5 }}
        placeholder="Enter Font Color (e.g. red, green)"
        onChangeText={changeFontColor}
      />

      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10, padding: 5 }}
        placeholder="Enter Font Family (e.g. roboto, arial)"
        onChangeText={changeFontStyle}
      />

      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1, margin: 10, padding: 5 }}
        placeholder="Enter New Text"
        onChangeText={changeText}
      />


      <View style={{ margin: 10 }}>
        <Button title="Increase Font Size" onPress={increaseFontSize} />
      </View>

      <View style={{ margin: 10 }}>
        <Button title="Decrease Font Size" onPress={decreaseFontSize} />
      </View>

      <View style={{ flexDirection: 'row', margin: 10 }}>
        <View style={{ marginRight: 10 }}>
          <Button title="Undo" onPress={undo} />
        </View>
        <View style={{ marginLeft: 10, marginRight: 10 }}>
          <Button title="Redo" onPress={redo} />
        </View>
        <View style={{ marginLeft: 10 }}>
          <Button title="Reset" onPress={reset} />
        </View>
      </View>
    </View>
  );
};

export default App;
