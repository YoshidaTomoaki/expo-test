import firebase from 'firebase';

export default ()=> {

  if (!firebase.apps.length) {

    firebase.initializeApp({
      
    })
    

  }

}