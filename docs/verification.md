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
