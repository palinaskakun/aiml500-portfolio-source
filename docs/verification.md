# Verification

## Automated

- JavaScript syntax checks.
- Four tests: exact edge reversals, boundary containment across frame sizes and velocities, simultaneous corner arrival, and zero-sized screens.
- Static build with local assets; `docs/` and original source PDFs are excluded.

## Browser QA

- Verified phone and desktop responsive layouts; no horizontal page overflow in checked views.
- Checked all three viewer profiles. Professor highlights coursework; recruiter highlights projects; the curious profile highlights the bio. Selection persists on reload.
- Checked all five chapter routes, real project URLs, loaded local images, and corrected portrait aspect ratios.
- Verified the AI Lab remains an explicitly unfinished placeholder with six detail sections.
- Verified comfortable reading mode switches to larger text and page scrolling, with browser-local preference persistence.
- Tested the copy-email confirmation, power off/on, eject, remote chapter button, and screensaver return.
- Verified an actual corner-hit count after “manifest a corner”; tested logo pause/resume.
- Added an overflow cue for long TV chapters and a reading-view button outside the screen.
- Checked reduced-motion handling and optional audio toggle state. Audible output was not independently assessed.

The preview is local, not an instructor-ready public URL. No hosted deployment or assignment submission was performed.
