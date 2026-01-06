import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

// 🔥 Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDEyS2YLetTmGJACGU2u8SnxvR8EqDTzig",
  authDomain: "share-link-9008c.firebaseapp.com",
  projectId: "share-link-9008c",
  storageBucket: "share-link-9008c.appspot.com",
  messagingSenderId: "151229659684",
  appId: "1:151229659684:web:954b4f96ad735d337cb6b1"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Login logic
document.getElementById("loginBtn").addEventListener("click", async () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const msg = document.getElementById("loginMsg");

  msg.textContent = "";

  if (!email || !password) {
    msg.textContent = "Vui lòng nhập đầy đủ email và mật khẩu";
    return;
  }

  try {
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    console.log("Login OK:", userCred.user);
    msg.style.color = "green";
    msg.textContent = "Đăng nhập thành công!";
    // window.location.href = "trangdoi.html"; // nếu muốn chuyển trang
  } catch (err) {
    console.error(err);
    msg.textContent = err.message;
  }
});
