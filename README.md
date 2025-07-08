Aayush Sharma Portfolio
A modern, responsive portfolio website showcasing Aayush Sharma's skills, projects, and contact information. Built with React.js, Tailwind CSS, and Framer Motion.
Features

Light/dark theme toggle with localStorage persistence
Smooth scrolling with creative animations
Custom animated cursor
Responsive design for mobile, tablet, and desktop
Contact form with EmailJS integration
GitHub API integration for live repository data
PWA support for offline access
SEO optimization with meta tags

Setup

Clone the repository:git clone <repository-url>
cd portfolio


Install dependencies:npm install


Configure EmailJS in /src/utils/api.js with your service ID, template ID, and user ID.
Add placeholder assets in /public and /src/assets/images.
Run the development server:npm run dev


Build for production:npm run build


Deploy to Vercel or Netlify.
```
Folder Structure
portfolio/
├── public/
│   ├── favicon.ico
│   ├── manifest.json
│   ├── resume.pdf
├── src/
│   ├── assets/
│   │   ├── images/
│   │   │   ├── profile.jpg
│   │   │   ├── project1.jpg
│   │   │   ├── project2.jpg
│   │   │   ├── project3.jpg
│   │   │   ├── project4.jpg
│   │   │   ├── project5.jpg
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── SkillIcon.jsx
│   │   ├── Timeline.jsx
│   │   ├── CustomCursor.jsx
│   │   ├── ThemeToggle.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Projects.jsx
│   │   ├── Contact.jsx
│   ├── styles/
│   │   ├── tailwind.css
│   ├── utils/
│   │   ├── api.js
│   │   ├── constants.js
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
├── package.json
├── tailwind.config.js
├── vite.config.js
├── README.md
```
License
MIT License