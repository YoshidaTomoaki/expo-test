import React from 'react';
import {
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text,
  Card,
  CardItem,
} from 'native-base';
import { Image } from 'react-native';

export interface Photo {
  imageUrl: string;
  fileUrl: string;
  uid: string;
  id: string;
}

type Props = {
  photos: Photo[];
};

const CardList: React.FC<Props> = (props) => {
  return (
    <>
      {props.photos.map((photo) => (
        <Card key={photo.id}>
          <CardItem>
            <Left>
              <Body>
                <Text>Upload Image</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Image
              source={{ uri: photo.imageUrl }}
              style={{ height: 200, width: null, flex: 1 }}
            />
          </CardItem>
          <CardItem>
            <Left>
              <Button transparent>
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
  );
};

export default CardList;
