import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  increment,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDEyS92letMGJACGU2u8ShxvR8EqDTzig",
  authDomain: "share-link-9008c.firebaseapp.com",
  projectId: "share-link-9008c",
  storageBucket: "share-link-9008c.firebasestorage.app",
  messagingSenderId: "151229659684",
  appId: "1:151229659684:web:954b4f96ad735d337cb6b1",
  measurementId: "G-NM0B8SNRQ1"
};

initializeApp(firebaseConfig);

const auth = getAuth();
const db = getFirestore();

let time = 8;
const el = document.getElementById("time");

function getToday() {
  return new Date().toISOString().slice(0, 10);
}

const timer = setInterval(async () => {
  time--;
  el.textContent = time;

  if (time <= 0) {
    clearInterval(timer);

    const user = auth.currentUser;

    if (user) {
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);
      const today = getToday();

      if (!snap.exists()) {
        await setDoc(ref, {
          email: user.email,
          points: 1,
          todayCount: 1,
          lastDate: today
        });
      } else {
        const data = snap.data();

        if (data.lastDate !== today) {
          await updateDoc(ref, {
            points: increment(1),
            todayCount: 1,
            lastDate: today
          });
        } else if ((data.todayCount || 0) < 5) {
          await updateDoc(ref, {
            points: increment(1),
            todayCount: increment(1)
          });
        }
      }
    }

    const link = localStorage.getItem("targetLink");
    window.location.href = link || "index.html";
  }
}, 1000);
