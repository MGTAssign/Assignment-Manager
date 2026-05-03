const form = document.getElementById("assignmentForm");
const list = document.getElementById("assignmentList");
const authStatus = document.getElementById("authStatus");

let currentUser = null;

// 🔐 Track login state
auth.onAuthStateChanged(user => {
  if (user) {
    currentUser = user;
    authStatus.innerText = "Logged in as: " + user.email;
  } else {
    currentUser = null;
    authStatus.innerText = "Viewing as guest";
  }

  loadAssignments();
});

// 📥 Load assignments from Firestore (LIVE)
function loadAssignments() {
  db.collection("assignments")
    .orderBy("dueDate")
    .onSnapshot(snapshot => {

      list.innerHTML = "";

      snapshot.forEach(doc => {
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

// ➕ Add assignment
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!currentUser) {
    alert("Login required to add assignments.");
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

// 💾 Save to Firestore
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

// ❌ Delete assignment
function deleteAssignment(id) {
  db.collection("assignments").doc(id).delete();
}

// 🚪 Logout
function logout() {
  auth.signOut();
}
