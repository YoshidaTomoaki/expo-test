import React, { useState, useEffect } from "react"
import Layout from "../components/Layout"
import CardList from "../components/CardList"
import { Spinner, View } from "native-base"


const getPhotos = () => {
  return fetch('https://picsum.photos/v2/list')
    .then(res => res.json())
    .catch(error => console.error(error))
}

type Props = {
}

const HomeScreen: React.FC<Props> = () => {

  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let unmounted = false;
    const init = async () => {
      const photos = await getPhotos()
      if (!unmounted) {
        setLoading(false)
        setPhotos(photos)
      }
    }
    init();
    return () => {
      unmounted = true;
    };
  }, [photos])

  const content = loading ? <Spinner /> : <Spinner /> //<CardList photos={photos} />

  return <Layout><View style={{ paddingTop: 66 }}/>{content}</Layout>
};

export default HomeScreen