import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  increment,
  setDoc
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

let time = 8;
const el = document.getElementById("time");

const auth = getAuth();
const db = getFirestore();

function getToday() {
  return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
}

const timer = setInterval(async () => {
  time--;
  el.textContent = time;

  if (time <= 0) {
    clearInterval(timer);

    const user = auth.currentUser;

    // ✅ CHỈ LOGIN MỚI XÉT POINT
    if (user) {
      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);
      const today = getToday();

      if (!snap.exists()) {
        // user mới
        await setDoc(ref, {
          email: user.email,
          points: 1,
          todayCount: 1,
          lastDate: today
        });
      } else {
        const data = snap.data();

        // sang ngày mới
        if (data.lastDate !== today) {
          await updateDoc(ref, {
            points: increment(1),
            todayCount: 1,
            lastDate: today
          });
        }
        // cùng ngày nhưng chưa đủ limit
        else if ((data.todayCount || 0) < 5) {
          await updateDoc(ref, {
            points: increment(1),
            todayCount: increment(1)
          });
        }
        // đủ 5 point/ngày → KHÔNG CỘNG
      }
    }

    const link = localStorage.getItem("targetLink");
    window.location.href = link || "index.html";
  }
}, 1000);
