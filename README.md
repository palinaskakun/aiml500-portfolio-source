# Palina Skakun · Palinasonic

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
- **Main menu:** A DVD title screen, a portrait in a DVD case with a turning disc, and chapter-selection links into coursework and independent projects.
- **About me:** Bio, personal value proposition, experience, and tools based on supplied material.
- **Coursework:** Boredom Buster AI (Workshop 1.4): live Base44 prototype, submitted report and team documentation PDFs, a prototype screenshot, process, tools, value proposition, limitations, credits, references, and the team’s AI-use disclosure.
- **Projects:** TSIKAVA Coffee is featured first, followed by Vektor, Photos Cleaner, the independent adoption experience concept, and Catch the Banana. TSIKAVA includes the live Vercel prototype and its source repository.
- **Contact:** Email, LinkedIn, GitHub, and a copy-email button.
- **DVD screensaver:** Real wall reflections, color changes, a corner-hit counter, pause, and “manifest a corner” to aim the logo at a corner over four seconds. Escape returns to the prior chapter.
- **Hardware:** Working remote navigation, animated eject tray, synchronized TV/remote power buttons, CRT line-and-dot shutdown and tube warm-up, optional synthesized button sounds, and a visual-effects toggle.
- **Reading view:** Larger body text, a taller screen, ordinary page scrolling, and no scanlines. Available at the bottom of each content chapter. Visual effects start enabled on each visit, as requested, and can be paused with the MOTION button. Sound is off by default.

The default layout fits the TV, DVD deck, and remote inside the viewport beneath a slim header. On narrow screens, the remote becomes a horizontal control below the TV. Reading view remains available for expanded content.

Aeonik and Graebenbach Mono are bundled locally from the earlier portfolio. There are no external font requests, analytics, accounts, backend services, or runtime dependencies.

## Editing

- `app.js`: content, viewer routing, controls, project data, and the course artifact template.
- `styles.css`: TV cabinet, screen, responsive styles, and reading view.
- `assets/`: local photos, project artwork, prototype evidence, original artifact PDFs, and favicon.
- `lib/bounce.js`: reflection math, exercised by `tests/bounce.test.mjs`.
- `docs/`: planning and reflection notes; these are **excluded from the static build**.

### Artifact 1

`artifactView()` presents the supplied Boredom Buster AI deliverables as shared Team 1 work. The two original PDFs live in `assets/artifacts/` and are copied into `dist/` by the static build. The live prototype is linked at `https://beat-boredom-bot.base44.app/`. The implementation does not invent individual task ownership, model versions, training, or performance results.

Palina will write her own reflection, which will be added to the website following Dr. Collins’s updated instructions. Do not generate a reflection for her. See `docs/reflection-notes.md` for the required topics and author notes; that internal document is excluded from the build.

## Source notes

Bio and experience were drafted from the user-supplied résumé and the prior portfolio in `/Users/palina/CS/palina`. Local photos come from that prior portfolio. The current résumé takes precedence over older descriptions. The user’s October 27 update sets the current location to Dearborn, Michigan. Job-seeking status and older project outcome percentages were not carried over automatically.

Project descriptions were initially checked against public repository metadata and READMEs on October 25, 2026. TSIKAVA’s actual pages, feature code, and asset-license notes were reviewed on October 27, 2026:

- [TSIKAVA Coffee](https://github.com/palinaskakun/tsikava-coffee): Belarusian-inspired coffee-shop prototype with drink customization, accounts, cart, order history, Supabase, and a Stripe sandbox checkout. Its project artwork comes from the existing repository, whose asset notes identify product imagery as generated for the fictional concept.
- [Vektor](https://github.com/palinaskakun/vektor-ai): career navigation prototype; keyword analyzer and seeded data, with future server-side AI integration clearly distinguished.
- [Photos Cleaner](https://github.com/palinaskakun/photos-cleaner): Swift photo management project.
- [Adoption experience concept](https://github.com/palinaskakun/humane-society-reimagined): independent redesign; no affiliation is implied.
- [Catch the Banana](https://github.com/palinaskakun/Catch-The-Banana): playful catcher game, originally documented with Python/Pygame.

The assignment examples could not be retrieved through the web-reading tool. The concept was built from the user's brief and attached course requirements.

## Verification

Syntax checks, four animation boundary tests, and the static build are included. Manual browser QA covers the viewer routes, content sections, images, reading mode, physical controls, and screensaver. See `docs/verification.md` for the recorded result.
