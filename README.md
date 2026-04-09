# Members Only Club

A simple, fun web app where users can sign up, log in, and post messages to a private “Members Only” board. Admins can be promoted to manage users, and users can join a club with a secret passcode. Built using **Node.js**, **Express**, and **EJS** templates with a modern, clean design.

## Features

- **User Authentication** – Sign up and log in with email and password.  
- **Membership Status** – Users can join the club with a secret passcode.  
- **Admin Role** – Admins can manage users and see special admin options.  
- **Message Board** – Post, view, and browse messages in a private feed.  
- **Consistent UI** – Modern, minimal design using the **Inter** font and styled forms, buttons, and error messages.

## Pages

- **Sign Up** – Register a new account.  
- **Log In** – Access your account.  
- **Home** – View messages, see membership status, and access admin features.  
- **Join Club** – Enter a secret passcode to become a member.  
- **New Message** – Add a new message to the board.  
- **Make Admin** – Enter admin passcode to gain admin privileges (restricted).

## Tech Stack

- **Node.js** + **Express** for the backend.  
- **EJS** for server-side rendered pages.  
- **CSS** for styling forms, buttons, and messages.  
- **JavaScript** for interactivity (if needed).  

## Getting Started

1. **Clone the repository**  
```bash
git clone <your-repo-url>
cd <your-project-folder>
````

2. **Install dependencies**

```bash
npm install
```

3. **Run the server**

```bash
npm start
```

4. **Visit in your browser**
   Open [http://localhost:3000](http://localhost:3000)

## Folder Structure

```
/views      # EJS templates
/public     # Static assets (CSS, images, etc.)
/routes     # Express route handlers
/app.js     # Main Express app
```

## Notes

* All forms are styled consistently with **Inter** font and modern input/button styles.
* Error messages are displayed in red under relevant fields.
* Buttons have hover/focus effects for better UX.

## Future Improvements

* Add **database integration** for persistent storage.
* Enhance **message board** with timestamps, user avatars, and editing.
* Implement **password hashing** and proper authentication with sessions or JWT.
* Add **responsive design tweaks** for mobile devices.
