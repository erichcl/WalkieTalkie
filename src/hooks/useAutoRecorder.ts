import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {TalkingState} from '../reducers/talkingReducer';
import {RootState} from '../store/configureStore';
import usePlayer from './usePlayer';
import useRecorder from './useRecorder';

const stopRecordingDelay = 1000; // in ms

const useAutoRecorder = () => {
  const talkingState = useSelector<RootState, TalkingState>(
    state => state.talking,
  );
  const [recording, setRecording] = useState<boolean>(false);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);
  const {isPlaying, stopPlaying, startPlaying} = usePlayer({
    fileName: 'autoRecord.mp3',
  });
  const recordingRecorderData = useRecorder({fileName: 'autoRecord.mp3'});

  const startRecording = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      return;
    }
    if (recording) {
      return;
    }
    if (talkingState.isTalking) {
      setRecording(true);
      recordingRecorderData.startRecording();
    }
  };

  const stopRecording = () => {
    const timeout = setTimeout(() => {
      setRecording(false);
      setTimeoutId(null);
      recordingRecorderData.stopRecording();
      // recordingPlayerData.startPlaying();
    }, stopRecordingDelay);
    setTimeoutId(timeout);
  };

  useEffect(() => {
    if (!isPlaying) {
      if (talkingState.isTalking) {
        startRecording();
      } else {
        stopRecording();
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [talkingState.isTalking]);

  return {recording, isPlaying, startPlaying, stopPlaying};
};
export default useAutoRecorder;
