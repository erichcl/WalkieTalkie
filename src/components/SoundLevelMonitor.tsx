import {useEffect, useState} from 'react';

import RNSoundLevel, {SoundLevelResult} from 'react-native-sound-level';

const MONITOR_INTERVAL = 100; // in ms

const SoundLevelMonitor = async (
  setSoundLevel: (data: SoundLevelResult) => void,
) => {
  useEffect(() => {
    RNSoundLevel.stop();
    RNSoundLevel.start({
      monitoringInterval: MONITOR_INTERVAL,
      samplingRate: 16000, // default is 22050
    });

    RNSoundLevel.onNewFrame = data => {
      // see "Returned data" section below
      setSoundLevel(data);
      // console.log('Sound level info', data);
    };
  }, []);
};

export default SoundLevelMonitor;
