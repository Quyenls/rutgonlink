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

// 🔴 FIX QUAN TRỌNG
document.addEventListener("DOMContentLoaded", () => {

  const loginBtn = document.getElementById("loginBtn");
  if (!loginBtn) {
    console.error("❌ loginBtn not found");
    return;
  }

  loginBtn.addEventListener("click", async () => {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const msg = document.getElementById("loginMsg");

    msg.textContent = "";

    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      console.log("✅ Login OK:", userCred.user);
      msg.style.color = "green";
      msg.textContent = "Đăng nhập thành công!";
    } catch (err) {
      console.error("❌ Login error:", err.code, err.message);
      msg.textContent = err.message;
    }
  });

});
