function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // successful login → go to main page
      window.location.href = "index.html";
    })
    .catch((error) => {
      document.getElementById("error").innerText = error.message;
    });
}
