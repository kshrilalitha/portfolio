// Main Application Initializer & DOM Hydration
document.addEventListener('DOMContentLoaded', () => {
    // 1. Check data availability
    if (!window.portfolioData) {
        console.error("Portfolio data not found. Please ensure data.js is loaded first.");
        return;
    }
    
    // Extract portfolio data
    const data = window.portfolioData;

    // 2. DOM Hydration
    hydratePersonalDetails(data.personal);
    hydrateAboutInterests(data.personal.interests);
    hydrateAboutStats(data.personal.stats);
    hydrateSkillsTabs(data.skills.categories);
    hydrateSkillsGrid(data.skills.list);
    hydrateProjectsGrid(data.projects);
    hydrateAchievementsGrid(data.achievements);
    hydrateCertificationsGrid(data.certifications);
    hydrateWorkshopsGrid(data.workshops);
    hydrateEducationTimeline(data.education);

    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 3. Loading Screen Sequence
    const loaderWrapper = document.getElementById('loaderWrapper');
    setTimeout(() => {
        if (loaderWrapper) {
            loaderWrapper.style.opacity = '0';
            loaderWrapper.style.visibility = 'hidden';
            
            // Allow scrolling once loader completes
            document.body.style.overflow = '';
        }
        // Trigger initial reveal on hero elements
        triggerHeroReveal();
    }, 1800);

    // 4. Initialize Interactive JS Modules
    if (typeof initParticles === 'function') initParticles();
    if (typeof initCursor === 'function') initCursor();
    if (typeof initNavbar === 'function') initNavbar();

    // 5. Setup Typewriter Animation
    initTypewriter(data.personal.roles);

    // 6. Setup Intersection Observer Scroll Reveal
    initScrollReveal();

    // 7. Setup Form Validation & Copy Email
    initContactModule(data.personal.email);

    // 8. Setup Dynamic Modals for Projects
    initProjectModal(data.projects);

    // 9. Setup Card Tilt Physics
    initCardTiltEffect();
});

// --- HELPER FUNCTIONS FOR DOM HYDRATION ---

function hydratePersonalDetails(personal) {
    // Resume Link bindings
    const resumeElements = ['desktopResumeBtn', 'mobileResumeBtn', 'heroResumeBtn'];
    resumeElements.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.setAttribute('href', personal.resumeUrl);
    });

    // Profile photo placeholder
    const profileContainer = document.getElementById('profileImageInner');
    if (profileContainer) {
        profileContainer.innerHTML = personal.photoPlaceholder;
    }

    // Social Links
    const githubLinks = ['heroGithubLink', 'footerGithub'];
    githubLinks.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.setAttribute('href', personal.github);
    });

    const linkedinLinks = ['heroLinkedinLink', 'footerLinkedin', 'contactLinkedin'];
    linkedinLinks.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.setAttribute('href', personal.linkedin);
    });

    // Set Copyright Year
    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
}

function hydrateAboutInterests(interests) {
    const container = document.getElementById('aboutInterests');
    if (!container) return;

    container.innerHTML = interests.map(item => `
        <span class="interest-tag reveal reveal-zoom">
            <i data-lucide="${item.icon}" style="width: 16px; height: 16px;"></i>
            <span>${item.name}</span>
        </span>
    `).join('');
}

function hydrateAboutStats(stats) {
    const container = document.getElementById('aboutStats');
    if (!container) return;

    container.innerHTML = stats.map((stat, idx) => `
        <div class="glass-panel stat-card reveal reveal-left delay-${idx * 100}">
            <div class="stat-num" data-val="${stat.num}" data-suffix="${stat.suffix}">0${stat.suffix}</div>
            <div class="stat-label">${stat.label}</div>
        </div>
    `).join('');
}

