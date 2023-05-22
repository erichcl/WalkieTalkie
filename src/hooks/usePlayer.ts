import {useState} from 'react';
import {Player} from '@react-native-community/audio-toolkit';

export interface PlayerComponentInterface {
  fileName: string;
}

export interface userPlayerInterface {
  startPlaying: () => void;
  stopPlaying: () => void;
  isPlaying: boolean;
}

const usePlayer = ({
  fileName,
}: PlayerComponentInterface): userPlayerInterface => {
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
    const url = fileName || 'desculpe.mp3';
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

  return {startPlaying, stopPlaying, isPlaying};
};

export default usePlayer;
