# LostLink – University Lost & Found Management System

LostLink is a frontend-only university lost-and-found management project built with HTML, CSS and JavaScript. It demonstrates role-based login, signup, forms, validation, DOM manipulation, CRUD operations and search.

## User roles

- **Admin:** Manage Users, System Report, Account Approvals and Item Moderation.
- **Student:** My Lost Item Reports, Submit a Claim, Browse Found Items and My Claim History.
- **University Staff:** Manage Found Items, Item Handover Records, Lost Item Matching and Found Item Summary.
- **Security Officer:** Security Desk Register, Verify & Release Item, Unclaimed Items and Daily Desk Summary.

Each role has a separate dashboard page. Login sends the user to the dashboard assigned to their role. Signup is available for Student, University Staff and Security Officer; Admin is a predefined account.

## Demo login accounts

| Role | Username | Password |
|---|---|---|
| Admin | `admin` | `admin123` |
| Student | `student` | `student123` |
| University Staff | `staff` | `staff123` |
| Security Officer | `security` | `security123` |

The Login page has a **Use** button for each demo account to fill the credentials.

## How to run

1. Extract the ZIP file.
2. Open the `LostLink-Frontend` folder.
3. Open `index.html` in a browser.
4. Select Login and use one of the demo accounts, or create a Student, University Staff or Security Officer account.
5. Use the dashboard tabs to work with the role's sections.

No npm install or server is required for this demonstration.

## Project structure

```text
LostLink-Frontend/
├── index.html
├── login.html
├── register.html
├── admin.html
├── student.html
├── staff.html
├── security.html
├── css/
│   └── style.css
└── js/
    ├── data.js
    ├── common.js
    ├── auth.js
    ├── home.js
    ├── login.js
    ├── register.js
    ├── admin.js
    ├── student.js
    ├── staff.js
    └── security.js
```

## Requirements checklist

- Four distinct user roles and role-specific dashboards.
- Login for all four roles.
- Signup for Student, University Staff and Security Officer.
- CRUD and Search operations in each role dashboard.
- At least three unique features for each role.
- HTML pages and forms, CSS styling, separate JavaScript files.
- JavaScript validation and DOM manipulation.
- Shared demo data stored in browser `localStorage` so updates remain after refreshing the page.

## Storage and security limitations

This is an academic frontend prototype. User accounts and project records are stored in the browser's `localStorage`; the login session uses `sessionStorage`. Passwords are stored in plain text in the browser for demonstration only. The role guard is client-side and can be bypassed by a technically capable user. Do not use real passwords or personal information. A real deployment requires a backend, database, password hashing, server-side authentication and authorization.

## Team contribution folders

For GitHub team contribution, keep each member's files in a separate folder or use separate branches and pull requests. The integrated project in this ZIP is the combined version for final testing; it does not replace the need to show individual Git commits/branches for evaluation.


## Team GitHub contribution structure
See [TEAM-PUSH-GUIDE.md](TEAM-PUSH-GUIDE.md) for exact file ownership and individual push commands.