function hydrateSkillsTabs(categories) {
    const container = document.getElementById('skillsTabs');
    if (!container) return;

    container.innerHTML = categories.map((cat, idx) => `
        <button class="skills-tab-btn magnetic ${idx === 0 ? 'active' : ''}" data-category="${cat.id}" data-magnetic>
            <span>${cat.name}</span>
        </button>
    `).join('');

    // Tab clicks filter event delegation
    container.addEventListener('click', (e) => {
        const btn = e.target.closest('.skills-tab-btn');
        if (!btn) return;

        // Toggle active
        document.querySelectorAll('.skills-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const cat = btn.getAttribute('data-category');
        filterSkillsGrid(cat);
    });
}

function hydrateSkillsGrid(skillsList) {
    const container = document.getElementById('skillsGrid');
    if (!container) return;

    // SVG progress ring params (Radius: 32, Circumference: 201.06)
    const radius = 32;
    const circ = 2 * Math.PI * radius; // 201.0619

    container.innerHTML = skillsList.map((skill, idx) => {
        let iconHtml = `<i data-lucide="${skill.icon}"></i>`;
        if (skill.icon === 'github') {
            iconHtml = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>`;
        }
        return `
            <div class="glass-panel skill-card reveal reveal-up delay-${(idx % 4) * 100}" data-skill-cat="${skill.category}">
                <div class="skill-icon-wrapper">
                    ${iconHtml}
                </div>
                <h3 class="skill-name">${skill.name}</h3>
                <span class="skill-exp">${skill.exp}</span>
                <div class="skill-progress-container" title="Proficiency: ${skill.percent}%">
                    <svg class="progress-ring" width="80" height="80">
                        <circle class="progress-ring-bg" stroke="rgba(255, 255, 255, 0.03)" stroke-width="6" fill="transparent" r="${radius}" cx="40" cy="40" />
                        <circle class="progress-ring-circle" stroke="var(--color-primary)" stroke-width="6" fill="transparent" 
                                r="${radius}" cx="40" cy="40"
                                stroke-dasharray="${circ} ${circ}"
                                stroke-dashoffset="${circ}"
                                data-percent="${skill.percent}" />
                    </svg>
                    <div class="progress-percent">0%</div>
                </div>
            </div>
        `;
    }).join('');
}

function filterSkillsGrid(category) {
    const cards = document.querySelectorAll('#skillsGrid .skill-card');
    cards.forEach(card => {
        const cat = card.getAttribute('data-skill-cat');
        if (category === 'all' || cat === category) {
            card.style.display = 'flex';
            // Force animation trigger
            card.classList.add('revealed');
            animateCardProgressRing(card);
        } else {
            card.style.display = 'none';
        }
    });
}

function animateCardProgressRing(card) {
    const ring = card.querySelector('.progress-ring-circle');
    const percentEl = card.querySelector('.progress-percent');
    if (!ring || !percentEl) return;

    const percent = parseInt(ring.getAttribute('data-percent'));
    const radius = 32;
    const circ = 2 * Math.PI * radius;
    const offset = circ - (percent / 100) * circ;

    ring.style.strokeDashoffset = offset;
    
    // Count up percentage text
    let count = 0;
    const duration = 800; // ms
    const stepTime = Math.abs(Math.floor(duration / percent));
    const timer = setInterval(() => {
        count++;
        percentEl.textContent = `${count}%`;
        if (count >= percent) {
            clearInterval(timer);
        }
    }, stepTime);
}

function hydrateProjectsGrid(projects) {
    const container = document.getElementById('projectsGrid');
    if (!container) return;

    container.innerHTML = projects.map((proj, idx) => {
        const statusBadge = proj.status ? `<span class="badge badge-status">${proj.status}</span>` : '';
        const categoryBadge = proj.category ? `<span class="badge badge-category">${proj.category}</span>` : '';
        const liveBtn = proj.liveDemo ? `<a href="${proj.liveDemo}" target="_blank" rel="noopener" class="project-btn project-btn-primary"><span>Live Demo</span></a>` : '';
        const codeBtn = proj.github ? `<a href="${proj.github}" target="_blank" rel="noopener" class="project-btn"><span>Source Code</span></a>` : '';

        // Dynamic visual SVG placeholder for project image since physical files are empty
        const svgPlaceholder = `
            <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: radial-gradient(circle at 30% 30%, #151515 0%, #080808 100%); border-bottom: 1px solid var(--color-border); position: relative;">
                <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: ${proj.imageGlow || 'rgba(20, 216, 255, 0.05)'}; filter: blur(30px); z-index: 1;"></div>
                <div class="magnetic" data-magnetic style="z-index: 2; display: flex; flex-direction: column; align-items: center; gap: 0.5rem; color: var(--color-text-muted);">
                    <i data-lucide="folder-git-2" style="width: 42px; height: 42px; color: var(--color-primary); filter: drop-shadow(var(--glow-primary));"></i>
                    <span style="font-family: var(--font-heading); font-size: 0.8rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;">CODE SYSTEM</span>
                </div>
            </div>
        `;

        return `
            <article class="project-card reveal reveal-up delay-${(idx % 3) * 100}">
                <div class="project-img-wrapper">
                    <div class="project-badges">
                        ${statusBadge}
                        ${categoryBadge}
                    </div>
                    ${svgPlaceholder}
                </div>
                <div class="project-card-content">
                    <h3 class="project-title">${proj.title}</h3>
                    <p class="project-desc">${proj.description}</p>
                    <div class="project-tech-list">
                        ${proj.tech.map(t => `<span class="project-tech-badge">${t}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        ${liveBtn}
                        ${codeBtn}
                        <button class="project-btn modal-trigger-btn" data-project-id="${proj.id}">
                            <span>View Details</span>
                        </button>
                    </div>
                </div>
            </article>
        `;
    }).join('');
}

function hydrateAchievementsGrid(achievements) {
    const container = document.getElementById('achievementsGrid');
    if (!container) return;

    container.innerHTML = achievements.map((ach, idx) => {
        const certificateBtn = ach.certificateUrl ? `
            <a href="${ach.certificateUrl}" class="btn btn-outline btn-sm magnetic" data-magnetic style="margin-top: 1rem; align-self: flex-start;">
                <span>View Certificate</span>
                <i data-lucide="external-link" style="width: 14px; height: 14px;"></i>
            </a>
        ` : '';

        return `
            <div class="glass-panel achievement-card reveal reveal-right delay-${idx * 100}">
                <div class="achievement-icon-wrapper">
                    <i data-lucide="award"></i>
                </div>
                <div class="achievement-details" style="width: 100%;">
                    <span class="achievement-rank">${ach.rank}</span>
                    <h3 class="achievement-title">${ach.competition}</h3>
                    <p class="achievement-desc">${ach.description}</p>
                    <span class="achievement-date">${ach.date}</span>
                    ${certificateBtn}
                </div>
            </div>
        `;
    }).join('');
}

function hydrateCertificationsGrid(certifications) {
    const container = document.getElementById('certificatesGrid');
    if (!container) return;

    container.innerHTML = certifications.map((cert, idx) => `
        <div class="glass-panel certificate-card reveal reveal-up delay-${(idx % 4) * 100}">
            <div class="certificate-logo">
                <i data-lucide="shield-check" style="width: 24px; height: 24px;"></i>
            </div>
            <h3 class="certificate-title">${cert.title}</h3>
            <span class="certificate-issuer">${cert.issuer}</span>
            <a href="${cert.certificateUrl}" class="btn btn-outline btn-sm magnetic" data-magnetic style="margin-top: 1rem; width: 100%;">
                <span>View Certificate</span>
                <i data-lucide="external-link" style="width: 14px; height: 14px;"></i>
            </a>
        </div>
    `).join('');
}

function hydrateWorkshopsGrid(workshops) {
    const container = document.getElementById('workshopsGrid');
    if (!container) return;

    container.innerHTML = workshops.map((workshop, idx) => `
        <div class="glass-panel certificate-card workshop-card reveal reveal-up delay-${(idx % 3) * 100}">
            <div class="certificate-logo">
                <i data-lucide="${workshop.icon || 'award'}" style="width: 24px; height: 24px;"></i>
            </div>
            <h3 class="certificate-title">${workshop.title}</h3>
            <span class="certificate-issuer" style="margin-bottom: 0.25rem;">${workshop.organizer}</span>
            <span class="badge badge-category" style="align-self: flex-start; margin-bottom: 1rem; font-size: 0.7rem; padding: 0.15rem 0.5rem;">${workshop.category}</span>
            <p class="achievement-desc" style="font-size: 0.85rem; line-height: 1.5; flex-grow: 1; margin-bottom: 1.5rem;">${workshop.description}</p>
            <span class="achievement-date" style="font-size: 0.8rem; color: var(--color-text-dark); margin-bottom: 1rem; display: block;">Date: ${workshop.date || 'May 2026'}</span>
            <a href="${workshop.certificateUrl || '#'}" target="_blank" rel="noopener" class="btn btn-outline btn-sm magnetic" data-magnetic style="width: 100%;">
                <span>View Certificate</span>
                <i data-lucide="external-link" style="width: 14px; height: 14px;"></i>
            </a>
        </div>
    `).join('');
}

function hydrateEducationTimeline(education) {
    const container = document.getElementById('educationTimeline');
    if (!container) return;

    container.innerHTML = education.map((edu, idx) => {
        const sideClass = idx % 2 === 0 ? 'timeline-item-left' : 'timeline-item-right';
        const revealClass = idx % 2 === 0 ? 'reveal-right' : 'reveal-left';
        
        return `
            <div class="timeline-item ${sideClass} reveal ${revealClass} delay-${idx * 100}">
                <div class="timeline-dot"></div>
                <div class="glass-panel timeline-card">
                    <span class="timeline-date">${edu.date}</span>
                    <h3 class="timeline-degree">${edu.degree}</h3>
                    <div class="timeline-institution">${edu.institution}</div>
                    <div class="timeline-grade">${edu.grade}</div>
                </div>
            </div>
        `;
    }).join('');
}

// --- TYPEWRITER SUBTITLE ANIMATION ---

function initTypewriter(roles) {
    const el = document.getElementById('typedText');
    if (!el) return;

    let roleIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentRole = roles[roleIdx];
        
        if (isDeleting) {
            el.textContent = currentRole.substring(0, charIdx - 1);
            charIdx--;
            typingSpeed = 50; // Deletes faster
        } else {
            el.textContent = currentRole.substring(0, charIdx + 1);
            charIdx++;
            typingSpeed = 100; // Normal typing speed
        }

        // Logic check
        if (!isDeleting && charIdx === currentRole.length) {
            // Stay completed for 1.8s
            typingSpeed = 1800;
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            roleIdx = (roleIdx + 1) % roles.length;
            typingSpeed = 500; // Pause before typing next
        }

        setTimeout(type, typingSpeed);
    }

    // Start typing loop
    setTimeout(type, 1000);
}

// --- VIEWPORT SCROLL REVEAL (INTERSECTION OBSERVER) ---

function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // If it is a skill card, trigger progress ring animations
                if (entry.target.classList.contains('skill-card')) {
                    animateCardProgressRing(entry.target);
                }
                
                // If it contains statistics grid cards, start count animation
                if (entry.target.classList.contains('stat-card')) {
                    animateStatCounter(entry.target);
                }
                
                // Stop observing once animated in
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% is visible
        rootMargin: '0px 0px -50px 0px' // offset bottom trigger slightly
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
}

function triggerHeroReveal() {
    const heroElements = document.querySelectorAll('#home .reveal');
    heroElements.forEach(el => {
        el.classList.add('revealed');
    });
}

function animateStatCounter(card) {
    const numEl = card.querySelector('.stat-num');
    if (!numEl) return;

    const val = parseFloat(numEl.getAttribute('data-val'));
    const suffix = numEl.getAttribute('data-suffix') || '';
    
    let currentVal = 0;
    const duration = 1200; // ms
    const isFloat = val % 1 !== 0;
    
    const increments = 40;
    const stepTime = duration / increments;
    const stepVal = val / increments;
    let count = 0;

    const counterInterval = setInterval(() => {
        currentVal += stepVal;
        count++;
        
        if (isFloat) {
            numEl.textContent = currentVal.toFixed(2) + suffix;
        } else {
            numEl.textContent = Math.floor(currentVal) + suffix;
        }

        if (count >= increments) {
            clearInterval(counterInterval);
            // Lock value
            numEl.textContent = val + suffix;
        }
    }, stepTime);
}

// --- PROJECT DETAIL MODALS ---

function initProjectModal(projects) {
    const modal = document.getElementById('projectModal');
    const closeBtn = document.getElementById('modalClose');
    const triggers = document.querySelectorAll('.modal-trigger-btn');
    
    if (!modal || !closeBtn) return;

    function openModal(projectId) {
        const proj = projects.find(p => p.id === projectId);
        if (!proj) return;

        // Hydrate Modal Data
        document.getElementById('modalTitle').textContent = proj.title;
        document.getElementById('modalProblem').textContent = proj.problem || proj.description;
        document.getElementById('modalSolution').textContent = proj.solution || '';
        document.getElementById('modalArchitecture').textContent = proj.architecture || '';
        document.getElementById('modalChallenges').textContent = proj.challenges || '';
        document.getElementById('modalLearnings').textContent = proj.learnings || '';
        
        // Status & Category Badges
        const statusBadge = document.getElementById('modalStatusBadge');
        if (statusBadge) {
            statusBadge.textContent = proj.status;
            statusBadge.className = 'badge badge-status'; // Reset classes
        }
        
        const catBadge = document.getElementById('modalCategoryBadge');
        if (catBadge) {
            catBadge.textContent = proj.category;
        }

        // Features list
        const featuresList = document.getElementById('modalFeatures');
        if (featuresList) {
            featuresList.innerHTML = proj.features.map(f => `<li>${f}</li>`).join('');
        }

        // Improvements list
        const improvementsList = document.getElementById('modalImprovements');
        if (improvementsList) {
            if (proj.futureImprovements && proj.futureImprovements.length > 0) {
                improvementsList.parentElement.style.display = 'block';
                improvementsList.innerHTML = proj.futureImprovements.map(imp => `<li>${imp}</li>`).join('');
            } else {
                improvementsList.parentElement.style.display = 'none';
            }
        }

        // Tech stack
        const techStack = document.getElementById('modalTechStack');
        if (techStack) {
            techStack.innerHTML = proj.tech.map(t => `<span class="project-tech-badge">${t}</span>`).join('');
        }

        // Links
        const liveBtn = document.getElementById('modalLiveDemo');
        if (liveBtn) {
            if (proj.liveDemo) {
                liveBtn.style.display = 'inline-flex';
                liveBtn.setAttribute('href', proj.liveDemo);
            } else {
                liveBtn.style.display = 'none';
            }
        }

        const codeBtn = document.getElementById('modalGithub');
        if (codeBtn) {
            if (proj.github) {
                codeBtn.style.display = 'inline-flex';
                codeBtn.setAttribute('href', proj.github);
            } else {
                codeBtn.style.display = 'none';
            }
        }

        // Create Modal image SVG placeholder
        const imgWrapper = modal.querySelector('.modal-img-wrapper');
        const oldImg = document.getElementById('modalImage');
        if (oldImg) oldImg.remove();
        
        const svgPlaceholder = document.createElement('div');
        svgPlaceholder.id = 'modalImage';
        svgPlaceholder.className = 'modal-img';
        svgPlaceholder.style.cssText = `
            width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;
            background: radial-gradient(circle at center, #181818 0%, #050505 100%);
            color: var(--color-primary); position: relative; font-family: var(--font-heading);
        `;
        svgPlaceholder.innerHTML = `
            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: ${proj.imageGlow || 'rgba(20,216,255,0.05)'}; filter: blur(40px); z-index: 1;"></div>
            <div style="z-index: 2; text-align: center;">
                <i data-lucide="terminal" style="width: 60px; height: 60px; margin-bottom: 0.5rem; filter: drop-shadow(var(--glow-primary));"></i>
                <h4 style="font-weight: 800; font-size: 1.2rem; letter-spacing: 0.1em;">${proj.title} INTEGRATION</h4>
            </div>
        `;
        imgWrapper.appendChild(svgPlaceholder);

        // Reinitialize icons in modal
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }

        // Open modal
        modal.classList.add('open');
        document.body.style.overflow = 'hidden'; // Stop background scrolling
    }

    function closeModal() {
        modal.classList.remove('open');
        document.body.style.overflow = '';
    }

    // Bind triggers via event delegation
    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('.modal-trigger-btn');
        if (trigger) {
            const id = trigger.getAttribute('data-project-id');
            openModal(id);
        }
    });

    closeBtn.addEventListener('click', closeModal);
    
    // Close on clicking overlay
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) {
            closeModal();
        }
    });
}

