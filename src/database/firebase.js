import firebase from 'firebase'

const config = {
    apiKey: "AIzaSyDhs3J_raM_d1X_o7tFS9srFkjDBKFhpdE",
    authDomain: "assessment-4-4f9f4.firebaseapp.com",
    databaseURL: "https://assessment-4-4f9f4.firebaseio.com",
    projectId: "assessment-4-4f9f4",
    storageBucket: "assessment-4-4f9f4.appspot.com",
    messagingSenderId: "302560964726",
    appId: "1:302560964726:web:fb2a9108eafb8436f4af57",
    measurementId: "G-X36YSHXKB5"
}
firebase.initializeApp(config)
firebase.analytics()
export default firebase