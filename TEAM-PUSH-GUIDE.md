# LostLink – Team Contribution Structure

This repository is organized so each member owns their HTML, CSS and JavaScript dashboard files. Shared authentication, registration, data and common styling are maintained by the group leader.

## Folder ownership

| Contributor | Own files |
|---|---|
| Member 1 – Admin | `Member-1/index.html`, `Member-1/admin.html`, `Member-1/css/admin.css`, `Member-1/js/home.js`, `Member-1/js/admin.js` |
| Member 2 – Student | `Member-2/student.html`, `Member-2/css/student.css`, `Member-2/js/student.js` |
| Member 3 – University Staff | `Member-3/staff.html`, `Member-3/css/staff.css`, `Member-3/js/staff.js` |
| Member 4 – Security Officer | `Member-4/security.html`, `Member-4/css/security.css`, `Member-4/js/security.js` |
| Group leader – Shared | `login.html`, `register.html`, `shared/css/common.css`, `shared/js/data.js`, `shared/js/common.js`, `shared/js/auth.js`, `shared/js/login.js`, `shared/js/register.js`, root `index.html`, project README files |

## Push workflow

The group leader creates the common repository and commits the shared foundation first. Each member then clones the repository, creates their own branch, edits only their owned files, commits and pushes. The group leader reviews and merges each pull request.

### Member 1
```bash
git switch -c member-1-admin
git add Member-1/index.html Member-1/admin.html Member-1/css/admin.css Member-1/js/home.js Member-1/js/admin.js
git commit -m "Add Member 1 home and admin dashboard"
git push -u origin member-1-admin
```

### Member 2
```bash
git switch main
git pull origin main
git switch -c member-2-student
git add Member-2/student.html Member-2/css/student.css Member-2/js/student.js
git commit -m "Add Member 2 student dashboard"
git push -u origin member-2-student
```

### Member 3
```bash
git switch main
git pull origin main
git switch -c member-3-staff
git add Member-3/staff.html Member-3/css/staff.css Member-3/js/staff.js
git commit -m "Add Member 3 staff dashboard"
git push -u origin member-3-staff
```

### Member 4
```bash
git switch main
git pull origin main
git switch -c member-4-security
git add Member-4/security.html Member-4/css/security.css Member-4/js/security.js
git commit -m "Add Member 4 security dashboard"
git push -u origin member-4-security
```

**Important:** If members work on separate computers, they should clone the common repository and work on their own branch. Do not overwrite shared files. Open a Pull Request to merge each member's branch into `main`.

## Run locally

Open `index.html` with VS Code Live Server. The home page links to the shared login and registration pages. Demo credentials are described in the project README.

## Note

This is a frontend prototype. Authentication and data storage use browser JavaScript and localStorage/sessionStorage; this is not production-grade security or a shared online database.
