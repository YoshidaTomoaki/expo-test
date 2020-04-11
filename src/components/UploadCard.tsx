import * as React from 'react';
import { Text, Card, CardItem, Left, Body } from 'native-base';
import { Image } from 'react-native';

const Component = ({ url }) => {
  return (
    <Card>
      <CardItem>
        <Left>
          <Body>
            <Text>Upload Image</Text>
          </Body>
        </Left>
      </CardItem>
      <CardItem cardBody>
        <Image
          style={{ height: 200, width: 200, borderRadius: 50, margin: 50 }}
          source={{ uri: url }}
        />
      </CardItem>
    </Card>
  );
};

export default Component;
