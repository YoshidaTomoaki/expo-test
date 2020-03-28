import React from "react"
import {
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  Card,
  CardItem,
  Thumbnail
} from "native-base";
import { Image } from "react-native"

export interface Photo {
  download_url: string
  id: string
  author: string
}

type Props = {
  photos: Photo[]
}

const CardList: React.FC<Props> = (props) => {
  console.log(props.photos)
  return (
    <>
      {props.photos.map(photo => (
        <Card key={photo.id}>
          <CardItem>
            <Left>
              <Thumbnail
                source={{
                  uri: `https://na.ui-avatars.com/api/?name=${photo.author.replace(
                    "¥s",
                    "+"
                  )}`
                }}
              />
              <Body>
                <Text>My Image</Text>
                <Text note>{photo.author}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Image
              source={{ uri: photo.download_url }}
              style={{ height: 200, width: null, flex: 1 }}
            />
          </CardItem>
          <CardItem>
            <Left>
              <Button
                transparent
              >
                <Icon active name="thumbs-up" />
              </Button>
            </Left>
            <Body>
              <Button transparent>
                <Icon active name="chatbubbles" />
                <Text>4 Comments</Text>
              </Button>
            </Body>
            <Right>
              <Text>11h ago</Text>
            </Right>
          </CardItem>
        </Card>
      ))}
  </>
 )
}

export default CardList