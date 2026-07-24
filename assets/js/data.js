// Portfolio Data Configuration for K. Shri Lalitha
window.portfolioData = {
    personal: {
        name: "K. Shri Lalitha",
        title: "K. Shri Lalitha",
        roles: [
            "Web Developer",
            "Frontend Developer",
            "AI Enthusiast",
            "Hackathon Builder",
            "UI/UX Designer"
        ],
        description: "Computer Science Engineering student at The National Institute of Engineering, Mysuru. Passionate about building robust, aesthetic, and AI-driven frontend experiences that bridge the gap between design and functionality.",
        cgpa: "9.38",
        college: "The National Institute of Engineering, Mysuru",
        location: "Mysuru, Karnataka, India",
        email: "shreelalithar@gmail.com",
        phone: "+91 9980369473", // Placeholder
        github: "https://github.com/kshrilalitha",
        linkedin: "https://linkedin.com/in/k-shri-lalitha-reddy-0aa82233a",
        resumeUrl: "./Resume2.pdf",
        photoPlaceholder: `
            <img src="./profile.jpeg" alt="K. Shri Lalitha" style="width: 100%; height: 100%; object-fit: cover; filter: brightness(0.95) contrast(1.05);">
        `,
        interests: [
            { name: "Web Development", icon: "code" },
            { name: "Artificial Intelligence", icon: "cpu" },
            { name: "Problem Solving", icon: "git-branch" },
            { name: "UI Design", icon: "figma" },
            { name: "Hackathons", icon: "award" }
        ],
        stats: [
            { num: 5, suffix: "+", label: "Projects Built" },
            { num: 4, suffix: "+", label: "Hackathons & Events" },
            { num: 5, suffix: "", label: "Certifications" },
            { num: 9.38, suffix: "", label: "Current CGPA" },
            { num: 12, suffix: "+", label: "GitHub Repos" }
        ]
    },
    skills: {
        categories: [
            { id: "all", name: "All Skills" },
            { id: "programming", name: "Programming" },
            { id: "frontend", name: "Frontend" },
            { id: "backend", name: "Backend" },
            { id: "database", name: "Database" },
            { id: "tools", name: "Developer Tools" }
        ],
        list: [
            // Programming
            { name: "Java", percent: 75, exp: "Intermediate", category: "programming", icon: "coffee" },
            { name: "Python", percent: 80, exp: "Intermediate", category: "programming", icon: "terminal" },
            { name: "C", percent: 75, exp: "Intermediate", category: "programming", icon: "code" },
            { name: "JavaScript", percent: 75, exp: "Intermediate", category: "programming", icon: "file-code" },
            { name: "SQL", percent: 80, exp: "Intermediate", category: "programming", icon: "database" },
            
            // Frontend
            { name: "HTML", percent: 95, exp: "Expert", category: "frontend", icon: "globe" },
            { name: "CSS", percent: 90, exp: "Advanced", category: "frontend", icon: "layout" },
            
            // Backend
            { name: "Django", percent: 80, exp: "Intermediate", category: "backend", icon: "server" },
            { name: "Node.js", percent: 75, exp: "Intermediate", category: "backend", icon: "zap" },
            
            // Database
            { name: "MySQL", percent: 75, exp: "Intermediate", category: "database", icon: "layers" },
            
            // Developer Tools
            { name: "Git", percent: 75, exp: "Intermediate", category: "tools", icon: "git-merge" },
            { name: "GitHub", percent: 90, exp: "Advanced", category: "tools", icon: "github" },
            { name: "VS Code", percent: 95, exp: "Expert", category: "tools", icon: "sliders" },
            { name: "IntelliJ IDEA", percent: 80, exp: "Intermediate", category: "tools", icon: "box" },
            { name: "Figma", percent: 75, exp: "Intermediate", category: "tools", icon: "feather" },
            { name: "Canva", percent: 85, exp: "Advanced", category: "tools", icon: "image" }
        ]
    },
    projects: [
        {
            id: "jananicare-ai",
            title: "JananiCare AI",
            category: "Maternal Healthcare / AI",
            status: "Completed",
            completion: "100%",
            image: "assets/images/project2.jpg",
            imageGlow: "rgba(0, 240, 255, 0.1)",
            description: "AI-powered maternal healthcare solution focusing on emergency response, tracking, and risk prediction.",
            features: [
                "One-tap voice-triggered SOS Alerts with coordinates dispatch",
                "Multilingual Voice Input for logging health details seamlessly",
                "AI risk prediction module calculating early pregnancy warning indicators",
                "Live location mapping and nearest clinical emergency router",
                "Automated push notifications for medical checkups and vaccinations"
            ],
            tech: ["Python", "Machine Learning", "JavaScript", "HTML5", "CSS3"],
            github: "https://github.com/kshrilalitha/jananicare-ai",
            liveDemo: "https://jananicare-ai.vercel.app/",
            problem: "Maternal health issues, particularly in rural regions, suffer from slow emergency communication channels, lack of timely risk indicators, and accessibility issues due to language barriers and literacy differences.",
            solution: "JananiCare AI is a lightweight mobile-responsive portal that allows users to record parameters using local dialect voice instructions. The AI checks these details for critical anomalies, while a one-click floating SOS immediately resolves coordinates and routes medical assist staff.",
            architecture: "The application parses user speech in real-time on the client using the Web Speech API. Structured data is passed to a lightweight Scikit-Learn prediction engine that runs in the background. Hospital locating is powered by Leaflet.js maps integrating OpenStreetMap API.",
            challenges: "Ensuring low-latency voice logging and offline support for rural locations with spotty 2G/3G connectivity.",
            learnings: "Gained exposure to audio stream capture protocols, client-side accessibility optimization, and training robust classification trees for medical risk profiling.",
            futureImprovements: [
                "Developing an offline sync mode using Web SQL / IndexedDB",
                "Partnering with local SMS gateways for automated alerts without internet access"
            ]
        },
         {
            id: "gramyaai",
            title: "GramyaAI",
            category: "Accessibility / EdTech",
            status: "Completed",
            completion: "100%",
            image: "assets/images/project3.jpg",
            imageGlow: "rgba(255, 255, 255, 0.05)",
            description: "AI Interview and application platform designed for uneducated and semi-skilled workers.",
            features: [
                "Full audio-first conversational application wizard",
                "Comprehensive visual dashboard for recruitment admins",
                "Accessibility-focused layout with ultra-clear icons and large touch elements",
                "Multilingual localization supporting local dialects",
                "Dynamic voice questions and direct transcription matching"
            ],
            tech: ["React", "Node.js", "Express", "MongoDB", "CSS3"],
            github: "https://github.com/kshrilalitha/Gramya-AI",
            liveDemo: "https://gramya-ai.vercel.app/",
            problem: "Semi-skilled workers frequently struggle with typing-intensive online employment applications, resulting in digital exclusion and reduced job opportunities.",
            solution: "GramyaAI replaces dense forms with an automated voice interviewer. The system speaks to the applicant, records their verbal response, and auto-fills administrative forms behind the scenes, allowing workers to apply using their voice.",
            architecture: "React client-side interface utilizing CSS Variables for high-contrast accessibility. A Node.js and Express backend coordinates audio file buffering, interfaces speech-to-text translators, and commits candidate records to a MongoDB document cluster.",
            challenges: "Accurately transcribing and classifying slang and regional pronunciations of common job titles and skills.",
            learnings: "Mastered Web Accessibility standards (WCAG 2.1 AA), state-management in complex forms, and database optimizations for heavy media schemas.",
            futureImprovements: [
                "Integrating real-time speech-to-text models that run fully on-device to reduce network latency",
                "Providing interactive pictorial guides for interview prompts"
            ]
        },
        {
            id: "portfolio-website",
            title: "Premium Portfolio",
            category: "Portfolio / Frontend",
            status: "Active",
            completion: "100%",
            image: "assets/images/project4.jpg",
            imageGlow: "rgba(20, 216, 255, 0.12)",
            description: "Recruiter-grade responsive developer portfolio with high-performance animations and custom graphics.",
            features: [
                "Interactive Canvas-based connecting particle network background",
                "Smooth custom cursor with mouse-lag trail and magnetic buttons",
                "Fully data-driven template hydration using a single configuration file",
                "Clean dark theme (#050505) with neon accents and glassmorphism elements",
                "Scroll reveal transitions and interactive SVG progress counters"
            ],
            tech: ["HTML5", "CSS3", "JavaScript"],
            github: "https://github.com/kshrilalitha/portfolio",
            liveDemo: null, // No live demo
            problem: "Standard static resume pages fail to engage recruiters and fail to demonstrate interactive design skills, responsiveness, and performance optimization.",
            solution: "Designed a premium, immersive portfolio featuring a minimalist aesthetic and a physics-based interactive background that keeps visitors engaged while proving vanilla JavaScript proficiency.",
            architecture: "Zero-dependency pure HTML, CSS, and Vanilla JS structure. The system parses this configuration file at load, dynamically builds the DOM components (reducing HTML clutter), and runs intersection-spy engines to manage viewport triggers.",
            challenges: "Optimizing the canvas particles rendering loops to prevent layout shifts and keep FPS at a stable 60 on mobile screens.",
            learnings: "Honed details in HSL color coordinates, performance-centric requestAnimationFrame loops, custom CSS keyframe mechanics, and semantic SEO optimizations.",
            futureImprovements: [
                "Adding a custom audio synthesizer toggle for interactive hover sounds",
                "Implementing a localized CMS dashboard to manage entries through a GUI"
            ]
        },
          {
            id: "docushield-ai",
            title: "DocuShield AI",
            category: "AI / Security",
            status: "In Progress",
            completion: "80%",
            image: "assets/images/project1.jpg",
            imageGlow: "rgba(20, 216, 255, 0.15)",
            description: "AI-powered document fraud detection and tamper forensic analysis platform for secure authentication.",
            features: [
                "Error Level Analysis (ELA) to locate compression anomalies",
                "EXIF and file Metadata parsing for structural manipulation history",
                "Forensic visual heatmaps highlighting suspicious zones",
                "Pixel-level tampering detection using convolutional feature models",
                "Automated risk scoring and downloadable audit reports"
            ],
            tech: ["Python", "FastAPI", "JavaScript", "HTML5", "CSS3"],
            github: "https://github.com/kshrilalitha/suraksha",
            liveDemo: null,
            problem: "With the rise of high-quality image manipulation tools, verifying the authenticity of scanned identity certificates, contracts, and financial documents is incredibly difficult manually, leading to rising identity fraud and security breaches.",
            solution: "DocuShield AI builds an accessible browser interface connected to a FastAPI analytics core. It subjects documents to multiple forensic filters including EXIF structure checks, JPEG compression analysis (ELA), and deep pixel checking, offering immediate heatmaps indicating exactly where files were edited.",
            architecture: "Vanilla JS Frontend communicating with a backend built using Python & FastAPI. Image analytics filters are written in Python utilizing OpenCV, NumPy, and PIL. Custom convolutional architectures analyze artifacts and generate localized heatmaps served back as clean Base64 streams.",
            challenges: "Matching alignment coordinates when performing pixel subtraction on documents with varying sizes and rotation angles.",
            learnings: "Deepened knowledge in advanced image processing matrices, FastAPI asynchronous queue handling, and building secure frontend canvas engines.",
            futureImprovements: [
                "Integrating real-time OCR reading to compare metadata text with visual document content",
                "Adding support for secure digital signatures verification (PDF hash checks)"
            ]
        },
        {
            id: "karnataka-local-food-finder",
            title: "Karnataka Food Finder",
            category: "Web App",
            status: "Completed",
            completion: "100%",
            image: "assets/images/project5.jpg",
            imageGlow: "rgba(0, 240, 255, 0.05)",
            description: "Explore traditional Karnataka cuisine categorized by region, with interactive search and recipes.",
            features: [
                "Interactive regional mapping showing culinary hotspots (Coastal, North, South Karnataka)",
                "Full search with dynamic keyword matches and filtering parameters",
                "Responsive layout optimized for mobile screens",
                "Rich typography detailing local heritage recipes",
                "Aesthetic card hover effects showcasing regional delicacies"
            ],
            tech: ["HTML5", "CSS3", "python", "JavaScript", "Django"],
            github: "https://github.com/kshrilalitha/Foodfinder",
            liveDemo: null, // No live demo
            problem: "Traditional regional recipes and culinary heritage of Karnataka are scattered across blogs, making it hard for food enthusiasts to discover dishes filtered by geographical origin.",
            solution: "Created an immersive culinary directory cataloging traditional cuisines. Users click on regional sectors to instantly filter recipes, read about ingredient histories, and explore local food spots.",
            architecture: "Static website designed with modern flexbox grids, vanilla JS search filtering algorithm, and localized JSON-structured recipe databases hydrated locally.",
            challenges: "Creating high-contrast layout filters that display clearly on mobile screens without requiring grid overlays.",
            learnings: "Improved knowledge in DOM list filtering, CSS flex properties, SVG path styling, and structured content indexing.",
            futureImprovements: [
                "Adding user reviews and recipe upload modules",
                "Integrating Google Maps API to pin actual restaurants serving each dish"
            ]
        }
    ],
    achievements: [
        {
            rank: "🥈 2nd Place",
            competition: "Astramind UI/UX Competition",
            description: "Secured second place in the institute-wide UI/UX Design Hackathon, designing an intuitive digital workspace for neurodivergent students.",
            date: "May 2026",
            certificateUrl: "./ideathon2.jpeg"
        },
        {
            rank: "🏅 4th Place",
            competition: "Vibeathon Hackathon",
            description: "Placed fourth among 80+ competing teams with JananiCare AI, building a fully functional MVP of the maternal healthcare portal within 36 hours.",
            date: "April 2026",
            certificateUrl: "./vidyaHackathon.jpeg"
        }
    ],
    certifications: [
        {
            title: "Front-End Development",
            issuer: "Coursera",
            logo: "Coursera",
            certificateUrl: "./Frontend.jpeg"
        },
        {
            title: "Data Structures",
            issuer: "Coursera",
            logo: "Coursera",
            certificateUrl: "./Data Structures.jpeg"
        },
        {
            title: "Python (Basic)",
            issuer: "HackerRank",
            logo: "HackerRank",
            certificateUrl: "./Python.jpeg"
        },
        {
            title: "Linear Algebra",
            issuer: "Coursera",
            logo: "Coursera",
            certificateUrl: "./Linear Algebra.jpeg"
        }
    ],
    education: [
        {
            institution: "The National Institute of Engineering, Mysuru",
            date: "2024 - 2028",
            degree: "B.Tech in Computer Science & Engineering",
            grade: "Current CGPA: <span>9.38</span>"
        },
        {
            institution: "BKG PU College",
            date: "2022 - 2024",
            degree: "Pre-University Education (PCMC)",
            grade: "Percentage: <span>96.0%</span>"
        },
        {
            institution: "Saint Paul's English Medium School",
            date: "2012 - 2022",
            degree: "Secondary School Certification (SSLC)",
            grade: "Percentage: <span>89.0%</span>"
        }
    ],
    workshops: [
        {
            title: "MLExplore AI Workshop",
            organizer: "NIE Mysuru",
            category: "Workshop",
            description: "Participated in the MLExplore AI Workshop, where I learned the fundamentals of machine learning and image classification. Gained hands-on experience training AI models using different types of image datasets and understanding the complete machine learning workflow.",
            date: "May 2025",
            certificateUrl: "./ML event.jpeg",
            icon: "cpu"
        },
        {
            title: "WitchHunt Hackathon",
            organizer: "NIE Mysuru",
            category: "Hackathon Participation",
            description: "Participated in the WitchHunt Hackathon as a team member and contributed to the development of JananiCare AI, an AI-powered maternal healthcare platform featuring emergency SOS alerts, AI-based risk prediction, voice-assisted symptom reporting, and location-based emergency support.",
            date: "April 2026",
            certificateUrl: "./hackathon.pdf",
            icon: "terminal"
        },
        {
            title: "Astramind UI/UX Competition",
            organizer: "NIE Mysuru",
            category: "Competition Participation",
            description: "Participated in the Astramind UI/UX Design Competition, collaborating on user-centered interface design, wireframing, prototyping, and creating intuitive user experiences for an innovative solution.",
            date: "May 2026",
            certificateUrl: "./Ideathon.jpeg",
            icon: "layout"
        }
    ]
};
