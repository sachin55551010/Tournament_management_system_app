🏏 Cricket Tournament Management System
A full-stack web application built to manage cricket tournaments digitally — from player onboarding to team management and match scheduling — designed to solve the problem of discovering, joining, and organizing local tournaments from a single platform.

🚀 Features
🔐 Authentication
Google OAuth login
Secure JWT-based authentication
Automatic player profile creation on first login
👤 Player Profile
Editable player profile (photo, role, stats, contact info)
One player → one team per tournament (enforced at backend level)
🏆 Tournament Management
Any user can create a tournament and becomes the Organiser
Tournament details can be edited only before the tournament starts
Running or completed tournaments cannot be edited or deleted
👥 Team Management
Any logged-in user can add a team to a tournament
Team admin / organiser can:
Edit team details only before playing any match
Invite players via time-limited invite links (7 days expiry)
Backend restrictions prevent unfair team changes after matches
🗓 Match Scheduling
Organiser can schedule matches
Built-in validations:
Same team cannot play multiple matches simultaneously
Team composition locked once match is played
📱 Responsive Design
Fully optimized for mobile, tablet, and desktop
Smooth UI with Tailwind CSS

🛠 Tech Stack
Frontend
React
Redux Toolkit & RTK Query
Tailwind CSS
Vite
Backend
Node.js
Express.js
MongoDB & Mongoose
JWT Authentication
Google OAuth
Socket.io (for future real-time features)
Deployment
Frontend: Vercel
Backend: Render
Database: MongoDB Atlas

🔄 Application Flow
User logs in via Google
Player profile is auto-generated
User can:
Join a team
Create a tournament
Organiser manages teams and schedules matches
Backend validations ensure data integrity and fair play

⏳ Pending Features
🟡 Live Match Scoring (In Progress)
Ball-by-ball updates
Real-time score sync using Socket.io
Player and team stats auto-calculation
🔒 Business Logic Highlights
Tournament data becomes immutable once started
Team structure cannot change after playing a match
Invite links expire automatically
Role-based access control (Player / Team Admin / Organiser)

📌 Why This Project?
This project focuses on real-world constraints, not just CRUD:
Prevents manipulation of running tournaments
Enforces fair participation rules
Designed for scalability and future live features

📷 Demo
👉 Demo video & screenshots coming soon

📬 Feedback & Contributions
Suggestions, ideas, and contributions are always welcome.
Feel free to open an issue or submit a pull request.
