import React, {useState} from 'react';
import {StyleSheet, View, Button} from 'react-native';
import {Player} from '@react-native-community/audio-toolkit';

const PlayerComponent = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [player, setPlayer] = useState<Player>();

  const checkEndOfPlayback = async (checkPlayer: Player) => {
    setTimeout(() => {
      const playing = checkPlayer.duration > checkPlayer.currentTime;
      if (!playing) {
        setIsPlaying(playing);
      }
    }, checkPlayer.duration);
  };

  const startPlaying = async () => {
    // const url = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';
    const url = 'desculpe.mp3';
    const newPlayer = new Player(url, {
      autoDestroy: false,
      continuesToPlayInBackground: true,
    });
    console.log(newPlayer);

    newPlayer.play(err => {
      console.log('Play ', err);
      console.log(newPlayer.state);
      console.log(newPlayer);
      checkEndOfPlayback(newPlayer);
    });
    setPlayer(newPlayer);
    setIsPlaying(true);
    console.log(newPlayer.state);
  };

  const stopPlaying = () => {
    if (player) {
      player.stop();
    }
    setIsPlaying(false);
  };

  return (
    <View style={styles.container}>
      <Button
        title={isPlaying ? 'Stop' : 'Play'}
        onPress={isPlaying ? stopPlaying : startPlaying}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PlayerComponent;
