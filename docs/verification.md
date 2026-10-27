# Verification

## Automated

- JavaScript syntax checks.
- Four tests: exact edge reversals, boundary containment across frame sizes and velocities, simultaneous corner arrival, and zero-sized screens.
- Static build with local assets; `docs/` and original source PDFs are excluded.

## Browser QA

- Verified phone and desktop responsive layouts; no horizontal page overflow in checked views.
- Checked all three viewer profiles. Dr. Collins highlights coursework; Recruiter highlights projects; Guest highlights the bio. Selection persists on reload.
- Checked all five chapter routes, real project URLs, loaded local images, and corrected portrait aspect ratios.
- Verified the AI Lab remains an explicitly unfinished placeholder with six detail sections.
- Verified reading view switches to larger text and page scrolling, with browser-local preference persistence.
- Tested the copy-email confirmation, power off/on, eject, remote chapter button, and screensaver return.
- Verified an actual corner-hit count after “manifest a corner”; tested logo pause/resume.
- Added an overflow cue for long TV chapters and a reading-view button outside the screen.
- Checked reduced-motion handling and optional audio toggle state. Audible output was not independently assessed.

The preview is local, not an instructor-ready public URL. No hosted deployment or assignment submission was performed.

## October 26 sizing and copy update

- Enlarged the desktop TV, viewer cards, navigation, content, remote, and physical controls.
- Verified default body text at 18px on desktop and 16px on phone; profile names are 25px and 18px respectively.
- Main physical controls use 44px or larger targets.
- Replaced the professor display name with Dr. Collins and removed the extra conversational slogans throughout the interface.
- Checked the five content routes and Dr. Collins’s coursework action. No horizontal page overflow in the final desktop and phone checks; no browser console errors.

## Compact header and charcoal frame

- Consolidated branding, portfolio edition, role, and About link into a 46–50px header.
- Changed the TV cabinet and DVD deck to charcoal gray.
- Switched the TV assembly to a viewport-sized grid; retained the larger content typography and scrollable chapters.
- Verified no page overflow and a fully visible remote at 1309×818, 1163×654, 372×895, and 354×672 browser viewports. The profile chooser fits inside the screen at these sizes.
- On phones, the remote is displayed horizontally below the DVD deck.
- Verified the footer screensaver control and return action after moving the controls into the compact footer.

## October 27 — completed artifact and featured coffee project

- Updated current location to Dearborn, Michigan in the bio, home introduction, and contact section.
- Featured TSIKAVA Coffee first, using its public feature code and existing artwork; retained its prototype and sandbox-checkout status.
- Replaced the AI Lab placeholder with Boredom Buster AI using both supplied PDFs. Artifact sections cover title, introduction, description, objective, process, tools, unique value, audience relevance, evidence, team credits, references, and AI-use disclosure.
- Used the submitted report’s Base44 URL as the primary deliverable; did not carry over the documentation’s inconsistent Chatbase label as an implementation claim.
- Captured the accessible published homepage. Example-conversation claims come from the documentation, page 5; no controlled benchmark or successful live chat test is claimed.
- Original PDF evidence is published in assets/artifacts; private reflection notes remain excluded from the site build.

- Final browser pass confirmed the first project is TSIKAVA, the bio uses Dearborn, all seven artifact sections are present, and all eight team members are credited. No page or TV-content horizontal overflow in the phone check; no browser console errors.
- Both PDF routes return HTTP 200 with application/pdf, and both published files match the original attachments byte for byte.


## Palinasonic branding and remote update — October 27, 2026

- Replaced the header with the full name in the original italic Georgia wordmark style and a separated role label. Removed the asterisk and Home Video copy from the site.
- Reused locally bundled Aeonik regular/bold and Graebenbach Mono from the earlier portfolio; content remains at least 16px. Font assets return the correct font MIME types.
- Used the supplied Cornflower artwork for the featured TSIKAVA card, preserving its full aspect ratio. Added the supplied Vercel link alongside GitHub. The supplied deployment redirects unauthenticated visitors to Vercel login.
- Moved the remote note below the remote with a measured positive gap on desktop and mobile. Added a keyboard-accessible remote power button and synchronized both power controls. Verified standby and recovery through the browser.
- Checked profile and content routes at 320px and 1280px, plus the user's normal preview size. No horizontal page overflow. Syntax checks, all four existing animation tests, stylesheet parsing, and the static build passed.
