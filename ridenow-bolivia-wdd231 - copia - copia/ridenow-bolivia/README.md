# RideNow Bolivia — WDD 231 Individual Website Project

An original student project prototype for a local ride-request concept in La Paz and El Alto.

## Main pages
- `index.html`: landing page
- `areas.html`: 18 dynamically rendered service areas from `data/service-areas.json`
- `request.html`: ride request form
- `thankyou.html`: form action page that displays URL Search Params
- `attributions.html`: project credits

## Technologies and rubric features
- Semantic HTML, responsive CSS, mobile navigation and active-page wayfinding
- JavaScript ES Modules
- Fetch API with async/await and try/catch in `js/modules/service-data.js`
- Dynamic area cards with more than four data properties per item
- Array methods (`map`, `filter`, `reduce`, `forEach`)
- Local Storage for saved service areas
- Accessible native `<dialog>` modal
- GET form action and URLSearchParams on `thankyou.html`
- Favicon, page-specific title/description, author and Open Graph metadata

## Run locally
Because the site uses `fetch()` and ES Modules, open it using a local web server, not by double-clicking an HTML file.
From the folder, run one of these:
- VS Code: install/use Live Server and open `index.html`
- Python: `python -m http.server 8000`, then open `http://localhost:8000`

## Before submission
1. Put this folder inside your `wdd231` repository (for example `ridenow/`).
2. Verify the JSON loads on GitHub Pages.
3. Run the BYU-I page audit on each required page.
4. Test Lighthouse mobile accessibility, best practices and SEO, plus CSS Overview contrast.
5. Record a 3–5 minute video showing your face and screen, demonstrate local JSON/fetch, try/catch and ES Modules, upload it publicly, and replace the placeholder video URL in the footer of every page.
6. Proofread the content and verify every page on mobile and desktop.
7. Submit the GitHub Pages URL in Canvas.

## Important
This is a course prototype. It does not dispatch drivers, calculate real fares, transmit requests to a backend, or verify real service coverage. Service area data is illustrative and must be checked before a commercial launch.
