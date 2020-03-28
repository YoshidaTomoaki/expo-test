import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import HomeScreen from './HomeScreen'
import ImageUploadScreen from './ImageUploadScreen'
import CameraScreen from './CameraScreen'
import { FontAwesome } from '@expo/vector-icons'

const AppNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: createStackNavigator(
        {
          Home: {
            screen: HomeScreen,
            navigationOptions: {
              title: 'Home',
              headerTransparent: true
            }
          },
        }
      ),
      navigationOptions: {
        title: 'ホーム'
      }
    },
    ImageUpload: {
      screen: createStackNavigator(
        {
          ImageUpload: {
            screen: ImageUploadScreen,
            navigationOptions: {
              title: 'ImageUpload',
              headerTransparent: true
            }
          },
        }
      ),
      navigationOptions: {
        title: 'アップロード',
      },
    },
    Camera: {
      screen: createStackNavigator(
        {
          Camera: {
            screen: CameraScreen,
            navigationOptions: {
              title: 'Camera',
              headerTransparent: true
            }
          },
        }
      ),
      navigationOptions: {
        title: 'カメラ',
      },
    },
  },
  {
    initialRouteName: 'Home',
    tabBarOptions: {
      showIcon: true,
      showLabel: true,
      style: {
        backgroundColor: 'transparent',
        borderTopWidth: 0,
        position: 'absolute',
        left: 50,
        right: 50,
        bottom: 20,
        height: 100
      }
    }
    
  }
)

export default createAppContainer(AppNavigator)