// --- TILT CARD HOVER PHYSICS ---

function initCardTiltEffect() {
    const isTouchDevice = window.matchMedia('(hover: none)').matches || window.innerWidth < 1024;
    if (isTouchDevice) return; // Disable tilt on touchscreens

    // Target elements: project-card, certificate-card, workshop-card, stat-card
    const tiltCards = document.querySelectorAll('.project-card, .certificate-card, .workshop-card, .stat-card, .contact-info-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            
            // Mouse coordinates relative to card center
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            // Max tilt degrees (e.g. 8deg)
            const tiltMax = 8;
            const tiltX = (y / (rect.height / 2)) * -tiltMax;
            const tiltY = (x / (rect.width / 2)) * tiltMax;

            // Apply transforms (rotate and subtle scaling)
            this.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
            this.style.transition = 'transform 0.1s ease-out';
            
            // Optional: shift border glow reflection
            this.style.boxShadow = `0 15px 35px rgba(0, 0, 0, 0.4), 
                                    ${-tiltY * 1.5}px ${tiltX * 1.5}px 25px rgba(20, 216, 255, 0.12)`;
        });

        card.addEventListener('mouseleave', function() {
            // Animate back to resting
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
            this.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
            this.style.boxShadow = '';
            
            setTimeout(() => {
                this.style.transition = '';
            }, 500);
        });
    });
}

