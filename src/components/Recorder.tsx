import React, {useState} from 'react';
import {StyleSheet, View, Button} from 'react-native';
import {Recorder} from '@react-native-community/audio-toolkit';

export interface RecorderComponentInterface {
  fileName: string;
}

const RecorderComponent = ({fileName}: RecorderComponentInterface) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState<Recorder>();

  const startRecording = async () => {
    // const url = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
    const url = fileName || 'gravacao.mp3';
    const newRecorder = new Recorder(url, {
      bitrate: 128000,
      channels: 1,
      sampleRate: 44100,
      quality: 'low',
      format: 'mp3',
      encoder: 'mp4',
    });
    console.log(newRecorder);

    newRecorder.record();
    setRecorder(newRecorder);
    setIsRecording(true);
    console.log(newRecorder.state);
  };

  const stopRecording = () => {
    if (recorder) {
      recorder.stop();
    }
    setIsRecording(false);
  };

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
