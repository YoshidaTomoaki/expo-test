import { useContext } from 'react'
import {
  NavigationScreenProp,
  NavigationRoute,
  NavigationContext
} from 'react-navigation'

export function useNavigation<T>() {
  return useContext(NavigationContext) as NavigationScreenProp<NavigationRoute,T>
}