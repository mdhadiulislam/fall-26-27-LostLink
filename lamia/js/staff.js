/* University Staff: found item records CRUD + Search.
   Unique features: report a found item and record handover to security. */

let editFoundIndex = -1;
let editHandoverIndex = -1;

function renderFoundItems() {
  let search = document.getElementById("foundSearch").value;
  let table = "";
  for (let i = 0; i < foundItems.length; i++) {
    let item = foundItems[i];
    if (searchMatch(item.name + " " + item.category + " " + item.location, search)) {
      table += "<tr><td>" + escapeText(item.name) + "</td><td>" + escapeText(item.category) +
        "</td><td>" + escapeText(item.location) + "</td><td>" + escapeText(item.date) +
        "</td><td>" + escapeText(item.status) + "</td><td><button class='btn btn-small' onclick='editFoundItem(" + i + ")'>Edit</button> " +
        "<button class='btn btn-small btn-danger' onclick='deleteFoundItem(" + i + ")'>Delete</button></td></tr>";
    }
  }
  document.getElementById("foundTable").innerHTML = table;
}

function saveFoundItem() {
  let item = {
    name: document.getElementById("foundName").value.trim(),
    category: document.getElementById("foundCategory").value,
    location: document.getElementById("foundLocation").value.trim(),
    date: document.getElementById("foundDate").value,
    status: document.getElementById("foundStatus").value
  };
  if (item.name === "" || item.location === "" || item.date === "") return false;
  let index = Number(document.getElementById("foundIndex").value);
  if (index === -1) foundItems.push(item);
  else foundItems[index] = item;
  persistData();
  document.getElementById("foundIndex").value = -1;
  document.querySelector("#foundSection form").reset();
  document.getElementById("foundMessage").innerHTML = "Found item saved.";
  renderFoundItems();
  renderLostMatches();
  updateStaffSummary();
  return false;
}

function editFoundItem(index) {
  document.getElementById("foundIndex").value = index;
  document.getElementById("foundName").value = foundItems[index].name;
  document.getElementById("foundCategory").value = foundItems[index].category;
  document.getElementById("foundLocation").value = foundItems[index].location;
  document.getElementById("foundDate").value = foundItems[index].date;
  document.getElementById("foundStatus").value = foundItems[index].status;
}

function deleteFoundItem(index) {
  if (confirm("Delete this found item?")) {
    foundItems = removeRecord(foundItems, index);
    persistData();
    renderFoundItems();
    renderLostMatches();
    updateStaffSummary();
  }
}

function renderHandovers() {
  let search = document.getElementById("handoverSearch").value;
  let table = "";
  for (let i = 0; i < handovers.length; i++) {
    let record = handovers[i];
    if (searchMatch(record.item + " " + record.person, search)) {
      table += "<tr><td>" + escapeText(record.item) + "</td><td>" + escapeText(record.person) +
        "</td><td>" + escapeText(record.date) + "</td><td><button class='btn btn-small' onclick='editHandover(" + i + ")'>Edit</button> " +
        "<button class='btn btn-small btn-danger' onclick='deleteHandover(" + i + ")'>Delete</button></td></tr>";
    }
  }
  document.getElementById("handoverTable").innerHTML = table;
}

function saveHandover() {
  let record = {
    item: document.getElementById("handoverItem").value.trim(),
    person: document.getElementById("handoverPerson").value.trim(),
    date: document.getElementById("handoverDate").value
  };
  if (record.item === "" || record.person === "" || record.date === "") return false;
  let index = Number(document.getElementById("handoverIndex") ? document.getElementById("handoverIndex").value : -1);
  if (index === -1) handovers.push(record);
  else handovers[index] = record;
  persistData();
  document.getElementById("handoverMessage").innerHTML = "Handover record saved.";
  document.querySelector("#handoverSection form").reset();
  let hidden = document.getElementById("handoverIndex");
  if (hidden) hidden.value = -1;
  renderHandovers();
  return false;
}

function editHandover(index) {
  document.getElementById("handoverItem").value = handovers[index].item;
  document.getElementById("handoverPerson").value = handovers[index].person;
  document.getElementById("handoverDate").value = handovers[index].date;
  let hidden = document.getElementById("handoverIndex");
  if (!hidden) {
    hidden = document.createElement("input");
    hidden.type = "hidden";
    hidden.id = "handoverIndex";
    document.querySelector("#handoverSection form").appendChild(hidden);
  }
  hidden.value = index;
}

function deleteHandover(index) {
  if (confirm("Delete this handover record?")) {
    handovers = removeRecord(handovers, index);
    persistData();
    renderHandovers();
  }
}

renderFoundItems();
renderHandovers();

/* Extra Staff pages: find possible matches and view item status totals. */

function renderLostMatches() {
  let table = "";
  let matches = 0;
  for (let i = 0; i < lostReports.length; i++) {
    let lost = lostReports[i];
    let possible = null;
    for (let j = 0; j < foundItems.length; j++) {
      let found = foundItems[j];
      if (lost.category === found.category || lost.name.toLowerCase() === found.name.toLowerCase()) {
        possible = found;
        break;
      }
    }
    if (possible !== null) {
      matches++;
      table += "<tr><td>" + escapeText(lost.name) + "</td><td>" + escapeText(lost.location) +
        "</td><td><span class='match-label'>" + escapeText(possible.name) + "</span></td><td>" +
        escapeText(possible.location) + "</td></tr>";
    }
  }
  document.getElementById("matchingTable").innerHTML = table || "<tr><td colspan='4'>No possible matches found yet.</td></tr>";
}

function updateStaffSummary() {
  let atOffice = 0;
  let sent = 0;
  let returned = 0;
  for (let i = 0; i < foundItems.length; i++) {
    if (foundItems[i].status === "At Staff Office") atOffice++;
    if (foundItems[i].status === "Sent to Security") sent++;
    if (foundItems[i].status === "Returned") returned++;
  }
  document.getElementById("staffTotalFound").innerHTML = foundItems.length;
  document.getElementById("staffAtOffice").innerHTML = atOffice;
  document.getElementById("staffSentSecurity").innerHTML = sent;
  document.getElementById("staffReturned").innerHTML = returned;
}

renderLostMatches();
updateStaffSummary();
