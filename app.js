import { advanceAxis } from './lib/bounce.js';

const $ = (selector) => document.querySelector(selector);
const content = $('#screen-content');
const screen = $('#screen');
const routes = ['home', 'about', 'artifacts', 'bonus', 'contact'];
const routeNames = { profiles: 'HELLO', home: 'MENU', about: 'ABOUT', artifacts: 'LAB 01', bonus: 'BONUS', contact: 'SAY HI', screensaver: 'DVD' };
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const storage = {
  get(key) { try { return localStorage.getItem(`phv-${key}`); } catch { return null; } },
  set(key, value) { try { localStorage.setItem(`phv-${key}`, value); } catch { /* Preferences are optional. */ } },
};
let audience = ['professor', 'recruiter', 'curious'].includes(storage.get('audience')) ? storage.get('audience') : 'curious';
let motionPaused = storage.get('motion') === 'paused' || reducedMotion.matches;
let soundEnabled = false;
let powered = true;
let route = 'profiles';
let previousRoute = 'home';
let animationFrame = 0;
let toastTimer;
let transitionTimer;
let celebrationTimer;
let audioContext;
let saver;
let readingMode = storage.get('reading') === 'true';

const icons = {
  professor: `<svg viewBox="0 0 100 100" aria-hidden="true"><path d="m36 16 14 10 15-11" fill="none" stroke="#425347" stroke-width="3" stroke-linecap="round"/><rect x="15" y="28" width="70" height="54" rx="12" fill="#65785d" stroke="#425347" stroke-width="2.5"/><rect x="22" y="35" width="48" height="37" rx="8" fill="#e7e9cb"/><circle cx="77" cy="43" r="3" fill="#e4c289"/><path d="M75 56h5m-5 6h5M32 82l-4 6m41-6 4 6" stroke="#425347" stroke-width="3" stroke-linecap="round"/><circle cx="36" cy="51" r="3" fill="#465443"/><circle cx="56" cy="51" r="3" fill="#465443"/><path d="M39 61q7 7 14 0" fill="none" stroke="#465443" stroke-width="2" stroke-linecap="round"/><path d="M29 44h13v12H29zm20 0h13v12H49zm-7 5h7" fill="none" stroke="#465443" stroke-width="2"/></svg>`,
  recruiter: `<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M36 31v-8q0-5 5-5h18q5 0 5 5v8" fill="none" stroke="#8b5c46" stroke-width="4"/><rect x="13" y="30" width="74" height="53" rx="9" fill="#b97f5a" stroke="#82523d" stroke-width="2.5"/><path d="M13 45q37 19 74 0" fill="none" stroke="#82523d" stroke-width="2.5"/><rect x="44" y="47" width="12" height="13" rx="3" fill="#f4dbac" stroke="#82523d" stroke-width="2"/><circle cx="35" cy="65" r="2.6" fill="#603e35"/><circle cx="65" cy="65" r="2.6" fill="#603e35"/><path d="M44 73q6 5 12 0" fill="none" stroke="#603e35" stroke-width="2" stroke-linecap="round"/><path d="m79 11 2 6 6 2-6 2-2 6-2-6-6-2 6-2Z" fill="#f4e2ba"/></svg>`,
  curious: `<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M45 19q6-13 13-1 14-7 15 8 15 0 9 15 13 8 0 17 7 14-8 16-1 16-16 8-9 13-17 0-15 7-17-9-16 0-9-15-13-8 0-17-7-14 9-17 1-15 16-5Z" fill="#d5c2e9" stroke="#79608e" stroke-width="2"/><circle cx="40" cy="47" r="4" fill="#6a4f7c"/><circle cx="61" cy="47" r="4" fill="#6a4f7c"/><path d="M37 61q14 15 28 0" fill="none" stroke="#6a4f7c" stroke-width="3" stroke-linecap="round"/><circle cx="30" cy="57" r="5" fill="#c09eca"/><circle cx="71" cy="57" r="5" fill="#c09eca"/></svg>`,
  flower: `<svg viewBox="0 0 100 100" aria-hidden="true"><path d="M44 15q7-15 15 0 15-7 16 10 17 0 10 16 15 8 0 17 7 15-10 16-1 17-17 10-8 15-16 0-15 7-16-10-17 0-10-16-15-8 0-16-7-16 10-17 1-16 18-10Z" fill="#c4d3a7" stroke="#84936c" stroke-width="1.5"/><circle cx="41" cy="45" r="3" fill="#566649"/><circle cx="62" cy="45" r="3" fill="#566649"/><path d="M39 58q13 13 26 0" stroke="#566649" stroke-width="2.5" fill="none" stroke-linecap="round"/></svg>`,
  chat: `<svg class="chat-art" viewBox="0 0 80 65" aria-hidden="true"><path d="M8 8h62v40H32L18 60V48H8Z" fill="#e7dbf1" stroke="#6f5584" stroke-width="2"/><circle cx="25" cy="28" r="3" fill="#725787"/><circle cx="39" cy="28" r="3" fill="#725787"/><circle cx="53" cy="28" r="3" fill="#725787"/></svg>`,
};

