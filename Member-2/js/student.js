/* Student: lost reports CRUD + Search.
   Unique features: submit a claim and view claim status. */

let editLostIndex = -1;

function renderLostReports() {
  let search = document.getElementById("lostSearch").value;
  let table = "";
  for (let i = 0; i < lostReports.length; i++) {
    let report = lostReports[i];
    if (report.owner === "student" && searchMatch(report.name + " " + report.category + " " + report.location, search)) {
      table += "<tr><td>" + escapeText(report.name) + "</td><td>" + escapeText(report.category) +
        "</td><td>" + escapeText(report.location) + "</td><td>" + escapeText(report.date) +
        "</td><td>" + escapeText(report.status) + "</td><td><button class='btn btn-small' onclick='editLostReport(" + i + ")'>Edit</button> " +
        "<button class='btn btn-small btn-danger' onclick='deleteLostReport(" + i + ")'>Delete</button></td></tr>";
    }
  }
  document.getElementById("lostTable").innerHTML = table;
}

function saveLostReport() {
  let report = {
    owner: "student",
    name: document.getElementById("lostName").value.trim(),
    category: document.getElementById("lostCategory").value,
    location: document.getElementById("lostLocation").value.trim(),
    date: document.getElementById("lostDate").value,
    description: document.getElementById("lostDescription").value.trim(),
    status: "Searching"
  };
  if (report.name === "" || report.location === "" || report.date === "" || report.description === "") return false;

  let index = Number(document.getElementById("lostIndex").value);
  if (index === -1) {
    lostReports.push(report);
    persistData();
    document.getElementById("lostMessage").innerHTML = "Lost item report added.";
  } else {
    lostReports[index] = report;
    persistData();
    document.getElementById("lostMessage").innerHTML = "Lost item report updated.";
  }
  document.getElementById("lostIndex").value = -1;
  document.querySelector("#lostSection form").reset();
  renderLostReports();
  return false;
}

function editLostReport(index) {
  document.getElementById("lostIndex").value = index;
  document.getElementById("lostName").value = lostReports[index].name;
  document.getElementById("lostCategory").value = lostReports[index].category;
  document.getElementById("lostLocation").value = lostReports[index].location;
  document.getElementById("lostDate").value = lostReports[index].date;
  document.getElementById("lostDescription").value = lostReports[index].description;
}

function deleteLostReport(index) {
  if (confirm("Delete this report?")) {
    lostReports = removeRecord(lostReports, index);
    persistData();
    renderLostReports();
  }
}

function submitClaim() {
  let claim = {
    owner: "student",
    item: document.getElementById("claimItem").value,
    proof: document.getElementById("claimProof").value.trim(),
    status: "Pending"
  };
  if (claim.proof === "") return false;
  let index = Number(document.getElementById("claimIndex").value);
  if (index === -1) claims.push(claim);
  else claims[index] = claim;
  persistData();
  document.getElementById("claimMessage").innerHTML = index === -1 ? "Claim submitted for review." : "Claim updated.";
  document.getElementById("claimIndex").value = -1;
  document.querySelector("#claimsSection form").reset();
  renderClaims();
  renderClaimHistory();
  return false;
}

function renderClaims() {
  let table = "";
  let search = document.getElementById("claimSearch") ? document.getElementById("claimSearch").value : "";
  for (let i = 0; i < claims.length; i++) {
    if (claims[i].owner === "student" && searchMatch(claims[i].item + " " + claims[i].proof + " " + claims[i].status, search)) {
      table += "<tr><td>" + escapeText(claims[i].item) + "</td><td>" + escapeText(claims[i].proof) +
        "</td><td>" + escapeText(claims[i].status) + "</td><td><button class='btn btn-small' onclick='editClaim(" + i + ")'>Edit</button> " +
        "<button class='btn btn-small btn-danger' onclick='deleteClaim(" + i + ")'>Delete</button></td></tr>";
    }
  }
  document.getElementById("claimsTable").innerHTML = table || "<tr><td colspan='4'>No claims found.</td></tr>";
}

function editClaim(index) {
  document.getElementById("claimIndex").value = index;
  document.getElementById("claimItem").value = claims[index].item;
  document.getElementById("claimProof").value = claims[index].proof;
  showSection("claimsSection");
}

function deleteClaim(index) {
  if (confirm("Delete this claim?")) {
    claims = removeRecord(claims, index);
    persistData();
    renderClaims();
    renderClaimHistory();
  }
}

renderLostReports();
renderClaims();

/* Extra Student pages: browse found items and review claim history. */

function renderStudentFoundItems() {
  let search = document.getElementById("studentFoundSearch").value;
  let table = "";
  for (let i = 0; i < foundItems.length; i++) {
    let item = foundItems[i];
    if (searchMatch(item.name + " " + item.category + " " + item.location, search)) {
      table += "<tr><td>" + escapeText(item.name) + "</td><td>" + escapeText(item.category) +
        "</td><td>" + escapeText(item.location) + "</td><td>" + escapeText(item.status) +
        "</td><td><button class='btn btn-small' onclick='claimFoundItem(" + i + ")'>Submit Claim</button></td></tr>";
    }
  }
  document.getElementById("studentFoundTable").innerHTML = table || "<tr><td colspan='5'>No found items available.</td></tr>";
}

function claimFoundItem(index) {
  let itemName = foundItems[index].name;
  let select = document.getElementById("claimItem");
  let exists = false;
  for (let i = 0; i < select.options.length; i++) {
    if (select.options[i].value === itemName) exists = true;
  }
  if (!exists) {
    let option = document.createElement("option");
    option.value = itemName;
    option.text = itemName;
    select.appendChild(option);
  }
  select.value = itemName;
  showSection("claimsSection");
  document.getElementById("claimProof").focus();
}

function renderClaimHistory() {
  let table = "";
  let count = 0;
  for (let i = 0; i < claims.length; i++) {
    if (claims[i].owner === "student") {
      count++;
      table += "<tr><td>" + escapeText(claims[i].item) + "</td><td>" + escapeText(claims[i].proof) +
        "</td><td><span class='badge " + (claims[i].status === "Approved" ? "found" : "pending-badge") + "'>" +
        escapeText(claims[i].status) + "</span></td></tr>";
    }
  }
  document.getElementById("claimHistoryTable").innerHTML = table || "<tr><td colspan='3'>No claim history yet.</td></tr>";
  document.getElementById("studentClaimCount").innerHTML = count + " Claims";
}

renderStudentFoundItems();
renderClaimHistory();
