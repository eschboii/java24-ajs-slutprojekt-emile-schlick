import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBh3w3xL-3BDNBp8NSTQWJcSCW57-X16_8",
    authDomain: "scrum-board-62539.firebaseapp.com",
    databaseURL: "https://scrum-board-62539-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "scrum-board-62539",
    storageBucket: "scrum-board-62539.firebasestorage.app",
    messagingSenderId: "565257703061",
    appId: "1:565257703061:web:9897333c18742008c8159c"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export const assignmentsRef = ref(db, "/assignments");
export const membersRef = ref(db, "/members");