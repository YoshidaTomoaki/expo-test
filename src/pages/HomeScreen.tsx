import React, { useState, useEffect } from "react"
import Layout from "../components/Layout"
import CardList from "../components/CardList"
import { Spinner, View } from "native-base"
import firebase from 'firebase';
import 'firebase/firestore';


    
const getPhotos = async(user) => {

  const postCol = firebase.firestore().collection('post')

  let photos = []

  await postCol
    .where('uid', '==', '2KxMDRiPetbfTxVcU91GQV6IVPf2')
    .get()
    .then((querySnapshot)=>{
      querySnapshot.forEach((doc)=>{
        const {uid, fileUrl, imageUrl} = doc.data()
        const id = doc.id
        photos.push({id, uid, fileUrl, imageUrl})
      })
    })
    .catch((e)=>console.log(e))

  return photos
}

type Props = {
}

const HomeScreen: React.FC<Props> = () => {

  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState({})

  // expo-error https://github.com/expo/expo/issues/7507
    // @ts-ignore
    global.crypto = require("@firebase/firestore");
    // @ts-ignore
    global.crypto.getRandomValues = byteArray => { for (let i = 0; i < byteArray.length; i++) { byteArray[i] = Math.floor(256 * Math.random()); } }
    

  firebase.auth().onAuthStateChanged(user => {
    if (!user) {
      firebase.auth().signInAnonymously()
      setUser(user)
    }
    setUser(user)
  })

  useEffect(() => {

    let unmounted = false;
    const init = async () => {
      const photos = await getPhotos(user)
      setPhotos(photos)
      
      if (!unmounted) {
        setLoading(false)
      }
    }
    init()
    

    unmounted = true
  }, [])

  const content = <CardList photos={photos} />

  return <Layout><View style={{ paddingTop: 66 }}/>{content}</Layout>
};

export default HomeScreen