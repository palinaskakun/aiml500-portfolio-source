# Palina Home Video

A nostalgic, playful portfolio for **Palina Skakun**: a charcoal-gray CRT television, plum DVD menu, lavender remote, and three viewer profiles. Built as a first iteration for AIML-500, with room to grow into a professional portfolio.

## Preview

Requires Node.js 20 or newer. No package installation is needed.

```sh
npm run dev
```

Open `http://localhost:5173`. Stop the server with Ctrl+C. To use another port, set `PORT` before running the command.

```sh
npm run check
npm test
npm run build
```

The build produces `dist/`, which can be hosted on Vercel, GitHub Pages, Netlify, Cloudflare Pages, or another static host. All assets and links inside the site use relative paths, including when hosted under a repository subpath.

For Vercel, `vercel.json` sets the build command to `npm run build` and the output directory to `dist`. Commit and push this file before deploying so Vercel uses the correct directory instead of its default `public` directory.

## The experience

- **Viewer picker:** Dr. Collins, Recruiter, and Guest. This is a playful entrance, not authentication. Each profile changes the home introduction and primary call to action. Viewer preference is saved only in the current browser.
- **Main menu:** Introduction, a graduation portrait, and routes into coursework and independent projects.
- **About me:** Bio, personal value proposition, experience, and tools based on supplied material.
- **Coursework:** AI Lab team chatbot placeholder, with all required artifact sections. No completed chatbot, evaluation, or contribution is claimed.
- **Bonus:** Vektor, Photos Cleaner, the independent adoption experience concept, and Catch the Banana. Repository links point to actual public projects.
- **Contact:** Email, LinkedIn, GitHub, and a copy-email button.
- **DVD screensaver:** Real wall reflections, color changes, a corner-hit counter, pause, and “manifest a corner” to aim the logo at a corner over four seconds. Escape returns to the prior chapter.
- **Hardware:** Working remote navigation, eject, power/standby, optional synthesized button sounds, and a visual-effects toggle.
- **Reading view:** Larger body text, a taller screen, ordinary page scrolling, and no scanlines. Available at the bottom of each content chapter. Reduced-motion system preferences are respected; sound is off by default.

The default layout fits the TV, DVD deck, and remote inside the viewport beneath a slim header. On narrow screens, the remote becomes a horizontal control below the TV. Reading view remains available for expanded content.

There are no external fonts, analytics, accounts, backend services, or runtime dependencies.

## Editing

- `app.js`: content, viewer routing, controls, project data, and the course artifact template.
- `styles.css`: TV cabinet, screen, responsive styles, and reading view.
- `assets/`: optimized local photos and favicon.
- `lib/bounce.js`: reflection math, exercised by `tests/bounce.test.mjs`.
- `docs/`: planning and reflection notes; these are **excluded from the static build**.

### Finishing Artifact 1

Replace the placeholder in `artifactView()` only after the team finishes. Add the real chatbot or shareable deliverable, screenshots, sample conversations, the lab objective, process, tools/model details, my specific contribution, teammate credits, evidence-based value proposition, and references. Remove the placeholder status when its evidence is complete.

Workshop reflections belong in the Brightspace assignment text area according to the supplied course guidelines. They are not a public DVD chapter. See `docs/reflection-notes.md` for a writing scaffold.

## Source notes

Bio and experience were drafted from the user-supplied résumé and the prior portfolio in `/Users/palina/CS/palina`. Local photos come from that prior portfolio. The current résumé takes precedence over older descriptions. Job-seeking status and older project outcome percentages were not carried over automatically.

Project descriptions were checked against the public repository metadata and READMEs on October 25, 2026:

- [Vektor](https://github.com/palinaskakun/vektor-ai): career navigation prototype; keyword analyzer and seeded data, with future server-side AI integration clearly distinguished.
- [Photos Cleaner](https://github.com/palinaskakun/photos-cleaner): Swift photo management project.
- [Adoption experience concept](https://github.com/palinaskakun/humane-society-reimagined): independent redesign; no affiliation is implied.
- [Catch the Banana](https://github.com/palinaskakun/Catch-The-Banana): playful catcher game, originally documented with Python/Pygame.

The assignment examples could not be retrieved through the web-reading tool. The concept was built from the user's brief and attached course requirements.

## Verification

Syntax checks, four animation boundary tests, and the static build are included. Manual browser QA covers the viewer routes, content sections, images, reading mode, physical controls, and screensaver. See `docs/verification.md` for the recorded result.
