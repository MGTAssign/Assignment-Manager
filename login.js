function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const correctUser = "admin";
  const correctPass = "1234";

  if (username === correctUser && password === correctPass) {
    localStorage.setItem("loggedIn", "true");
    window.location.href = "index.html";
  } else {
    document.getElementById("error").innerText = "Invalid username or password";
  }
}