const viewerNames = { professor: 'DR. COLLINS', recruiter: 'RECRUITER', curious: 'GUEST' };
const nav = (active) => `<nav class="menu-nav" aria-label="DVD chapters">${routes.map((item, i) => `<a href="#${item}" ${active === item ? 'aria-current="page"' : ''}><span>0${i + 1}</span>${({ home: 'MAIN MENU', about: 'ABOUT ME', artifacts: 'COURSEWORK', bonus: 'PROJECTS', contact: 'CONTACT' })[item]}</a>`).join('')}<button class="viewer-badge" data-route="profiles" aria-label="Change viewer, currently ${viewerNames[audience]}">${viewerNames[audience]} ▾</button></nav>`;
const footer = () => `<div class="screen-footer"><button data-reading-mode aria-pressed="${readingMode}">${readingMode ? '▣ DVD VIEW' : 'Aa READING VIEW'}</button><a href="#profiles">⏏ CHANGE VIEWER</a></div>`;
const wrap = (active, html) => `<section class="content-view ${active}-view">${nav(active)}${html}${footer()}</section>`;

function profileView() {
  return `<section class="profile-view" aria-labelledby="page-title"><p class="eyebrow">WELCOME TO PALINASONIC</p><h1 id="page-title">Who's tuning in?</h1><p class="profile-subtitle">Select a profile.</p><div class="profiles">${[
    ['professor', 'Dr. Collins', 'COURSEWORK'],
    ['recruiter', 'Recruiter', 'PROJECTS'],
    ['curious', 'Guest', 'EXPLORE'],
  ].map(([id, name, caption]) => `<button class="profile" data-audience="${id}"><span class="avatar">${icons[id]}<span class="profile-arrow" aria-hidden="true">↗</span></span><span class="profile-name">${name}</span><span class="profile-caption">${caption}</span></button>`).join('')}</div><button class="skip-profile" data-route="home">Main menu ↗</button></section>`;
}

function homeView() {
  const path = audience === 'professor' ? 'artifacts' : audience === 'recruiter' ? 'bonus' : 'about';
  const label = audience === 'professor' ? 'EXPLORE THE COURSEWORK' : audience === 'recruiter' ? 'SEE WHAT I BUILD' : 'ABOUT ME';
  const intro = audience === 'professor' ? 'My AIML-500 portfolio documents my coursework and progress in AI and machine learning.' : audience === 'recruiter' ? 'I build web, mobile, and backend applications, with experience in scientific computing and a growing focus on AI and machine learning.' : 'I’m a software engineer based in Dearborn, Michigan, studying AI and machine learning at Indiana Wesleyan University.';
  return wrap('home', `<div class="home-grid"><div class="home-copy"><span class="eyebrow">PALINA SKAKUN / PORTFOLIO</span><h1 id="page-title">Hello, world.<br />I'm <em>Palina.</em></h1><p>${intro}</p><a class="screen-button" href="#${path}"><span aria-hidden="true">▶</span> ${label}</a></div><div class="portrait-composition"><span class="tape" aria-hidden="true"></span><div class="portrait-frame"><img src="./assets/palina.webp" alt="Palina smiling at her Michigan State graduation, beneath pink blossoms" width="400" height="400" /><span>Michigan State · 2025</span></div><div class="portrait-flower">${icons.flower}</div></div></div><div class="home-bottom"><a href="#artifacts"><span class="chapter-number">01</span><span>Coursework<small>AIML-500 • WORKSHOP 1</small></span><span class="chapter-arrow" aria-hidden="true">↗</span></a><a href="#bonus"><span class="chapter-number">02</span><span>Selected projects<small>WEB, MOBILE & EXPERIMENTS</small></span><span class="chapter-arrow" aria-hidden="true">↗</span></a></div>`);
}

