/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
} from 'react-native/Libraries/NewAppScreen';

import PlayerComponent from './src/components/Player';
import RecorderComponent from './src/components/Recorder';
import usePlayer from './src/hooks/usePlayer';
import useRecorder from './src/hooks/useRecorder';
import useSoundLevelMonitor from './src/hooks/useSoundLevelMonitor';

import {useSelector, useDispatch} from 'react-redux';
import {startedTalking, stopedTalking} from './src/reducers/talkingReducer';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
}

function App(): JSX.Element {
  const dispatch = useDispatch();
  const isDarkMode = useColorScheme() === 'dark';
  // const [soundLevel, setSoundLevel] = useState<SoundLevelResult>();

  const examplePlayerData = usePlayer({fileName: 'desculpe.mp3'});
  const recordingPlayerData = usePlayer({fileName: 'gravacao.mp3'});
  const recordingRecorderData = useRecorder({fileName: 'gravacao.mp3'});
  const useSoundLevel = useSoundLevelMonitor();

  // SoundLevelMonitor(setSoundLevel);
  // console.log('soundLevel app ', useSoundLevel.soundLevel);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
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
          <Section title="Debug">
            <DebugInstructions />
          </Section>
          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>
          <LearnMoreLinks />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
