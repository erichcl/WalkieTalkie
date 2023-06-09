import {useEffect, useState} from 'react';
import RNSoundLevel, {SoundLevelResult} from 'react-native-sound-level';
import {useDispatch} from 'react-redux';
import {startedTalking, stopedTalking} from '../reducers/talkingReducer';

const MONITOR_INTERVAL = 100; // in ms
const defaultThresholdValue = 2500; // in dB

const useSoundLevelMonitor = () => {
  const dispatch = useDispatch();
  const [soundLevel, setSoundLevel] = useState<SoundLevelResult>();
  const [threshold, setThreshold] = useState<number>(defaultThresholdValue);
  const checkIsTalking = (rawValue: number) => {
    return rawValue > threshold;
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
      dispatch(startedTalking());
    } else {
      dispatch(stopedTalking());
    }
    // doesn't make sense to include dispatch on the dependency list of the useEffect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [soundLevel]);

  return {threshold, setThreshold};
};
export default useSoundLevelMonitor;