function aboutView() {
  return wrap('about', `<header class="page-heading"><span class="eyebrow">ABOUT / PALINA SKAKUN</span><h1 id="page-title">About me.</h1><p>Software engineering, education, and experience.</p></header><div class="bio-layout"><div class="body-copy"><p>I’m Palina Skakun, a software engineer based in Dearborn, Michigan. I graduated from Michigan State University’s Honors College with a B.S. in Computer Science in 2025, and I’m continuing my learning in AI and machine learning at Indiana Wesleyan University.</p><p>My mom, a software engineer, was my first inspiration. I chose computer science for the challenge, then stayed for the chance to build things that make someone’s day a little easier.</p><p>I’ve worked across web apps, mobile experiences, and scientific computing. Outside the code, I’ve been a resident assistant, a calculus learning assistant, and a dancer — including a Detroit Pistons halftime performance. Helping people understand and feel included is a thread through all of it.</p></div><div class="bio-photo"><img src="./assets/palina.webp" alt="Palina at her MSU graduation" width="300" height="300" loading="lazy" /><span>MSU, class of 2025 ♡</span></div></div><section class="value-statement"><h2>THE VALUE I BRING</h2><p>I help product teams turn complex ideas into approachable software. My experience across web, mobile, and scientific computing brings a practical engineering perspective to my growing AI/ML work, with a focus on usability, clear communication, and thoughtful implementation.</p></section><h2 class="section-title">EXPERIENCE</h2>${[
    ['Software Developer · Lightning Workgroup', 'SEP 2025 — JAN 2026', 'Shipped full-stack features with C#/.NET, Vue.js, and PostgreSQL, working through peer review, testing, and deployments with a remote team.'],
    ['Computational Chemistry Intern · ATTMOS', 'MAY — SEP 2025', 'Containerized GPU-accelerated chemistry tools and built wrappers to make scientific workflows more portable and reproducible.'],
    ['iOS Application Developer · Launch / NTT Data', 'JAN — MAY 2025', 'Contributed to a wearable AI assistant with a Swift iOS app, a Flask API, YOLOv8 object detection, and Azure speech services for a capstone team.'],
    ['Web Application Development Intern · U-M ITS', 'MAY — AUG 2024', 'Built and tested Ruby on Rails features for LSA SpaceReady, a classroom management application serving more than 300 rooms.'],
  ].map(([title, date, description]) => `<article class="experience-row"><h3>${title}</h3><span class="date">${date}</span><p>${description}</p></article>`).join('')}<h2 class="section-title">TOOLS & TECHNOLOGIES</h2><div class="skill-chips">${['Python', 'Swift', 'C# / .NET', 'Vue.js', 'React', 'Ruby on Rails', 'Flask', 'PostgreSQL', 'Docker', 'AWS', 'Azure', 'PyTorch'].map(s => `<span>${s}</span>`).join('')}</div><div class="plain-nav"><a href="#bonus">VIEW PROJECTS ↗</a><a href="#contact">CONTACT ↗</a></div>`);
}

