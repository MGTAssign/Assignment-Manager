Skip to content
MGTAssign
Assignment-Manager
Repository navigation
Code
Issues
Pull requests
Actions
Projects
Security and quality
Insights
Settings
Files
Go to file
t
T
firebase.js
index.html
login.html
login.js
script.js
style.css
Assignment-Manager
/
script.js
in
main

Edit

Preview
Indent mode

Spaces
Indent size

2
Line wrap mode

No wrap
Editing script.js file contents
  1
  2
  3
  4
  5
  6
  7
  8
  9
 10
 11
 12
 13
 14
 15
 16
 17
 18
 19
 20
 21
 22
 23
 24
 25
 26
 27
 28
 29
 30
 31
 32
 33
 34
 35
 36
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
Use Control + Shift + m to toggle the tab key moving focus. Alternatively, use esc then tab to move to the next interactive element on the page.
 
