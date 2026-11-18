/* Frontend demo role guard. This is not production-grade security. */
function requireRole(expectedRole) {
  let current = null;
  try { current = JSON.parse(sessionStorage.getItem("lostlink_current_user") || "null"); } catch (error) {}
  if (!current || current.role !== expectedRole) {
    window.location.replace("../login.html");
    return false;
  }
  let welcome = document.querySelector(".user-info span:not(.badge)");
  if (welcome) welcome.textContent = "Welcome, " + current.name;
  return true;
}

function logout() {
  sessionStorage.removeItem("lostlink_current_user");
}
