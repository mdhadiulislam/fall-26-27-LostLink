/* Signup is available to students, university staff and security officers. */
function showRoleFields() {
  let role = document.getElementById("role").value;
  document.getElementById("studentFields").style.display = role === "Student" ? "block" : "none";
  document.getElementById("staffFields").style.display = role === "University Staff" ? "block" : "none";
  document.getElementById("securityFields").style.display = role === "Security Officer" ? "block" : "none";
  document.getElementById("studentId").disabled = role !== "Student";
  document.getElementById("employeeId").disabled = role !== "University Staff";
  document.getElementById("securityId").disabled = role !== "Security Officer";
}

function validateRegister() {
  clearErrors();
  let name = document.getElementById("fullName").value.trim();
  let email = document.getElementById("email").value.trim();
  let username = document.getElementById("newUsername").value.trim();
  let password = document.getElementById("newPassword").value;
  let role = document.getElementById("role").value;
  let valid = true;
  if (name.length < 2) { showError("fullName", "Enter your full name."); valid = false; }
  if (!/^\S+@\S+\.\S+$/.test(email)) { showError("email", "Enter a valid email address."); valid = false; }
  if (!/^[a-zA-Z0-9._-]{3,}$/.test(username)) { showError("newUsername", "Use at least 3 letters or numbers."); valid = false; }
  if (password.length < 6) { showError("newPassword", "Password must have at least 6 characters."); valid = false; }
  if (!valid) return false;

  for (let i = 0; i < users.length; i++) {
    if (users[i].username.toLowerCase() === username.toLowerCase() || (users[i].email && users[i].email.toLowerCase() === email.toLowerCase())) {
      document.getElementById("registerMessage").textContent = "Username or email is already registered.";
      return false;
    }
  }
  let newUser = { name: name, email: email, username: username, password: password, role: role, status: "Active" };
  users.push(newUser);
  persistData();
  document.getElementById("registerMessage").textContent = "Account created successfully. You can now log in.";
  document.querySelector("#registerForm").reset();
  showRoleFields();
  return false;
}

showRoleFields();