function artifactView() {
  const team = ['Akshaya Sree Baskaran', 'Dalong Chen', 'Pranay Kumar Mesa', 'Vishal Krishna Sirigiri', 'Palina Skakun', 'Unaiera Syed', 'Renfang Xu', 'Zijun Yu'];
  return wrap('artifacts', `
    <header class="page-heading">
      <span class="eyebrow">ARTIFACT 01 / AIML-500 / WORKSHOP 1.4</span>
      <h1 id="page-title">Boredom Buster AI.</h1>
      <p>A team-built chatbot prototype that helps people explore activities through a conversation about their interests, time, and preferences.</p>
    </header>
    <article class="artifact-feature">
      <div class="artifact-cover"><small>PALINASONIC<br />AIML-500 / DISC 01</small><h2>Boredom<br />Buster AI</h2>${icons.chat}<span>WORKSHOP 1.4 / TEAM 1</span></div>
      <div class="artifact-summary">
        <span class="inline-tag artifact-published">PUBLISHED PROTOTYPE · TEAM PROJECT</span>
        <h2>From “I’m bored” to a fun idea.</h2>
        <p>Our team explored chatbot platforms, developed conversational instructions, and tested ways to offer personalized activity ideas. This entry presents the submitted Base44 prototype alongside the project report and original team documentation.</p>
        <div class="artifact-meta">TEAM 1 · OCTOBER 2026 · AI LAB</div>
        <div class="artifact-actions"><a class="screen-button" href="https://beat-boredom-bot.base44.app/" target="_blank" rel="noopener noreferrer">OPEN CHATBOT ↗</a><a class="screen-button secondary" href="./assets/artifacts/boredom-buster-report.pdf" target="_blank" rel="noopener noreferrer">PROJECT REPORT · PDF ↗</a></div>
      </div>
    </article>

    <div class="artifact-details">
      <details open><summary>01 / Introduction & description</summary><div>
        <p><strong>Intended audience:</strong> students and early-stage AI builders who want an approachable example of conversational recommendations and the practical tradeoffs of chatbot platforms.</p>
        <p>Boredom Buster AI was selected from several team ideas, including campus support, food services, travel, writing, troubleshooting, meal planning, and budgeting assistants. The chosen concept uses a familiar problem: someone has free time but does not know what to do.</p>
        <p>The intended conversation gathers interests, available time, mood, location when relevant, and activity preferences, then suggests options and refines them in response to feedback. The deliverables include a published Base44 prototype, a project submission, and documentation showing instructions, alternative prototypes, and example conversations.</p>
      </div></details>

      <details><summary>02 / Objective</summary><div>
        <p>Create a friendly, interactive chatbot that helps a user identify an activity suited to their situation, while practicing AI-assisted prototyping, instruction design, platform comparison, and collaborative testing.</p>
        <p>The team’s specified workflow was to ask manageable follow-up questions, offer three to five activity ideas, and adapt the next response to the user’s feedback. Activities could include hobbies, entertainment, exercise, social plans, or places to visit.</p>
      </div></details>

      <details><summary>03 / Process & collaboration</summary><div>
        <ol class="artifact-process">
          <li><strong>Explore the problem.</strong> Brainstormed several assistant concepts and selected activity discovery as the shared development focus.</li>
          <li><strong>Define the conversation.</strong> Drafted instructions for gathering preferences, recommending activities, avoiding repeated questions, and refining suggestions within the current conversation.</li>
          <li><strong>Compare platforms.</strong> Built an initial ChatGPT prototype and investigated sharing in the team’s setup. The documentation records a sharing obstacle that prompted further platform exploration.</li>
          <li><strong>Work within constraints.</strong> Tested Mizou; the team recorded a 1,000-character instruction limit against a desired 3,289-character configuration. The documentation includes example conversations and a Mizou prototype.</li>
          <li><strong>Present the deliverable.</strong> Submitted a shareable Base44 prototype, with the report linking directly to the app and the documentation retaining screenshots of the different implementations.</li>
        </ol>
        <p><strong>Attribution:</strong> this is shared Team 1 work. I am credited as a team member, and this portfolio presents the collaborative result without assigning the entire implementation or the team’s testing to one person.</p>
      </div></details>

      <details><summary>04 / Tools & technologies</summary><div>
        <dl class="artifact-tools">
          <div><dt>ChatGPT</dt><dd>Feature exploration, drafting and refining instructions, initial chatbot configuration, testing, and troubleshooting, as recorded in the team’s AI-use disclosure.</dd></div>
          <div><dt>Mizou</dt><dd>An alternative chatbot prototype and conversation testing, including the documented instruction-length constraint.</dd></div>
          <div><dt>Base44</dt><dd>The published web prototype linked from the submitted report.</dd></div>
          <div><dt>Google Docs & PDF</dt><dd>Collaborative documentation, screenshots, project reporting, and shareable evidence.</dd></div>
        </dl>
        <p>The documented approach used existing AI tools. It does not establish custom model training, a specific underlying model version, or a controlled performance benchmark.</p>
      </div></details>

      <details><summary>05 / Artifact value proposition</summary><div>
        <h3>Unique value</h3>
        <p>For new AI builders comparing ways to create a chatbot, this artifact pairs an accessible activity-recommendation prototype with the instructions, screenshots, and platform constraints behind it. It makes the development decisions visible alongside the result.</p>
        <h3>Relevance to the audience</h3>
        <p>Readers can use the project as a starting point for planning conversational questions, checking whether a platform supports the instructions they need, and making a prototype easy for others to access. It connects with my broader focus on making complex technology approachable through usable software and clear communication.</p>
      </div></details>

      <details><summary>06 / Evidence, examples & limitations</summary><div>
        <figure class="artifact-screenshot"><a href="./assets/boredom-buster-preview.jpg" target="_blank" rel="noopener noreferrer"><img src="./assets/boredom-buster-preview.jpg" alt="The published Boredom Buster AI homepage, with an activity prompt, suggestion buttons, and its robot mascot" loading="lazy" /></a><figcaption>Published Base44 prototype, captured October 27, 2026. Select the image to view it at full size.</figcaption></figure>
        <h3>A documented conversation</h3>
        <p>In the Mizou example on page 5 of the team documentation, a user asks for creative ideas and then explains that they are not an artist. The chatbot moves from broad suggestions to explaining DIY projects and suggesting options such as a vision board or photo collage. This example illustrates conversational refinement rather than a measured success rate.</p>
        <div class="artifact-actions"><a class="screen-button secondary" href="./assets/artifacts/boredom-buster-team-documentation.pdf#page=5" target="_blank" rel="noopener noreferrer">READ THE EXAMPLE · PDF ↗</a><a class="screen-button secondary" href="./assets/artifacts/boredom-buster-team-documentation.pdf" target="_blank" rel="noopener noreferrer">FULL DOCUMENTATION · PDF ↗</a></div>
        <h3>Limits of the evidence</h3>
        <p>The report and screenshots document a course prototype, not a formal accuracy study. Local event dates, prices, and availability should be checked against current sources. Remembering preferences within one conversation does not demonstrate persistent memory across sessions.</p>
      </div></details>

      <details><summary>07 / Team credits & references</summary><div>
        <h3>Team 1</h3><ul class="team-credits">${team.map(name => `<li>${name}</li>`).join('')}</ul>
        <h3>References</h3>
        <p>Team 1. (2026, October 25). <em>Workshop 1.4 AI Lab: Boredom Buster AI Chatbot.</em> AIML500-01N1B, Indiana Wesleyan University. <a class="text-link" href="./assets/artifacts/boredom-buster-report.pdf" target="_blank" rel="noopener noreferrer">Project report (PDF)</a>.</p>
        <p>Yu, Z., Xu, R., Syed, U., Skakun, P., Sirigiri, V. K., Mesa, P. K., Chen, D., & Baskaran, A. S. (2026, October 23). <em>Team 1 AI chatbot documentation.</em> <a class="text-link" href="./assets/artifacts/boredom-buster-team-documentation.pdf" target="_blank" rel="noopener noreferrer">Documentation (PDF)</a>.</p>
        <h3>AI-use disclosure</h3>
        <p>The team’s submission discloses using ChatGPT to explore features, refine instructions, configure and test prototypes, and troubleshoot. Mizou and Base44 supported prototype design and testing. The team retained responsibility for platform evaluation, configuration, collaboration, and decisions.</p>
      </div></details>
    </div>
    <h2 class="section-title">FUTURE COURSE ARTIFACTS</h2>
    <div class="coming-slots">${[2, 3, 4, 5].map(n => `<div><b>0${n}</b><span>FUTURE COURSE ARTIFACT</span></div>`).join('')}</div>
  `);
}


