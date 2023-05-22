import React from 'react';
import {StyleSheet, View, Button} from 'react-native';
import {userPlayerInterface} from '../hooks/usePlayer';

const PlayerComponent = ({
  stopPlaying,
  startPlaying,
  isPlaying,
}: userPlayerInterface) => {
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
