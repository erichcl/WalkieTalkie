import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {TalkingState} from '../reducers/talkingReducer';
import {RootState} from '../store/configureStore';

const stopRecordingDelay = 1000; // in ms

const useAutoRecorder = () => {
  const talkingState = useSelector<RootState, TalkingState>(
    state => state.talking,
  );
  const [recording, setRecording] = useState<boolean>(false);
  const [timeoutId, setTimeoutId] = useState<number | null>(null);

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
    }
  };

  const stopRecording = () => {
    const timeout = setTimeout(() => {
      setRecording(false);
      setTimeoutId(null);
      console.log('stopRecording');
    }, stopRecordingDelay);
    setTimeoutId(timeout);
  };

  useEffect(() => {
    if (talkingState.isTalking) {
      startRecording();
    } else {
      stopRecording();
    }
    console.log('isTalking', talkingState.isTalking);
    console.log('isRecording', recording);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [talkingState.isTalking]);

  return {recording};
};
export default useAutoRecorder;
