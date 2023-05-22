import React from 'react';
import {StyleSheet, View, Button} from 'react-native';
import {useRecorderInterface} from '../hooks/useRecorder';

const RecorderComponent = ({
  isRecording,
  startRecording,
  stopRecording,
}: useRecorderInterface) => {
  return (
    <View style={styles.container}>
      <Button
        title={isRecording ? 'Stop' : 'Record'}
        onPress={isRecording ? stopRecording : startRecording}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RecorderComponent;
