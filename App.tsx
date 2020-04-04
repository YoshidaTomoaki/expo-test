import React from 'react';
import AppNavigator from './src/pages/AppNavigator'
import firebaseInit from './src/auth/firebaseInit'
import {decode, encode} from 'base-64'

//https://stackoverflow.com/questions/60361519/cant-find-a-variable-atob
// @ts-ignore
if (!global.btoa) {  global.btoa = encode }
// @ts-ignore
if (!global.atob) { global.atob = decode }

export default function App() {

    firebaseInit()
    
  return (
    <AppNavigator />
  )

}