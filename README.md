Responsive Web Interface – Righthome Clone
This project is a responsive frontend web application built using React (Next.js) and SCSS. It replicates a Figma design and demonstrates clean component structuring, responsive layout techniques, and custom animations — without relying on external CSS libraries.
Features
Fully responsive layout supporting mobile, tablet, and desktop views

Pixel-perfect design matching the provided Figma specifications

Modular and reusable React component architecture

Custom animations implemented with SCSS transitions

No external CSS/UI libraries (e.g., Tailwind, Bootstrap, MUI) used

Tech Stack
Framework: React (Next.js)

Styling: SCSS (no external CSS frameworks)

Deployment: Vercel

Version Control: Git & GitHub

Project Structure
/app
  ├── components/         # Reusable UI components
  ├── globals.scss        # Global SCSS styling
  ├── page.tsx            # Main page layout or entry
  └── layout.tsx          # Root layout configuration
Getting Started
Clone the repository

bash
Copy
Edit
git clone https://github.com/your-username/project-name.git
cd project-name
Install dependencies

bash
Copy
Edit
npm install
Install SCSS support

bash
Copy
Edit
npm install sass
Run the development server

bash
Copy
Edit
npm run dev
Build for production

bash
Copy
Edit
npm run build
Notes
Ensure globals.scss is located in the app/ directory and is imported using a relative path like:

js
Copy
Edit
import './globals.scss';
This project does not use any UI libraries; all layout and styling are done manually using SCSS.
