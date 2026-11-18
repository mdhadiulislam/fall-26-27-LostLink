/* Admin: manage user accounts (CRUD + Search).
   Unique features: account status control and system summary report. */

let editUserIndex = -1;

function renderUsers() {
  let search = document.getElementById("userSearch").value;
  let table = "";
  for (let i = 0; i < users.length; i++) {
    let userText = users[i].name + " " + users[i].username + " " + users[i].role;
    if (searchMatch(userText, search)) {
      table += "<tr><td>" + escapeText(users[i].name) + "</td><td>" + escapeText(users[i].username) +
        "</td><td>" + escapeText(users[i].role) + "</td><td>" + escapeText(users[i].status) +
        "</td><td><button class='btn btn-small' onclick='editUser(" + i + ")'>Edit</button> " +
        "<button class='btn btn-small btn-danger' onclick='deleteUser(" + i + ")'>Delete</button></td></tr>";
    }
  }
  document.getElementById("usersTable").innerHTML = table;
}

function saveUser() {
  let user = {
    name: document.getElementById("userName").value.trim(),
    username: document.getElementById("userUsername").value.trim(),
    role: document.getElementById("userRole").value,
    status: document.getElementById("userStatus").value,
    password: "demo123"
  };
  if (user.name === "" || user.username === "") {
    document.getElementById("userMessage").innerHTML = "Enter a name and username.";
    return false;
  }

  let index = Number(document.getElementById("userIndex").value);
  if (index === -1) {
    users.push(user);
    persistData();
    document.getElementById("userMessage").innerHTML = "User added.";
  } else {
    users[index].name = user.name;
    users[index].username = user.username;
    users[index].role = user.role;
    users[index].status = user.status;
    persistData();
    document.getElementById("userMessage").innerHTML = "User updated.";
  }
  document.getElementById("userIndex").value = -1;
  document.querySelector("#usersSection form").reset();
  renderUsers();
  updateReport();
  return false;
}

function editUser(index) {
  document.getElementById("userIndex").value = index;
  document.getElementById("userName").value = users[index].name;
  document.getElementById("userUsername").value = users[index].username;
  document.getElementById("userRole").value = users[index].role;
  document.getElementById("userStatus").value = users[index].status;
}

function deleteUser(index) {
  if (confirm("Delete this user?")) {
    users = removeRecord(users, index);
    persistData();
    renderUsers();
    updateReport();
  }
}

function updateReport() {
  let lost = 0;
  let found = foundItems.length;
  let returned = 0;
  for (let i = 0; i < lostReports.length; i++) {
    lost++;
  }
  for (let i = 0; i < foundItems.length; i++) {
    if (foundItems[i].status === "Returned") returned++;
  }
  document.getElementById("totalUsers").innerHTML = users.length;
  document.getElementById("totalLost").innerHTML = lost;
  document.getElementById("totalFound").innerHTML = found;
  document.getElementById("totalReturned").innerHTML = returned;
}

renderUsers();
updateReport();

/* Extra Admin pages: approve account requests and moderate item reports. */

function renderApprovals() {
  let table = "";
  for (let i = 0; i < accountRequests.length; i++) {
    let request = accountRequests[i];
    table += "<tr><td>" + escapeText(request.name) + "</td><td>" + escapeText(request.username) +
      "</td><td>" + escapeText(request.role) + "</td><td><span class='badge pending-badge'>" +
      escapeText(request.status) + "</span></td><td><button class='btn btn-small' onclick='approveAccount(" + i + ")'>Approve</button> " +
      "<button class='btn btn-small btn-danger' onclick='rejectAccount(" + i + ")'>Reject</button></td></tr>";
  }
  document.getElementById("approvalTable").innerHTML = table || "<tr><td colspan='5'>No account requests.</td></tr>";
  document.getElementById("pendingAccountCount").innerHTML = accountRequests.length + " Pending";
}

function approveAccount(index) {
  let request = accountRequests[index];
  users.push({
    name: request.name,
    username: request.username,
    password: "demo123",
    role: request.role,
    status: "Active"
  });
  accountRequests = removeRecord(accountRequests, index);
  persistData();
  renderApprovals();
  renderUsers();
  updateReport();
}

function rejectAccount(index) {
  if (confirm("Reject this account request?")) {
    accountRequests = removeRecord(accountRequests, index);
    persistData();
    renderApprovals();
  }
}

function renderModeration() {
  let search = document.getElementById("moderationSearch").value;
  let table = "";
  for (let i = 0; i < moderationItems.length; i++) {
    let item = moderationItems[i];
    if (searchMatch(item.name + " " + item.reporter + " " + item.category, search)) {
      table += "<tr><td>" + escapeText(item.name) + "</td><td>" + escapeText(item.category) +
        "</td><td>" + escapeText(item.reporter) + "</td><td>" + escapeText(item.reason) +
        "</td><td><button class='btn btn-small btn-danger' onclick='removeModerationItem(" + i + ")'>Remove</button></td></tr>";
    }
  }
  document.getElementById("moderationTable").innerHTML = table || "<tr><td colspan='5'>No reports need review.</td></tr>";
}

function removeModerationItem(index) {
  if (confirm("Remove this report from the moderation list?")) {
    moderationItems = removeRecord(moderationItems, index);
    persistData();
    renderModeration();
  }
}

renderApprovals();
renderModeration();
