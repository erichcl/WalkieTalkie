import {useEffect, useState} from 'react';
import RNSoundLevel, {SoundLevelResult} from 'react-native-sound-level';
import {useDispatch} from 'react-redux';
import {startedTalking, stopedTalking} from '../reducers/talkingReducer';

const MONITOR_INTERVAL = 100; // in ms

const useSoundLevelMonitor = () => {
  const dispatch = useDispatch();
  const [soundLevel, setSoundLevel] = useState<SoundLevelResult>();
  const [isTalking, setIsTalking] = useState<boolean>(false);
  const checkIsTalking = (rawValue: number) => {
    if (rawValue > 2000) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    RNSoundLevel.start({
      monitoringInterval: MONITOR_INTERVAL,
      samplingRate: 16000, // default is 22050
    });

    RNSoundLevel.onNewFrame = data => {
      // see "Returned data" section below
      setSoundLevel(data);
    };
    return () => RNSoundLevel.stop();
  }, []);

  useEffect(() => {
    if (soundLevel && checkIsTalking(soundLevel.rawValue)) {
      setIsTalking(true);
      dispatch(startedTalking());
    } else {
      setIsTalking(false);
      dispatch(stopedTalking());
    }
    // doesn't make sense to include dispatch on the dependency list of the useEffect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [soundLevel]);

  return {soundLevel, isTalking};
};
export default useSoundLevelMonitor;