const projects = [
  { title: 'TSIKAVA Coffee', image: 'tsikava-cornflower.png', alt: 'TSIKAVA Cornflower blueberry-matcha drink illustration with a striped straw, blueberries, and a Belarusian label', live: 'https://tsikava-coffee-r6qjgyd8n-palinaskakuns-projects.vercel.app/', featured: true, subtitle: 'Coffee-shop prototype', description: 'My proudest project so far: a coffee-shop web prototype that brings a Belarusian-inspired brand into a complete browsing and ordering experience. It combines a drink menu, customization, a persistent cart, customer accounts, order history, and a Stripe sandbox checkout.', features: ['Brand & interface design', 'Drink customization', 'Accounts & orders', 'Sandbox checkout'], tags: 'NEXT.JS / TYPESCRIPT / SUPABASE / STRIPE • PROTOTYPE', repo: 'tsikava-coffee' },
  { title: 'Vektor', mark: 'v↗', color: '#b4c5a5', subtitle: 'Career navigation', description: 'A career navigation prototype with a basecamp dashboard, route cards, an action plan, and a client-side job analyzer. Its current analyzer uses keywords and seeded data; a server-side AI integration is a future step.', tags: 'NEXT.JS / TYPESCRIPT / TAILWIND • PROTOTYPE', repo: 'vektor-ai' },
  { title: 'Photos Cleaner', image: 'photo-cleaner.webp', alt: 'Photos Cleaner iOS app interface from Palina’s previous portfolio', subtitle: 'Photo management for iOS', description: 'An iOS photo management project that turns clearing a camera roll into a simple keep-or-delete gesture. A small, practical problem with a playful mobile interface.', tags: 'SWIFT / iOS / GESTURE-BASED UX', repo: 'photos-cleaner' },
  { title: 'An adoption experience, reimagined', mark: '♡', color: '#d8b59d', subtitle: 'Pet adoption experience', description: 'An independent portfolio redesign exploring pet discovery, accessible profiles, saved pets, and a responsible matching assistant. A design concept, unaffiliated with the Capital Area Humane Society.', tags: 'TYPESCRIPT / WEB / INDEPENDENT DESIGN CONCEPT', repo: 'humane-society-reimagined' },
  { title: 'Catch the Banana', mark: '⌁', color: '#d7cc8d', subtitle: 'Catcher game', description: 'A mouse-controlled catcher game with falling bananas, lives, and three levels. The project began with Python and Pygame.', tags: 'PYTHON / PYGAME / GAME EXPERIMENT', repo: 'Catch-The-Banana' },
];

function bonusView() {
  return wrap('bonus', `<header class="page-heading"><span class="eyebrow">PROJECTS / INDEPENDENT WORK</span><h1 id="page-title">Selected projects.</h1><p>Web, mobile, and game projects from my GitHub repositories.</p></header><div class="project-list">${projects.map(project => `<article class="project ${project.featured ? 'project-featured' : ''}"><div class="project-visual ${project.image ? '' : 'text-art'}" ${project.image ? '' : `style="background:${project.color}"`}>${project.image ? `<img src="./assets/${project.image}" alt="${project.alt}" width="200" height="400" loading="lazy" />` : `<span aria-hidden="true">${project.mark}</span>`}</div><div>${project.featured ? '<span class="featured-label">FEATURED PROJECT</span>' : ''}<span class="eyebrow">${project.subtitle}</span><h2>${project.title}</h2><p>${project.description}</p>${project.features ? `<ul class="project-features">${project.features.map(feature => `<li>${feature}</li>`).join('')}</ul>` : ''}<div class="project-tags">${project.tags}</div><div class="project-actions">${project.live ? `<a class="screen-button" href="${project.live}" target="_blank" rel="noopener noreferrer">VISIT THE PROJECT ↗</a>` : ''}<a class="project-link" href="https://github.com/palinaskakun/${project.repo}" target="_blank" rel="noopener noreferrer">${project.live ? 'SOURCE ON GITHUB ↗' : 'EXPLORE THE PROJECT ↗'}</a></div></div></article>`).join('')}</div><p class="bonus-note">These are independent and earlier projects. Required AIML-500 artifacts live in the coursework chapter.</p><div class="plain-nav"><a href="https://github.com/palinaskakun?tab=repositories" target="_blank" rel="noopener noreferrer">ALL REPOSITORIES ↗</a><a href="#contact">CONTACT ↗</a></div>`);
}

