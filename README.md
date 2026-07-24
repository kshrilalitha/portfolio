# Recruiter-Grade Developer Portfolio | K. Shri Lalitha

An award-winning, recruiter-grade, premium personal developer portfolio website designed from scratch. Features a futuristic dark-minimalist theme (`#050505`) with vibrant neon green (`#00ff66`) and neon cyan (`#00f0ff`) accents. Built using high-performance, zero-dependency vanilla HTML5, CSS3, and JavaScript, and designed for instant deployment on GitHub Pages.

---

## ✨ Features

- **Loading Screen**: Pre-loader sequencing displaying identity followed by visual reveal transitions.
- **Interactive Canvas Background**: Slow-moving physics-based particle network connecting nodes that react to mouse movements.
- **Custom Cursor Trail**: Lag-smoothed outer pointer trail that scales, highlights, and magnetizes onto interactive buttons, navigation anchors, and links.
- **Magnetic Buttons**: Elements attract toward the user's cursor dynamically as it approaches, providing high-end micro-interactions.
- **Data-Driven Architecture**: The entire website hydrates dynamically from a single file (`assets/js/data.js`). Easily add new projects, certificates, or achievements without editing complex HTML.
- **Recruiter-Focused Project Modals**: Click "View Details" on projects to open a fullscreen modal covering problem statements, engineering solutions, systems architecture, challenges, and lessons learned.
- **Custom CSS Skills Rings**: Animated SVG circular progress rings that count up to proficiency values when scrolled into the viewport.
- **Interactive Timeline**: Scroll-reveal vertical education timeline with alternating left/right layout shifts.
- **SEO & Accessibility**: Fully indexable structures including canonical definitions, Open Graph tags, Twitter card support, and structured JSON-LD schemas alongside screen-reader support (ARIA labels) and keyboard navigation compliance.

---

## 📂 Project Structure

```text
├── assets/
│   ├── css/
│   │   ├── variables.css      # Design tokens (colors, fonts, variables)
│   │   ├── global.css         # Reset, custom cursor, preloader, scrollbar
│   │   ├── layout.css         # Sticky navigation, hero section, footer grid
│   │   ├── components.css     # Glass cards, progress rings, timelines, modal
│   │   └── animations.css     # Keyframes and scroll reveal transition styles
│   ├── js/
│   │   ├── data.js            # Single source of truth (all portfolio content)
│   │   ├── particles.js       # Canvas background network logic
│   │   ├── cursor.js          # Custom cursor trail & magnetic physics
│   │   ├── navbar.js          # Navigation active spy & sticky behaviors
│   │   └── main.js            # DOM hydration, modal popups, scroll observers
│   └── images/                # Folder for profile pictures & asset images
├── index.html                 # Main interface entry point
├── 404.html                   # Custom error page
├── robots.txt                 # Search engine indexing rules
├── sitemap.xml                # Page index for Google crawler
├── package.json               # Development environment scripts
└── README.md                  # Setup & deployment guide (this file)
```

---

## 🛠️ Local Development

There are two ways to run the project locally:

### Option A: Standard File Open (Zero Dependencies)
Simply double-click `index.html` in your file explorer. Because the project does not require heavy ES module imports (relying instead on safe global hydration in `data.js`), it will work immediately directly in your browser using the `file:///` protocol without triggering CORS errors.

### Option B: Local Live Server (Recommended)
To run with live reloading when code is edited, open your terminal in the project directory and run:

```bash
# Start a local hot-reloading development server
npm run dev
```

This will spin up `live-server` hosting the project at `http://localhost:8080`.

---

## ⚙️ How to Update and Customize Content

To add projects, skills, or update your information, you **only** need to edit `assets/js/data.js`. 

For example, to add a new certificate, simply open `assets/js/data.js` and add an object to the `certifications` array:

```javascript
{
    title: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services (AWS)",
    logo: "AWS",
    certificateUrl: "https://your-certificate-url.com"
}
```

The website will automatically generate cards, style the layouts, and include hover tilts without any HTML modifications needed.

---

## 🚀 Deployment to GitHub Pages

Since this project consists of raw static assets with no compilation/build steps, hosting it on GitHub Pages takes less than a minute:

1. **Create a GitHub Repository**: Log in to your GitHub account and create a new repository (e.g., `portfolio`).
2. **Push Code to Main Branch**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of premium developer portfolio"
   git branch -M main
   git remote add origin https://github.com/your-username/your-repo-name.git
   git push -u origin main
   ```
3. **Enable GitHub Pages**:
   - Go to your repository page on GitHub.
   - Click on the **Settings** tab.
   - Scroll down to the **Pages** section in the left sidebar.
   - Under **Build and deployment**, select **Deploy from a branch** as the source.
   - Choose the `main` branch and `/ (root)` folder, then click **Save**.
4. **Done!**: In a few seconds, GitHub will host your site. The URL will look like: `https://your-username.github.io/your-repo-name/`.
