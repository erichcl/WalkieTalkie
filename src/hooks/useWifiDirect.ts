import {useEffect, useState} from 'react';
import {PermissionsAndroid} from 'react-native';

import {
  initialize,
  startDiscoveringPeers,
  stopDiscoveringPeers,
  getAvailablePeers,
  connect,
  cancelConnect,
  createGroup,
  removeGroup,
  getGroupInfo,
  // @ts-ignore
} from 'react-native-wifi-p2p';
import device from '../types/device';

const useWifiDirect = () => {
  const [initialized, setInitialized] = useState(false);
  const [discoveringPeers, setDiscoveringPeers] = useState(false);
  const [availablePeers, setAvailablePeers] = useState<device[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [hasGroup, setHasGroup] = useState(false);
  const requestPermission = async () => {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Access to wi-fi P2P mode',
        message: 'ACCESS_FINE_LOCATION',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );

    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.NEARBY_WIFI_DEVICES,
      {
        title: 'Access to nearby wi-fi devices',
        message: 'NEARBY_WIFI_DEVICES',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
  };

  const loadAvailablePeers = async () => {
    if (!initialized || !discoveringPeers) {
      throw new Error(
        'WifiDirect is not initialized or is not discovering peers',
      );
    }

    getAvailablePeers()
      .then(({devices}) => {
        console.log('getAvailablePeers');
        console.log(devices);
        if (devices) {
          setAvailablePeers(devices);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const connectPeer = async (peer: device) => {
    connect(peer.deviceAddress)
      .then(() => {
        console.log('Successfully connected');
        setIsConnected(true);
      })
      .catch(err => console.error('Something gone wrong. Details: ', err));
  };

  const disconnectPeer = async () => {
    cancelConnect()
      .then(() => {
        console.log('Successfully disconnected');
        setIsConnected(false);
      })
      .catch(err => console.error('Something gone wrong. Details: ', err));
  };

  const newGroup = async () => {
    createGroup()
      .then(() => {
        console.log('Group created successfully!');
        setHasGroup(true);
      })
      .catch(err => console.error('Something gone wrong. Details: ', err));
    console.log(getGroupInfo());
  };

  const closeGroup = async () => {
    removeGroup()
      .then(() => {
        console.log("Currently you don't belong to group!");
        setHasGroup(false);
      })
      .catch(err => console.error('Something gone wrong. Details: ', err));
  };

  useEffect(() => {
    const initWifiDirect = async () => {
      try {
        console.log('useWifiDirect');
        await requestPermission();

        await initialize();
        setInitialized(true);
        console.log('startDiscoveringPeers');
        startDiscoveringPeers()
          .then(() => {
            console.log('Starting of discovering was successful');
            setDiscoveringPeers(true);
          })
          .catch(err => {
            console.error(
              `Something is gone wrong. Maybe your WiFi is disabled? Error details: ${err}`,
            );
            console.log(err);
          });
      } catch (e) {
        console.log('error', e);
      }

      return () => {
        stopDiscoveringPeers();
        if (hasGroup) {
          closeGroup();
        }
        if (isConnected) {
          disconnectPeer();
        }
      };
    };

    initWifiDirect();

    //   PermissionsAndroid.request(
    //     PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    //     {
    //       title: 'Access to read',
    //       message: 'READ_EXTERNAL_STORAGE',
    //     },
    //   )
    //     .then(granted => {
    //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    //         console.log('You can use read operation');
    //       } else {
    //         console.log('Read operation permission denied');
    //       }
    //     })
    //     .then(() => {
    //       return PermissionsAndroid.request(
    //         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    //         {
    //           title: 'Access to write',
    //           message: 'WRITE_EXTERNAL_STORAGE',
    //         },
    //       );
    //     })
    //     .then(() => {
    //       // `/storage/emulated/0/Music/Bullet For My Valentine:Letting You Go.mp3` - example of `pathToFIle`
    //       return sendFile('path/to/file')
    //         .then(metaInfo => console.log('File sent successfully:', metaInfo))
    //         .catch(err => console.log('Error while file sending', err));
    //     })
    //     .catch(err => console.log(err));
  }, []);

  return {
    loadAvailablePeers,
    availablePeers,
    connectPeer,
    disconnectPeer,
    isConnected,
    newGroup,
    closeGroup,
    hasGroup,
  };
};

export default useWifiDirect;
