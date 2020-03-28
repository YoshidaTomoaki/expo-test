import * as React from 'react'
import Layout from '../components/Layout'
import { Text, Button, Icon } from 'native-base'
import * as ImagePicker from 'expo-image-picker'
import { View, TouchableOpacity } from 'react-native'
import { Image, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

type Props = {
}

const ImageUploadScreen: React.FC<Props> = () => {

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);
  }

  return(
    <Layout >
      <View style={{
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
      }} >
        <Button 
          iconLeft
          dark
          onPress={openImagePickerAsync}
          style={{
            shadowColor: '#ccc',
            shadowOffset: {
              width: 10,
              height: 10,
            },
            shadowRadius: 0,
            shadowOpacity: 1,
            elevation: 10
          }}
        >
          <Icon name='cog' />
          <Text>Upload</Text>
        </Button>
      </View>
    </Layout>
  )
}

export default ImageUploadScreen