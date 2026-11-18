/* Shared LostLink demo data. Changes persist in this browser with localStorage. */
function loadSavedData(key, fallback) {
  try {
    let saved = localStorage.getItem("lostlink_" + key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (error) {
    return fallback;
  }
}

let users = loadSavedData("users", [
  { name: "System Admin", username: "admin", password: "admin123", role: "Admin", status: "Active" },
  { name: "Student User", username: "student", password: "student123", role: "Student", status: "Active" },
  { name: "University Staff", username: "staff", password: "staff123", role: "University Staff", status: "Active" },
  { name: "Security Officer", username: "security", password: "security123", role: "Security Officer", status: "Active" }
]);
let lostReports = loadSavedData("lostReports", [
  { owner: "student", name: "Student ID Card", category: "Documents", location: "Academic Building", date: "2026-11-02", description: "Blue card holder", status: "Searching" }
]);
let foundItems = loadSavedData("foundItems", [
  { name: "Black Backpack", category: "Bags", location: "Library", date: "2026-11-01", status: "At Staff Office" },
  { name: "Wireless Earbuds", category: "Electronics", location: "Cafeteria", date: "2026-10-30", status: "Sent to Security" },
  { name: "Course Notebook", category: "Books", location: "Study Area", date: "2026-10-28", status: "Returned" },
  { name: "Keychain", category: "Accessories", location: "University Lobby", date: "2026-10-27", status: "Returned" }
]);
let claims = loadSavedData("claims", [
  { owner: "student", item: "Black Backpack", proof: "Has a blue keychain inside.", status: "Pending" }
]);
let handovers = loadSavedData("handovers", [
  { item: "Wireless Earbuds", person: "Security Desk", date: "2026-10-30" }
]);
let deposits = loadSavedData("deposits", [
  { name: "Wireless Earbuds", description: "White charging case", by: "University Staff", date: "2026-10-30", status: "Stored" }
]);
let releases = loadSavedData("releases", [
  { name: "Old Notebook", claimant: "A. Rahman", proof: "Claimant identified the cover", status: "Verified - Released" }
]);
let accountRequests = loadSavedData("accountRequests", [
  { name: "Nusrat Jahan", username: "nusrat23", role: "Student", status: "Pending" },
  { name: "Mahmud Hasan", username: "mahmud.staff", role: "University Staff", status: "Pending" }
]);
let moderationItems = loadSavedData("moderationItems", [
  { name: "Unknown Gadget", category: "Electronics", reporter: "student23", reason: "Missing item details" },
  { name: "Unclear ID Card", category: "Documents", reporter: "staff01", reason: "Needs report verification" }
]);

function persistData() {
  localStorage.setItem("lostlink_users", JSON.stringify(users));
  localStorage.setItem("lostlink_lostReports", JSON.stringify(lostReports));
  localStorage.setItem("lostlink_foundItems", JSON.stringify(foundItems));
  localStorage.setItem("lostlink_claims", JSON.stringify(claims));
  localStorage.setItem("lostlink_handovers", JSON.stringify(handovers));
  localStorage.setItem("lostlink_deposits", JSON.stringify(deposits));
  localStorage.setItem("lostlink_releases", JSON.stringify(releases));
  localStorage.setItem("lostlink_accountRequests", JSON.stringify(accountRequests));
  localStorage.setItem("lostlink_moderationItems", JSON.stringify(moderationItems));
}
