import * as React from 'react';
import Layout from '../components/Layout';
import { Text, View, Button } from 'native-base';
import { Dimensions } from 'react-native';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

type Props = {};

const CameraScreen: React.FC<Props> = () => {
  const ImageChoiceAndUpload = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      if (status !== 'granted') {
        alert('利用には許可が必要です。');

        return;
      }
    }

    const result = await ImagePicker.launchCameraAsync();
  };

  return (
    <Layout>
      <View
        style={{
          width: Dimensions.get('screen').width,
          height: Dimensions.get('screen').height,
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <Button light onPress={ImageChoiceAndUpload}>
          <Text>・ω・</Text>
        </Button>
      </View>
    </Layout>
  );
};

export default CameraScreen;
