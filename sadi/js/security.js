/* Security Officer: security desk register CRUD + Search.
   Unique features: accept item deposits and verify/release claimed items. */

let editDepositIndex = -1;
let editReleaseIndex = -1;

function renderDeposits() {
  let search = document.getElementById("depositSearch").value;
  let table = "";
  for (let i = 0; i < deposits.length; i++) {
    let item = deposits[i];
    if (searchMatch(item.name + " " + item.description + " " + item.by, search)) {
      table += "<tr><td>" + escapeText(item.name) + "</td><td>" + escapeText(item.description) +
        "</td><td>" + escapeText(item.by) + "</td><td>" + escapeText(item.date) +
        "</td><td>" + escapeText(item.status) + "</td><td><button class='btn btn-small' onclick='editDeposit(" + i + ")'>Edit</button> " +
        "<button class='btn btn-small btn-danger' onclick='deleteDeposit(" + i + ")'>Delete</button></td></tr>";
    }
  }
  document.getElementById("depositTable").innerHTML = table;
}

function saveDeposit() {
  let item = {
    name: document.getElementById("depositName").value.trim(),
    description: document.getElementById("depositDescription").value.trim(),
    by: document.getElementById("depositBy").value.trim(),
    date: document.getElementById("depositDate").value,
    status: "Stored"
  };
  if (item.name === "" || item.description === "" || item.by === "" || item.date === "") return false;
  let index = Number(document.getElementById("depositIndex").value);
  if (index === -1) deposits.push(item);
  else deposits[index] = item;
  persistData();
  document.getElementById("depositIndex").value = -1;
  document.querySelector("#depositSection form").reset();
  document.getElementById("depositMessage").innerHTML = "Deposit record saved.";
  renderDeposits();
  renderUnclaimed();
  updateDailySummary();
  return false;
}

function editDeposit(index) {
  document.getElementById("depositIndex").value = index;
  document.getElementById("depositName").value = deposits[index].name;
  document.getElementById("depositDescription").value = deposits[index].description;
  document.getElementById("depositBy").value = deposits[index].by;
  document.getElementById("depositDate").value = deposits[index].date;
}

function deleteDeposit(index) {
  if (confirm("Delete this deposit record?")) {
    deposits = removeRecord(deposits, index);
    persistData();
    renderDeposits();
    renderUnclaimed();
    updateDailySummary();
  }
}

function renderReleases() {
  let search = document.getElementById("releaseSearch") ? document.getElementById("releaseSearch").value : "";
  let table = "";
  for (let i = 0; i < releases.length; i++) {
    let item = releases[i];
    if (!searchMatch(item.name + " " + item.claimant + " " + item.status, search)) continue;
    table += "<tr><td>" + escapeText(item.name) + "</td><td>" + escapeText(item.claimant) +
      "</td><td>" + escapeText(item.proof) + "</td><td>" + escapeText(item.status) +
      "</td><td><button class='btn btn-small' onclick='editRelease(" + i + ")'>Edit</button> " +
      "<button class='btn btn-small btn-danger' onclick='deleteRelease(" + i + ")'>Delete</button></td></tr>";
  }
  document.getElementById("releaseTable").innerHTML = table;
}

function saveRelease() {
  let record = {
    name: document.getElementById("releaseName").value.trim(),
    claimant: document.getElementById("releaseClaimant").value.trim(),
    proof: document.getElementById("releaseProof").value.trim(),
    status: document.getElementById("releaseStatus").value
  };
  if (record.name === "" || record.claimant === "" || record.proof === "") return false;
  let index = Number(document.getElementById("releaseIndex") ? document.getElementById("releaseIndex").value : -1);
  if (index === -1) releases.push(record);
  else releases[index] = record;
  persistData();
  document.getElementById("releaseMessage").innerHTML = "Verification record saved.";
  document.querySelector("#releaseSection form").reset();
  let hidden = document.getElementById("releaseIndex");
  if (hidden) hidden.value = -1;
  renderReleases();
  updateDailySummary();
  return false;
}

function editRelease(index) {
  document.getElementById("releaseName").value = releases[index].name;
  document.getElementById("releaseClaimant").value = releases[index].claimant;
  document.getElementById("releaseProof").value = releases[index].proof;
  document.getElementById("releaseStatus").value = releases[index].status;
  let hidden = document.getElementById("releaseIndex");
  if (!hidden) {
    hidden = document.createElement("input");
    hidden.type = "hidden";
    hidden.id = "releaseIndex";
    document.querySelector("#releaseSection form").appendChild(hidden);
  }
  hidden.value = index;
}

function deleteRelease(index) {
  if (confirm("Delete this release record?")) {
    releases = removeRecord(releases, index);
    persistData();
    renderReleases();
    updateDailySummary();
  }
}

renderDeposits();
renderReleases();

/* Extra Security pages: waiting items and a summary of desk activity. */

function renderUnclaimed() {
  let search = document.getElementById("unclaimedSearch").value;
  let table = "";
  let count = 0;
  for (let i = 0; i < deposits.length; i++) {
    let item = deposits[i];
    if (item.status !== "Released" && searchMatch(item.name + " " + item.description + " " + item.by, search)) {
      count++;
      table += "<tr><td>" + escapeText(item.name) + "</td><td>" + escapeText(item.description) +
        "</td><td>" + escapeText(item.by) + "</td><td>" + escapeText(item.date) +
        "</td><td><span class='badge pending-badge'>" + escapeText(item.status) + "</span></td></tr>";
    }
  }
  document.getElementById("unclaimedTable").innerHTML = table || "<tr><td colspan='5'>No unclaimed items.</td></tr>";
  document.getElementById("unclaimedCount").innerHTML = count + " Items";
}

function updateDailySummary() {
  let released = 0;
  for (let i = 0; i < releases.length; i++) {
    if (releases[i].status === "Verified - Released") released++;
  }
  let waiting = 0;
  for (let i = 0; i < deposits.length; i++) {
    if (deposits[i].status !== "Released") waiting++;
  }
  document.getElementById("securityDeposits").innerHTML = deposits.length;
  document.getElementById("securityReleased").innerHTML = released;
  document.getElementById("securityWaiting").innerHTML = waiting;

  let table = "";
  for (let i = 0; i < releases.length; i++) {
    table += "<tr><td>" + escapeText(releases[i].name) + "</td><td>" +
      escapeText(releases[i].claimant) + "</td><td>" + escapeText(releases[i].status) + "</td></tr>";
  }
  document.getElementById("dailyReleaseTable").innerHTML = table || "<tr><td colspan='3'>No release records.</td></tr>";
}

renderUnclaimed();
updateDailySummary();
