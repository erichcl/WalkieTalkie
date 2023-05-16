import {useEffect} from 'react';

import RNSoundLevel from 'react-native-sound-level';

const MONITOR_INTERVAL = 100; // in ms

const SoundLevelMonitor = async () => {
  //   const [soundLevel, setSoundLevel] = useState<SoundLevelResult>();

  RNSoundLevel.start({
    monitoringInterval: MONITOR_INTERVAL,
    samplingRate: 16000, // default is 22050
  });

  useEffect(() => {
    RNSoundLevel.onNewFrame = data => {
      // see "Returned data" section below
      //   setSoundLevel(data);
      console.log('Sound level info', data);
    };
  }, []);
};

export default SoundLevelMonitor;
