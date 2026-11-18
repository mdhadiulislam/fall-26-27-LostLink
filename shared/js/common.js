/* Common functions used by all LostLink pages. */

function showSection(sectionId) {
  let sections = document.getElementsByClassName("page-section");
  for (let i = 0; i < sections.length; i++) {
    sections[i].style.display = "none";
  }
  document.getElementById(sectionId).style.display = "block";

  let buttons = document.querySelectorAll(".topnav button");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].className = "";
  }
  let activeButton = document.getElementById("nav-" + sectionId);
  if (activeButton) {
    activeButton.className = "active";
  }
}

function showError(fieldId, message) {
  document.getElementById(fieldId + "Error").innerHTML = message;
}

function clearErrors() {
  let errors = document.getElementsByClassName("error");
  for (let i = 0; i < errors.length; i++) {
    errors[i].innerHTML = "";
  }
}

function searchMatch(text, search) {
  return text.toLowerCase().indexOf(search.toLowerCase()) !== -1;
}

function removeRecord(list, index) {
  return list.slice(0, index).concat(list.slice(index + 1));
}

function escapeText(text) {
  return String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
