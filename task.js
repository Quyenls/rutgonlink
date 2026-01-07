import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDEyS2YLetTmGJACGU2u8SnxvR8EqDTzig",
  authDomain: "share-link-9008c.firebaseapp.com",
  projectId: "share-link-9008c",
  storageBucket: "share-link-9008c.appspot.com",
  messagingSenderId: "151229659684",
  appId: "1:151229659684:web:954b4f96ad735d337cb6b1"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

auth.onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  db.collection("tasks")
    .where("active", "==", true)
    .get()
    .then(snapshot => {
      const container = document.getElementById("taskList");
      container.innerHTML = "";

      snapshot.forEach(doc => {
        const task = doc.data();

        const btn = document.createElement("button");
        btn.innerText = task.title;

        btn.onclick = () => {
          localStorage.setItem("currentTask", doc.id);
          window.location.href = task.shortLink;
        };

        container.appendChild(btn);
      });
    });
});
