import {useEffect, useMemo, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {startedTalking, stopedTalking} from '../reducers/talkingReducer';
import RNSoundLevel, {SoundLevelResult} from 'react-native-sound-level';

const MONITOR_INTERVAL = 100; // in ms

const useSoundLevelMonitor = () => {
  const [soundLevel, setSoundLevel] = useState<SoundLevelResult>();
  const [isTalking, setIsTalking] = useState(false);
  const checkIsTalking = (rawValue: number) => {
    if (rawValue > 2000) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    RNSoundLevel.stop();
    RNSoundLevel.start({
      monitoringInterval: MONITOR_INTERVAL,
      samplingRate: 16000, // default is 22050
    });

    RNSoundLevel.onNewFrame = data => {
      // see "Returned data" section below
      setSoundLevel(data);
    };
  }, []);

  useEffect(() => {
    if (soundLevel) {
      setIsTalking(checkIsTalking(soundLevel?.rawValue));
    }
  }, [soundLevel]);

  return {soundLevel, isTalking};
};
export default useSoundLevelMonitor;
