import React from 'react';
import {
  Button,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
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
import useWifiDirect from '../hooks/useWifiDirect';
import device from '../types/device';

function HomeScreen() {
  const talkingState = useSelector<RootState, TalkingState>(
    state => state.talking,
  );

  const isDarkMode = useColorScheme() === 'dark';

  const examplePlayerData = usePlayer({fileName: 'desculpe.mp3'});
  const recordingPlayerData = usePlayer({fileName: 'gravacao.mp3'});
  const recordingRecorderData = useRecorder({fileName: 'gravacao.mp3'});
  // const useSoundLevel = useSoundLevelMonitor();
  // const autoRecorder = useAutoRecorder();
  const wifiDirect = useWifiDirect();

  const loadPeers = async () => {
    await wifiDirect.loadAvailablePeers();
    console.log('HomeScreen');
    console.log(wifiDirect.availablePeers);
  };

  const onClickPeer = async (peer: device) => {
    console.log('onClickDevice');
    wifiDirect.connectPeer(peer);
  };

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
        <Section title="Wifi Direct">
          <View
            style={{
              flex: 1,
              width: '100%',
              padding: 0,
              flexDirection: 'column',
            }}>
            <View
              style={{
                flex: 1,
                width: '100%',
                marginBottom: 5,
                backgroundColor: 'red',
              }}>
              {!wifiDirect.hasGroup && (
                <Button
                  title="Create Group"
                  onPress={() => wifiDirect.newGroup()}
                />
              )}
              {wifiDirect.hasGroup && (
                <Button
                  title="Close Group"
                  onPress={() => wifiDirect.closeGroup()}
                />
              )}
            </View>
            <View
              style={{
                flex: 1,
                width: '100%',
                marginBottom: 5,
                backgroundColor: 'red',
              }}>
              <Button title="Load Peers" onPress={loadPeers} />
            </View>
            <View style={{flex: 2, width: '100%'}}>
              {!wifiDirect.isConnected &&
                wifiDirect.availablePeers.map(peer => (
                  <TouchableOpacity
                    key={peer.deviceAddress}
                    onPress={() => onClickPeer(peer)}
                    style={{
                      margin: 5,
                      padding: 15,
                      width: '100%',
                      borderColor: 'black',
                      borderWidth: 2,
                      backgroundColor: 'darkorange',
                    }}>
                    <Text>Addr: {peer.deviceAddress}</Text>
                    <Text>Name: {peer.deviceName}</Text>
                  </TouchableOpacity>
                ))}
              {wifiDirect.isConnected && (
                <Button
                  title={'Disconnect'}
                  onPress={wifiDirect.disconnectPeer}
                />
              )}
            </View>
          </View>
        </Section>
        {/* <Section title="Recording">
          {autoRecorder.recording && <Text>Recording</Text>}
          <PlayerComponent
            isPlaying={autoRecorder.isPlaying}
            startPlaying={autoRecorder.startPlaying}
            stopPlaying={autoRecorder.stopPlaying}
          />
        </Section> */}
      </View>
    </ScreenWrapper>
  );
}
export default HomeScreen;
