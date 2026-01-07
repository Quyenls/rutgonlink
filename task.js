auth.onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  console.log("✅ Đã đăng nhập:", user.email);

  db.collection("tasks")
    .where("active", "==", true)
    .get()
    .then(snapshot => {
      const container = document.getElementById("taskList");
      if (!container) return;

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
    })
    .catch(err => console.error("❌ Load task lỗi:", err));
});
