import React from 'react';
import { Container, Content } from 'native-base';
import { LinearGradient } from 'expo-linear-gradient';
import { Dimensions } from 'react-native';

type Props = {
  test?: string;
};

const Layout: React.FC<Props> = (props) => {
  return (
    <Container>
      <LinearGradient
        colors={['#bf95ea', '#ffd5ea', '#bf95ea']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          height: Dimensions.get('screen').height,
        }}
      >
        <Content>{props.children}</Content>
      </LinearGradient>
    </Container>
  );
};

export default Layout;
