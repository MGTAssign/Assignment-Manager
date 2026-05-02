
// Firebase auth state (NO redirect — public viewing allowed)
firebase.auth().onAuthStateChanged((user) => {
  const status = document.getElementById("authStatus");

  if (status) {
    status.innerText = user
      ? "Logged in"
      : "Viewing as guest (read-only)";
  }
});

// Load saved assignments
const form = document.getElementById("assignmentForm");
const list = document.getElementById("assignmentList");

let assignments = JSON.parse(localStorage.getItem("assignments")) || [];

// Check if user can edit
function canEdit() {
  return firebase.auth().currentUser !== null;
}

// Render table
function render() {
  list.innerHTML = "";

  assignments.forEach((a, index) => {
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
          <button onclick="removeItem(${index})">Delete</button>
        </td>
      </tr>
    `;
  });

  localStorage.setItem("assignments", JSON.stringify(assignments));
}

// ADD assignment (LOCKED)
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!canEdit()) {
    alert("You must be logged in to add assignments");
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

function saveAssignment(fileName, fileData) {
  const newAssignment = {
    title: document.getElementById("title").value,
    instructor: document.getElementById("instructor").value,
    dateGiven: document.getElementById("dateGiven").value,
    dueDate: document.getElementById("dueDate").value,
    fileName,
    fileData
  };

  assignments.push(newAssignment);
  form.reset();
  render();
}

// DELETE (LOCKED)
function removeItem(index) {
  if (!canEdit()) {
    alert("You must be logged in to delete assignments");
    return;
  }

  assignments.splice(index, 1);
  render();
}

// LOGOUT
function logout() {
  firebase.auth().signOut().then(() => {
    location.reload();
  });
}

render();
