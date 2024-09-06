const firebaseConfig = {
  apiKey: "AIzaSyDBTa2h4ioXe21kFVVdrujHLUn_Eq6yOLA",
  authDomain: "pointcount-e9d6c.firebaseapp.com",
  databaseURL: "https://pointcount-e9d6c-default-rtdb.firebaseio.com",
  projectId: "pointcount-e9d6c",
  storageBucket: "pointcount-e9d6c.appspot.com",
  messagingSenderId: "394487907844",
  appId: "1:394487907844:web:4c0f74ede98253eaa9d751",
  measurementId: "G-KXTD358YYW"
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

function updateCounter(person, change) {
    const counterRef = db.collection('counters').doc(person);
    counterRef.get().then((doc) => {
        if (doc.exists) {
            let currentValue = doc.data().value;
            counterRef.update({
                value: firebase.firestore.FieldValue.increment(change)
            });
        } else {
            counterRef.set({ value: change });
        }
    });
}

function listenToChanges() {
    db.collection('counters').doc('sawyer').onSnapshot((doc) => {
        if (doc.exists) {
            document.getElementById('sawyerNumber').innerText = doc.data().value;
        }
    });

    db.collection('counters').doc('quinn').onSnapshot((doc) => {
        if (doc.exists) {
            document.getElementById('quinnNumber').innerText = doc.data().value;
        }
    });
}

listenToChanges();
