const form = document.getElementById("assignmentForm");
const list = document.getElementById("assignmentList");
const authStatus = document.getElementById("authStatus");
const guestMessage = document.getElementById("guestMessage");

let currentUser = null;

// 🔐 AUTH STATE (FORCE FIX + DEBUG)
auth.onAuthStateChanged((user) => {
  console.log("AUTH STATE:", user);

  currentUser = user;

  const form = document.getElementById("assignmentForm");
  const guestMessage = document.getElementById("guestMessage");

  if (!form || !guestMessage) {
    console.error("Missing HTML elements (form or guestMessage)");
    return;
  }

  // 🔥 FORCE HIDE EVERYTHING FIRST (prevents stuck UI bug)
  form.style.setProperty("display", "none", "important");
  guestMessage.style.setProperty("display", "none", "important");

  if (user) {
    authStatus.innerText = "Logged in as: " + user.email;

    form.style.setProperty("display", "block", "important");
  } else {
    authStatus.innerText = "Viewing as guest";

    guestMessage.style.setProperty("display", "block", "important");
  }

  loadAssignments();
});

// 📥 LOAD ASSIGNMENTS (REAL TIME)
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

  if (!currentUser) {
    alert("You must be logged in.");
    return;
  }

  const fileInput = document.getElementById("fileUpload");
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = function () {
      saveAssignment(file.name, reader.result);
    };

    reader.readAsDataURL(file);
  } else {
    saveAssignment(null, null);
  }
});

// 💾 SAVE TO FIRESTORE
function saveAssignment(fileName, fileData) {
  db.collection("assignments").add({
    title: document.getElementById("title").value,
    instructor: document.getElementById("instructor").value,
    dateGiven: document.getElementById("dateGiven").value,
    dueDate: document.getElementById("dueDate").value,
    fileName: fileName,
    fileData: fileData
  });

  form.reset();
}

// ❌ DELETE
function deleteAssignment(id) {
  db.collection("assignments").doc(id).delete();
}

// 🚪 LOGOUT
function logout() {
  auth.signOut();
}
