/* Home page summary: counts the sample reports in data.js. */

function updateHomeSummary() {
  let totalReports = lostReports.length + foundItems.length;
  let foundCount = foundItems.length;
  let recoveredCount = 0;

  for (let i = 0; i < foundItems.length; i++) {
    if (foundItems[i].status === "Returned") {
      recoveredCount++;
    }
  }

  let progress = 0;
  if (totalReports > 0) {
    progress = Math.round((recoveredCount / totalReports) * 100);
  }

  document.getElementById("homeTotalReports").innerHTML = totalReports;
  document.getElementById("homeFoundItems").innerHTML = foundCount;
  document.getElementById("homeRecoveredItems").innerHTML = recoveredCount;
  document.getElementById("homeProgressText").innerHTML = progress + "%";
  document.getElementById("homeProgressBar").style.width = progress + "%";
}

updateHomeSummary();