function contactView() {
  return wrap('contact', `<header class="page-heading"><span class="eyebrow">CONTACT</span><h1 id="page-title">Get in touch.</h1><p>For project opportunities, collaboration, or questions about my work.</p></header><div class="contact-layout"><div class="contact-links"><a href="mailto:palinaskakun@gmail.com"><span>Email</span><small>↗</small></a><a href="https://www.linkedin.com/in/palinaskakun" target="_blank" rel="noopener noreferrer"><span>LinkedIn</span><small>↗</small></a><a href="https://github.com/palinaskakun" target="_blank" rel="noopener noreferrer"><span>GitHub</span><small>↗</small></a><button class="copy-email" data-copy-email>palinaskakun@gmail.com <span>COPY</span></button></div><div class="contact-disc" aria-hidden="true"><span>Palina Skakun</span><small>PALINA SKAKUN / VOL. 01</small></div></div><div class="contact-footer">Based in Dearborn, Michigan. Building on a background in software engineering and continuing my learning in AI and machine learning.<br /><a href="#profiles">Return to profiles</a>.</div>`);
}

function saverView() {
  return `<section class="screensaver-view" aria-label="Bouncing DVD screensaver"><h1 class="sr-only" id="page-title">The DVD screensaver</h1><div class="dvd-logo" id="dvd-logo" aria-hidden="true"><svg viewBox="0 0 150 85"><text x="75" y="49" text-anchor="middle" fill="currentColor" font-family="Arial, sans-serif" font-style="italic" font-weight="900" font-size="58" letter-spacing="-6">DVD</text><ellipse cx="76" cy="61" rx="60" ry="8" fill="currentColor"/><ellipse cx="76" cy="61" rx="14" ry="3" fill="#302737"/><text x="76" y="82" text-anchor="middle" fill="currentColor" font-family="Arial, sans-serif" font-size="11" letter-spacing="11">VIDEO</text></svg></div><div class="corner-celebration" id="corner-celebration" role="status"></div><div class="saver-controls"><p id="corner-count">CORNER HITS: 00</p><div class="saver-control-row"><button data-manifest>MANIFEST A CORNER ✧</button><button data-saver-pause>${motionPaused ? 'RESUME LOGO' : 'PAUSE LOGO'}</button><button data-saver-exit>BACK TO THE MENU ↵</button></div></div></section>`;
}

function showToast(message) {
  clearTimeout(toastTimer);
  $('#toast').textContent = message;
  $('#toast').classList.add('visible');
  toastTimer = setTimeout(() => $('#toast').classList.remove('visible'), 3200);
}

