import React from 'react';
import {Button, Text, useColorScheme, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

// components
import PlayerComponent from '../components/Player';
import RecorderComponent from '../components/Recorder';
import Section from '../components/Section';
import ScreenWrapper from '../components/ScreenWrapper';

// hooks
import usePlayer from '../hooks/usePlayer';
import useRecorder from '../hooks/useRecorder';
import useSoundLevelMonitor from '../hooks/useSoundLevelMonitor';
import useAutoRecorder from '../hooks/useAutoRecorder';

// Redux imports
import {useSelector} from 'react-redux';
import {TalkingState} from '../reducers/talkingReducer';
import {RootState} from '../store/configureStore';

function HomeScreen() {
  const talkingState = useSelector<RootState, TalkingState>(
    state => state.talking,
  );

  const isDarkMode = useColorScheme() === 'dark';

  const examplePlayerData = usePlayer({fileName: 'desculpe.mp3'});
  const recordingPlayerData = usePlayer({fileName: 'gravacao.mp3'});
  const recordingRecorderData = useRecorder({fileName: 'gravacao.mp3'});
  const useSoundLevel = useSoundLevelMonitor();
  const autoRecorder = useAutoRecorder();

  return (
    <ScreenWrapper>
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }}>
        <Section title="Play">
          <PlayerComponent {...examplePlayerData} />
        </Section>
        <Section title="Record and Play">
          <Section title="">
            <RecorderComponent {...recordingRecorderData} />
          </Section>
          <Section title="">
            <PlayerComponent {...recordingPlayerData} />
          </Section>
        </Section>
        <Section title="Redux">
          {talkingState.isTalking && <Text>Talking Selector</Text>}
        </Section>
        <Section title="Recording">
          {autoRecorder.recording && <Text>Recording</Text>}
          <PlayerComponent
            isPlaying={autoRecorder.isPlaying}
            startPlaying={autoRecorder.startPlaying}
            stopPlaying={autoRecorder.stopPlaying}
          />
        </Section>
      </View>
    </ScreenWrapper>
  );
}
export default HomeScreen;
