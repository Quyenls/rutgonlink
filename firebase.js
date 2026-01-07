const firebaseConfig = {
  apiKey: "AIzaSyDEyS2YletTmGJACGU2u8SnxvR8EqDTzig",
  authDomain: "share-link-9008c.firebaseapp.com",
  projectId: "share-link-9008c",
  storageBucket: "share-link-9008c.appspot.com",
  messagingSenderId: "151229659684",
  appId: "1:151229659684:web:954b4f96ad735d337cb6b1"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
