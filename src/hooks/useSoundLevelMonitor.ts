import {useEffect, useState} from 'react';
import RNSoundLevel, {SoundLevelResult} from 'react-native-sound-level';

const MONITOR_INTERVAL = 100; // in ms

const useSoundLevelMonitor = () => {
  const [soundLevel, setSoundLevel] = useState<SoundLevelResult>();
  const [isMonitoring, setIsMonitoring] = useState<Boolean>(false);
  const [isTalking, setIsTalking] = useState<Boolean>(false);
  const checkIsTalking = (rawValue: number) => {
    if (rawValue > 2000) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (isMonitoring) {
      RNSoundLevel.stop();
    }
    RNSoundLevel.start({
      monitoringInterval: MONITOR_INTERVAL,
      samplingRate: 16000, // default is 22050
    });
    setIsMonitoring(true);

    RNSoundLevel.onNewFrame = data => {
      // see "Returned data" section below
      setSoundLevel(data);
    };
  }, []);

  useEffect(() => {
    if (soundLevel && checkIsTalking(soundLevel?.rawValue)) {
      setIsTalking(true);
    } else {
      setIsTalking(false);
    }
  }, [soundLevel]);

  return {soundLevel, isTalking};
};
export default useSoundLevelMonitor;
