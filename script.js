console.log("SCRIPT LOADED");

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("assignmentForm");
  const list = document.getElementById("assignmentList");
  const authStatus = document.getElementById("authStatus");
  const guestMessage = document.getElementById("guestMessage");

  let currentUser = null;

  // 🔐 AUTH STATE
  auth.onAuthStateChanged((user) => {

    console.log("AUTH STATE:", user);

    currentUser = user;

    if (form) form.style.display = "none";
    if (guestMessage) guestMessage.style.display = "none";

    if (user) {
      authStatus.innerText = "Logged in as: " + user.email;
      if (form) form.style.display = "block";
    } else {
      authStatus.innerText = "Viewing as guest";
      if (guestMessage) guestMessage.style.display = "block";
    }

    loadAssignments();
  });

  // 📥 LOAD ASSIGNMENTS
  function loadAssignments() {
    db.collection("assignments")
      .orderBy("dueDate")
      .onSnapshot((snapshot) => {

        list.innerHTML = "";

        snapshot.forEach((doc) => {
          const a = doc.data();
          const id = doc.id;

          list.innerHTML += `
            <tr>
              <td>${a.title}</td>
              <td>${a.instructor}</td>
              <td>${a.dateGiven}</td>
              <td>${a.dueDate}</td>

              <td>
                ${a.fileName
                  ? `<a href="${a.fileData}" download="${a.fileName}">Download</a>`
                  : "No file"}
              </td>

              <td>
                ${currentUser
                  ? `<button onclick="deleteAssignment('${id}')">Delete</button>`
                  : ""}
              </td>
            </tr>
          `;
        });
      });
  }

  // ➕ ADD ASSIGNMENT
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!currentUser) return;

    const file = document.getElementById("fileUpload").files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => save(file.name, reader.result);
      reader.readAsDataURL(file);
    } else {
      save(null, null);
    }
  });

  function save(fileName, fileData) {
    db.collection("assignments").add({
      title: document.getElementById("title").value,
      instructor: document.getElementById("instructor").value,
      dateGiven: document.getElementById("dateGiven").value,
      dueDate: document.getElementById("dueDate").value,
      fileName,
      fileData
    });

    form.reset();
  }

  // ❌ DELETE
  window.deleteAssignment = function(id) {
    db.collection("assignments").doc(id).delete();
  };

  // 🚪 LOGOUT
  window.logout = function() {
    auth.signOut();
  };

});