function playClick() {
  if (!soundEnabled) return;
  try {
    audioContext ??= new (window.AudioContext || window.webkitAudioContext)();
    if (audioContext.state === 'suspended') audioContext.resume();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(660, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(370, audioContext.currentTime + .055);
    gain.gain.setValueAtTime(.045, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(.001, audioContext.currentTime + .065);
    oscillator.connect(gain);
    gain.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + .07);
  } catch { /* A silent menu still works in browsers without Web Audio. */ }
}

function updateMotion() {
  document.body.classList.toggle('effects-paused', motionPaused);
  $('#motion-button').setAttribute('aria-pressed', String(motionPaused));
  $('#motion-button').title = motionPaused ? 'Resume visual effects' : 'Pause visual effects';
  $('#motion-label').textContent = motionPaused ? 'PAUSED' : 'MOTION';
  const pause = $('[data-saver-pause]');
  if (pause) pause.textContent = motionPaused ? 'RESUME LOGO' : 'PAUSE LOGO';
}

function setMotion(paused) {
  motionPaused = paused;
  storage.set('motion', paused ? 'paused' : 'playing');
  updateMotion();
}

function navigate(target) {
  if (!powered) setPower(true);
  if (location.hash === `#${target}`) render(target);
  else location.hash = target;
}

function updateReadingButtons() {
  document.querySelectorAll('[data-reading-mode]').forEach(button => {
    button.setAttribute('aria-pressed', String(readingMode));
    button.textContent = readingMode ? '▣ DVD VIEW' : 'Aa READING VIEW';
  });
}

function updateScrollHint() {
  $('#scroll-hint').classList.toggle('visible', powered && !['profiles', 'screensaver'].includes(route) && !readingMode && content.scrollHeight - content.clientHeight - content.scrollTop > 16);
}

function render(target, focus = true) {
  const valid = [...routes, 'profiles', 'screensaver'].includes(target) ? target : 'profiles';
  if (valid !== 'screensaver') previousRoute = valid;
  route = valid;
  document.body.classList.toggle('screensaver-active', valid === 'screensaver');
  document.body.classList.toggle('reading-mode', readingMode);
  stopSaver();
  powered = true;
  $('#television').classList.remove('powered-off');
  updatePowerControls();
  const views = { profiles: profileView, home: homeView, about: aboutView, artifacts: artifactView, bonus: bonusView, contact: contactView, screensaver: saverView };
  content.innerHTML = views[valid]();
  content.scrollTop = 0;
  $('#channel-label').innerHTML = `${valid === 'screensaver' ? 'DVD' : 'AV 1'} <span class="osd-small">STEREO</span>`;
  $('#osd-right').textContent = valid === 'profiles' ? 'DVD / PORTFOLIO' : valid === 'screensaver' ? 'DVD SCREENSAVER' : `CH ${String(routes.indexOf(valid) + 1).padStart(2, '0')} / ${routeNames[valid]}`;
  $('#deck-status').textContent = routeNames[valid];
  document.title = `${({profiles:'Choose your channel',home:'Main menu',about:'About Palina',artifacts:'Boredom Buster AI · Artifact 1',bonus:'Selected projects',contact:'Contact',screensaver:'Waiting for the corner'})[valid]} — Palina Skakun · Palinasonic`;
  if (!motionPaused && focus) {
    clearTimeout(transitionTimer);
    screen.classList.remove('channel-changing');
    requestAnimationFrame(() => screen.classList.add('channel-changing'));
    transitionTimer = setTimeout(() => screen.classList.remove('channel-changing'), 250);
  }
  if (focus) content.focus({ preventScroll: true });
  if (valid === 'screensaver') startSaver();
  updateMotion();
  updateReadingButtons();
  requestAnimationFrame(updateScrollHint);
}

function updatePowerControls() {
  for (const selector of ['#power-button', '#remote-power-button']) {
    const button = $(selector);
    button.setAttribute('aria-pressed', String(powered));
    button.setAttribute('aria-label', powered ? 'Turn television off' : 'Turn television on');
    button.title = powered ? 'Turn television off' : 'Turn television on';
  }
}

function setPower(on) {
  powered = on;
  if (on) { render(route); return; }
  stopSaver();
  $('#television').classList.add('powered-off');
  updatePowerControls();
  $('#deck-status').textContent = 'STANDBY';
  $('#scroll-hint').classList.remove('visible');
  content.innerHTML = '<section class="power-view"><p>STANDBY</p><button class="screen-button" data-power-on>⏻ TURN IT BACK ON</button></section>';
  content.focus({ preventScroll: true });
}

function stopSaver() {
  cancelAnimationFrame(animationFrame);
  clearTimeout(celebrationTimer);
  saver = null;
}

function startSaver() {
  const logo = $('#dvd-logo');
  saver = { x: 30, y: 80, vx: 63, vy: 39, time: 0, hits: 0, color: 0, manifest: false };
  const colors = ['#c6a2ea', '#c7dfa4', '#e3b794', '#9acbd8', '#dfa7c5'];
  function frame(time) {
    if (!saver || !logo.isConnected) return;
    const seconds = saver.time ? Math.min((time - saver.time) / 1000, .05) : 0;
    saver.time = time;
    const maxX = Math.max(0, content.clientWidth - logo.offsetWidth);
    const maxY = Math.max(0, content.clientHeight - logo.offsetHeight);
    // A resized screen clamps the logo before the next physical step.
    saver.x = Math.min(saver.x, maxX);
    saver.y = Math.min(saver.y, maxY);
    if (!motionPaused && !document.hidden) {
      const x = advanceAxis(saver.x, saver.vx, seconds, maxX);
      const y = advanceAxis(saver.y, saver.vy, seconds, maxY);
      Object.assign(saver, { x: x.position, y: y.position, vx: x.velocity, vy: y.velocity });
      if (x.hit || y.hit) logo.style.color = colors[++saver.color % colors.length];
      if (x.hit && y.hit && seconds > 0) {
        saver.hits++;
        $('#corner-count').textContent = `CORNER HITS: ${String(saver.hits).padStart(2, '0')}`;
        $('#corner-celebration').innerHTML = '<strong>It hit the corner!</strong><span>DVD VIDEO</span>';
        $('#corner-celebration').classList.add('active');
        clearTimeout(celebrationTimer);
        celebrationTimer = setTimeout(() => {
          const celebration = $('#corner-celebration');
          if (celebration) { celebration.classList.remove('active'); celebration.textContent = ''; }
        }, 2200);
        playClick();
      }
    }
    logo.style.transform = `translate(${saver.x}px, ${saver.y}px)`;
    animationFrame = requestAnimationFrame(frame);
  }
  animationFrame = requestAnimationFrame(frame);
}

function manifestCorner() {
  if (!saver) return;
  const logo = $('#dvd-logo');
  saver.x = 0;
  saver.y = 0;
  saver.vx = Math.max(0, content.clientWidth - logo.offsetWidth) / 4;
  saver.vy = Math.max(0, content.clientHeight - logo.offsetHeight) / 4;
  setMotion(false);
  showToast('The logo will reach the corner in four seconds.');
}

document.addEventListener('click', async (event) => {
  const button = event.target.closest('button, a');
  if (!button) return;
  if (button.classList.contains('skip-link')) {
    event.preventDefault();
    content.focus({ preventScroll: true });
    content.scrollIntoView({ block: 'start', behavior: 'instant' });
    return;
  }
  playClick();
  if (button.dataset.audience) {
    audience = button.dataset.audience;
    storage.set('audience', audience);
    navigate('home');
  } else if (button.dataset.route) {
    navigate(button.dataset.route);
  } else if (button.hasAttribute('data-copy-email')) {
    try {
      await navigator.clipboard.writeText('palinaskakun@gmail.com');
      showToast('Email copied.');
    } catch { showToast('My email: palinaskakun@gmail.com'); }
  } else if (button.hasAttribute('data-power-on')) setPower(true);
  else if (button.hasAttribute('data-reading-mode')) {
    readingMode = !readingMode;
    storage.set('reading', String(readingMode));
    document.body.classList.toggle('reading-mode', readingMode);
    updateReadingButtons();
    updateScrollHint();
    content.scrollTop = 0;
    document.querySelector('#television').scrollIntoView({ behavior: 'instant', block: 'start' });
    showToast(readingMode ? 'Reading view enabled.' : 'DVD view enabled.');
  }
  else if (button.hasAttribute('data-manifest')) manifestCorner();
  else if (button.hasAttribute('data-saver-pause')) setMotion(!motionPaused);
  else if (button.hasAttribute('data-saver-exit')) navigate(previousRoute === 'screensaver' ? 'home' : previousRoute);
  else if (button.dataset.remote) {
    const action = button.dataset.remote;
    if (action === 'home') navigate('home');
    else if (action === 'menu') navigate('profiles');
    else if (action === 'back') navigate(route === 'profiles' ? 'home' : 'profiles');
    else {
      const index = routes.indexOf(route);
      navigate(index < 0 ? (action === 'previous' ? 'contact' : 'home') : routes[(index + (action === 'previous' ? -1 : 1) + routes.length) % routes.length]);
    }
  }
});

$('#motion-button').addEventListener('click', () => {
  setMotion(!motionPaused);
  showToast(motionPaused ? 'Visual effects paused.' : 'Visual effects enabled.');
});
$('#sound-button').addEventListener('click', () => {
  soundEnabled = !soundEnabled;
  $('#sound-button').setAttribute('aria-pressed', String(soundEnabled));
  $('#sound-button').title = soundEnabled ? 'Disable button sounds' : 'Enable button sounds';
  $('#sound-label').textContent = 'SOUND';
  if (soundEnabled) playClick();
});
for (const selector of ['#power-button', '#remote-power-button']) {
  $(selector).addEventListener('click', () => setPower(!powered));
}
$('#screensaver-button').addEventListener('click', () => navigate(route === 'screensaver' ? previousRoute : 'screensaver'));
$('#bounce-link').addEventListener('click', () => navigate('screensaver'));
$('#eject-button').addEventListener('click', () => { navigate('profiles'); showToast('Disc ejected.'); });

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && route === 'screensaver') navigate(previousRoute);
  if (event.key === 'Escape' && !powered) setPower(true);
});
window.addEventListener('hashchange', () => render(location.hash.slice(1)));
content.addEventListener('scroll', updateScrollHint, { passive: true });
new ResizeObserver(updateScrollHint).observe(content);
reducedMotion.addEventListener('change', (event) => { if (event.matches) setMotion(true); });
const startTime = Date.now();
setInterval(() => {
  const elapsed = Math.floor((Date.now() - startTime) / 1000);
  $('#deck-time').textContent = [Math.floor(elapsed / 3600), Math.floor(elapsed / 60) % 60, elapsed % 60].map(n => String(n).padStart(2, '0')).join(':');
}, 1000);

render(location.hash.slice(1) || 'profiles', false);
