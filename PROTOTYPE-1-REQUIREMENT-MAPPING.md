# Prototype 1 – Requirement Mapping

| Requirement | LostLink implementation |
|---|---|
| Four users | Admin, Student, University Staff, Security Officer |
| Login for all users | `login.html` and `js/login.js`; role-based redirect |
| Signup for non-admin users | `register.html` and `js/register.js` |
| CRUD and Search | Role-specific dashboard JavaScript files |
| Three unique features per user | Four role dashboards, each with four named sections |
| HTML pages and forms | Separate page and form files |
| CSS UI design | `css/style.css` |
| Separate HTML/CSS/JS | HTML, `css/`, and `js/` structure |
| JavaScript form validation | Login, signup and record form checks |
| DOM manipulation | Dashboard tables, messages, counters, search results and navigation are updated with JavaScript |

## Role features

- Admin: Manage Users, System Report, Account Approvals, Item Moderation.
- Student: My Lost Item Reports, Submit a Claim, Browse Found Items, My Claim History.
- University Staff: Manage Found Items, Item Handover Records, Lost Item Matching, Found Item Summary.
- Security Officer: Security Desk Register, Verify & Release Item, Unclaimed Items, Daily Desk Summary.

**Note:** This project is frontend-only. `localStorage` and `sessionStorage` are used for demonstration; they are not a substitute for backend authentication or a database.