// --- CONTACT FORM & COPY TO CLIPBOARD MODULE ---

function initContactModule(emailAddress) {
    // 1. Email Clipboard Copy Action
    const copyBtn = document.getElementById('copyEmailBtn');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(emailAddress).then(() => {
                const label = copyBtn.querySelector('span');
                const icon = copyBtn.querySelector('i');
                
                label.textContent = "Copied to clipboard!";
                copyBtn.style.color = "var(--color-primary)";
                
                setTimeout(() => {
                    label.textContent = "Copy to clipboard";
                    copyBtn.style.color = "";
                }, 2000);
            }).catch(err => {
                console.error("Could not copy text: ", err);
            });
        });
    }

    // 2. Form validation and submit dynamics
    const form = document.getElementById('contactForm');
    const successMsg = document.getElementById('formSuccess');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        const inputs = form.querySelectorAll('.form-input');
        
        inputs.forEach(input => {
            // Reset validation class
            input.classList.remove('invalid');
            
            // Text empty check
            if (!input.value.trim()) {
                input.classList.add('invalid');
                isValid = false;
            }
            
            // Email pattern validation check
            if (input.getAttribute('type') === 'email') {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(input.value.trim())) {
                    input.classList.add('invalid');
                    isValid = false;
                }
            }
        });

        if (isValid) {
            const submitBtn = form.querySelector('button[type="submit"]');
            const submitBtnSpan = submitBtn.querySelector('span');
            
            submitBtnSpan.textContent = "Dispatching...";
            submitBtn.style.pointerEvents = "none";

            // Submit using free AJAX FormSubmit.co service
            const formData = {
                name: document.getElementById('formName').value,
                email: document.getElementById('formEmail').value,
                message: document.getElementById('formMessage').value
            };

            fetch(`https://formsubmit.co/ajax/${emailAddress}`, {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Network response was not ok.');
            })
            .then(data => {
                // Trigger success visual state
                form.style.display = "none";
                if (successMsg) successMsg.classList.add('visible');
                form.reset();
            })
            .catch(error => {
                console.error("Submission error:", error);
                submitBtnSpan.textContent = "Transmit Message";
                submitBtn.style.pointerEvents = "";
                alert("Message transmission failed. Please try again or copy email directly.");
            });
        }
    });

    // Clear validation classes on user input
    form.querySelectorAll('.form-input').forEach(input => {
        input.addEventListener('input', () => {
            input.classList.remove('invalid');
        });
    });
}
