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
        <td><button class="delete" onclick="removeItem(${index})">Delete</button></td>
      </tr>
    `;
  });

  localStorage.setItem("assignments", JSON.stringify(assignments));
}

// Add assignment
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const newAssignment = {
    title: document.getElementById("title").value,
    instructor: document.getElementById("instructor").value,
    dateGiven: document.getElementById("dateGiven").value,
    dueDate: document.getElementById("dueDate").value,
  };

  assignments.push(newAssignment);
  form.reset();
  render();
});

// Delete assignment
function removeItem(index) {
  assignments.splice(index, 1);
  render();
}

// Initial load
render();