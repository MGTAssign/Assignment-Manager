console.log("SCRIPT LOADED");

const form = document.getElementById("assignmentForm");
const list = document.getElementById("assignmentList");
const authStatus = document.getElementById("authStatus");
const guestMessage = document.getElementById("guestMessage");

let currentUser = null;

// 🔐 AUTH STATE
auth.onAuthStateChanged((user) => {
  console.log("AUTH STATE:", user);

  currentUser = user;

  const form = document.getElementById("assignmentForm");
  const guestMessage = document.getElementById("guestMessage");

  if (!form || !guestMessage) {
    console.error("Missing form or guestMessage element");
    return;
  }

  // 🔥 RESET UI FIRST
  form.style.display = "none";
  guestMessage.style.display = "none";

  if (user) {
    authStatus.innerText = "Logged in as: " + user.email;

    form.style.display = "block";
  } else {
    authStatus.innerText = "Viewing as guest";

    guestMessage.style.display = "block";
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

  if (!currentUser) {
    alert("You must be logged in.");
    return;
  }

  const fileInput = document.getElementById("fileUpload");
  const file = fileInput.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = () => save(file.name, reader.result);
    reader.readAsDataURL(file);
  } else {
    save(null, null);
  }
});

// 💾 SAVE
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
function deleteAssignment(id) {
  db.collection("assignments").doc(id).delete();
}

// 🚪 LOGOUT
function logout() {
  auth.signOut();
}
