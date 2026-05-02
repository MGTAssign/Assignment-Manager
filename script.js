// 🔒 BLOCK ACCESS IF NOT LOGGED IN
if (localStorage.getItem("loggedIn") !== "true") {
  window.location.href = "login.html";
}

const form = document.getElementById("assignmentForm");
const list = document.getElementById("assignmentList");

let assignments = JSON.parse(localStorage.getItem("assignments")) || [];

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

// Add assignment
form.addEventListener("submit", (e) => {
  e.preventDefault();

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
    fileName: fileName,
    fileData: fileData
  };

  assignments.push(newAssignment);
  form.reset();
  render();
}

// Delete
function removeItem(index) {
  assignments.splice(index, 1);
  render();
}

// Logout
function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "login.html";
}

render();