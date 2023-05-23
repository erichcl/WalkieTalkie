import React from 'react';
import {Text, useColorScheme, View} from 'react-native';

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

  return (
    <ScreenWrapper>
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }}>
        <Section title="Play">
          <PlayerComponent
            startPlaying={examplePlayerData.startPlaying}
            stopPlaying={examplePlayerData.stopPlaying}
            isPlaying={examplePlayerData.isPlaying}
          />
        </Section>
        <Section title="Record and Play">
          <Section title="">
            <RecorderComponent
              startRecording={recordingRecorderData.startRecording}
              stopRecording={recordingRecorderData.stopRecording}
              isRecording={recordingRecorderData.isRecording}
            />
          </Section>
          <Section title="">
            <PlayerComponent
              startPlaying={recordingPlayerData.startPlaying}
              stopPlaying={recordingPlayerData.stopPlaying}
              isPlaying={recordingPlayerData.isPlaying}
            />
          </Section>
        </Section>
        <Section title="Talking">
          {useSoundLevel.isTalking && <Text>Talking</Text>}
        </Section>
        <Section title="Redux">
          {talkingState.isTalking && <Text>Talking Selector</Text>}
        </Section>
      </View>
    </ScreenWrapper>
  );
}
export default HomeScreen;
