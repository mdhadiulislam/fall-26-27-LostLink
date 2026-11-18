/* Demo account helper and role-based login. */
function useAccount(username, password) {
  document.getElementById("username").value = username;
  document.getElementById("password").value = password;
  document.getElementById("loginMessage").textContent = "Demo account details filled. Click Login.";
  clearErrors();
}

function validateLogin() {
  clearErrors();
  let username = document.getElementById("username").value.trim();
  let password = document.getElementById("password").value;
  let valid = true;
  if (!username) { showError("username", "Please enter your username."); valid = false; }
  if (!password) { showError("password", "Please enter your password."); valid = false; }
  if (!valid) return false;

  let foundUser = null;
  for (let i = 0; i < users.length; i++) {
    if ((users[i].username === username || users[i].email === username) && users[i].password === password) foundUser = users[i];
  }
  if (!foundUser) {
    document.getElementById("loginMessage").textContent = "Username or password is incorrect.";
    return false;
  }
  if (foundUser.status !== "Active") {
    document.getElementById("loginMessage").textContent = "This account is waiting for approval or is blocked.";
    return false;
  }

  sessionStorage.setItem("lostlink_current_user", JSON.stringify({ name: foundUser.name, username: foundUser.username, role: foundUser.role }));
  let destinations = { "Admin": "Member-1/admin.html", "Student": "Member-2/student.html", "University Staff": "Member-3/staff.html", "Security Officer": "Member-4/security.html" };
  window.location.href = destinations[foundUser.role] || "login.html";
  return false;
}
