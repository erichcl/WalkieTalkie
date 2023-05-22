import {useState} from 'react';
import {Recorder} from '@react-native-community/audio-toolkit';

export interface RecorderComponentInterface {
  fileName: string;
}

export interface useRecorderInterface {
  isRecording: boolean;
  startRecording: () => void;
  stopRecording: () => void;
}

const useRecorder = ({fileName}: RecorderComponentInterface) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState<Recorder>();

  const startRecording = async () => {
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

  return {isRecording, startRecording, stopRecording};
};

export default useRecorder;
