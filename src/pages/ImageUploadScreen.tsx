import * as React from 'react'
import Layout from '../components/Layout'
import { Text, Button, Icon, Card, CardItem, Left, Body } from 'native-base'
import * as ImagePicker from 'expo-image-picker'
import { View, Image, Dimensions } from 'react-native'
import firebase from 'firebase';
import 'firebase/firestore';
import { decode, encode } from 'base-64'

type Props = {
}

const ImageUploadScreen: React.FC<Props> = () => {

  const [user, setUser] = React.useState({})
  const [url, setUrl] = React.useState('https://firebasestorage.googleapis.com/v0/b/expo-test-f6de1.appspot.com/o/0.2942569366762261.jpg?alt=media&token=acadf2e7-b312-4e2c-acfb-5a9fee7cd0a9')
  const [postId, setPostId] = React.useState(null)

  // expo-error https://github.com/expo/expo/issues/7507
    // @ts-ignore
    global.crypto = require("@firebase/firestore");
    // @ts-ignore
    global.crypto.getRandomValues = byteArray => { for (let i = 0; i < byteArray.length; i++) { byteArray[i] = Math.floor(256 * Math.random()); } }
    // @ts-ignore
    if (!global.btoa) { global.btoa = encode; }
    // @ts-ignore
    if (!global.atob) { global.atob = decode; }

  firebase.auth().onAuthStateChanged(user => {
    if (!user) {
      firebase.auth().signInAnonymously()
      setUser(user)
    }
    setUser(user)
  })

  const uploadPost = async( uid = 'NoUser', url) => {
    const imageId: string = String(Math.random())

    // ローカルfileパスをblobへ変換
    const response = await fetch(url)
    const blob = await response.blob()

    // firestorageへアップロード
    const childRef = firebase.storage().ref().child(imageId+'.jpg')
    await childRef.put(blob)

    // strageからのダウンロードURLを取得
    const downloadUrl = await childRef
      .getDownloadURL()
      .then((url)=>url)
      .catch((e)=>console.log(e))

    // firestoreへポスト情報を格納
    const docRef = await firebase.firestore().collection('post').doc()
    await docRef.set({ imageUrl: downloadUrl, fileUrl: imageId, uid: uid})
      .then(()=>console.log('success!!' ))

    // firestoreからURLを取得
    return docRef.get().then((doc)=>{
      if(!doc.exists) return

      console.log('!!!!!!!!!1',doc)

      return { id: doc.id, ...doc.data() }
    })
  }

  const openImagePickerAsync = async () => {
    // カメラロール認証
    const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!")
      return
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        mediaTypes: ImagePicker.MediaTypeOptions.Images
    });
    // @ts-ignore
    console.log( 'user', user?.uid, 'pickerResult', pickerResult )

    // 画像をfirestoreへアップロード
    // @ts-ignore
    const {id, imageUrl, uid} = await uploadPost(user?.uid, pickerResult.uri)
    console.log('!!!!!!!',id, imageUrl, uid)
    setUrl(imageUrl)
    setPostId(id)

  }


  return(
    <Layout >
      <View style={{
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }} >
        <Card>
          <CardItem>
            <Left>
              <Body>
                <Text>Upload Image</Text>
              </Body>
            </Left>
            </CardItem>
            <CardItem cardBody>
              <Image style={{height: 200, width: 200, borderRadius: 50, margin: 50}} source={{uri: url}}/>
          </CardItem>
        </Card>
        {postId &&
        <Button
          iconLeft
          bordered
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
          <Text>Analyze!!</Text>
        </Button>}
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
