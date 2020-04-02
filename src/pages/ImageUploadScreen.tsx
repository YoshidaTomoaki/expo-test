import * as React from 'react'
import Layout from '../components/Layout'
import { Text, Button, Icon } from 'native-base'
import * as ImagePicker from 'expo-image-picker'
import { View, TouchableOpacity } from 'react-native'
import { Image, Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import firebase from 'firebase';
import 'firebase/firestore';
import { decode, encode } from 'base-64'

type Props = {
}

const ImageUploadScreen: React.FC<Props> = () => {

  const [user, setUser] = React.useState({})
  const [init, setInit] = React.useState(false) 

  if(!init) {

    firebase.initializeApp({
      
    })

    // expo-error https://github.com/expo/expo/issues/7507
    // @ts-ignore
    global.crypto = require("@firebase/firestore");
    // @ts-ignore
    global.crypto.getRandomValues = byteArray => { for (let i = 0; i < byteArray.length; i++) { byteArray[i] = Math.floor(256 * Math.random()); } }

    // @ts-ignore
    if (!global.btoa) { global.btoa = encode; }

    // @ts-ignore
    if (!global.atob) { global.atob = decode; }

    setInit(true)

  }

  firebase.auth().onAuthStateChanged(user => {
    console.log( 'user:', user )
    if (!user) {
      firebase.auth().signInAnonymously()
      setUser(user)
    }
    setUser(user)
  })



  const uploadPost = async( uid, url) => {
    const uploadRef = await firebase.firestore().collection('post').doc(String(uid))

    uploadRef.set({ imageUrl: url}).then(()=>{ console.log('success!!' )})
  }

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!")
      return
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    // @ts-ignore
    console.log( 'user', user.uid, 'pickerResult', pickerResult.uri )

    // @ts-ignore
    uploadPost(user.uid, pickerResult.uri)

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