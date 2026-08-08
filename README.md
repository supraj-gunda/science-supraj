# Supraj Gunda Science Portfolio

A static multi-page portfolio designed for GitHub Pages. There is no build step, framework, database, or server: the site is plain HTML, CSS, and JavaScript.

## Quick editing map

| What you want to change | Where to edit |
| --- | --- |
| About/bio text | `index.html` → **ABOUT BIOGRAPHY** comment |
| Game of Life text/modal | `index.html` → **HOME INTERACTIVE** section |
| Game of Life behavior/patterns/speed | `assets/js/life.js` |
| Lab carousel photos | `assets/img/lab-photos/` |
| Lab carousel timing/behavior | `assets/js/carousel.js` |
| Research entries | `research.html` → **RESEARCH PROJECTS — HOW TO ADD ONE** |
| Industry entries | `industry.html` → **INDUSTRY ENTRIES — HOW TO ADD ONE** |
| Honors | `honors.html` → **HONORS — HOW TO ADD ONE** |
| Activities | `activities.html` → **ACTIVITIES — HOW TO ADD ONE** |
| CV PDF | `assets/docs/Supraj_Gunda_CV.pdf` |
| Contact links | Shared footer near the bottom of every `.html` page |
| Site colors/type/layout | `assets/css/styles.css` |
| Favicon | `assets/img/favicon.svg` |
| Mobile nav / reveal animation / Game of Life modal | `assets/js/main.js` |

The HTML files now contain maintenance comments immediately above the sections you are most likely to edit.

## Pages

- `index.html` — About page, Conway’s Game of Life, biography, lab photo carousel
- `research.html` — Research projects, publication link, and PDF poster/presentation embeds
- `industry.html` — Engineering and technical leadership experience
- `honors.html` — Awards and recognition
- `activities.html` — Leadership and community activities
- `cv.html` — Embedded PDF CV only
- `404.html` — GitHub Pages fallback for missing URLs

## Adding a new research project

In `research.html`, find the comment **RESEARCH PROJECTS — HOW TO ADD ONE** and duplicate a complete `<article class="project-band ...">...</article>` block.

Update:

1. `.project-number`
2. `.project-lab` — each `<span>` displays on a separate line
3. The project `<h2>`
4. Bullets and `.project-tags`
5. The project resource on the right

For a local PDF, use:

```html
<div class="media-frame"
     data-document="assets/docs/your-file.pdf"
     data-label="Accessible description"></div>
```

`assets/js/embed-loader.js` converts that placeholder into a PDF iframe. Put the actual file in `assets/docs/`.

For an external paper/site that should open as a link instead of an iframe, copy the `.online-paper-link` pattern used by the Rivera Lab entry.

## Adding a new industry entry

In `industry.html`, duplicate one complete `.experience-band` article.

- Increment the number.
- Put the company in `.experience-company`.
- Put the role in the `<h2>` inside `.experience-role`.
- Put the description in `.experience-copy`.
- Optional external links can go after the `<ul>` using the existing AI Camp link as a model.

## Adding a new honor

In `honors.html`, duplicate a complete `.honor-band` article and update the number, title, issuer, description, and date.

The issuer uses `class="micro-label honor-issuer"`. Do **not** type square brackets around the issuer; `styles.css` adds them automatically.

A fifth placeholder honor is already included and ready to edit.

## Adding a new activity

In `activities.html`, duplicate a complete `.activity-band` article and update the number, role, organization, description, and date.

Keep `class="micro-label activity-org"` on the organization name so it matches the Honors subtitle formatting.

## Research and CV PDFs

Place local PDFs in `assets/docs/`. The current paths referenced by the site are:

- `atkinson-lab-poster.pdf`
- `wingreen-lab-poster.pdf`
- `deutsch-lab-presentation.pdf`
- `puchalla-lab-poster.pdf`
- `Supraj_Gunda_CV.pdf`

The Rivera Lab wildlife-trade paper is an external publisher **link**, not a local PDF embed.

If you rename a PDF, update the matching `data-document` path in the corresponding HTML page.

## Lab photo carousel

The About page currently uses:

- `assets/img/lab-photos/lab-photo-01.jpg`
- `assets/img/lab-photos/lab-photo-02.jpg`
- `assets/img/lab-photos/lab-photo-03.jpg`
- `assets/img/lab-photos/lab-photo-04.jpg`
- `assets/img/lab-photos/lab-photo-05.jpg`
- `assets/img/lab-photos/lab-photo-06.jpg`

To replace a photo, overwrite the file while keeping the filename. To change the number of photos, add/remove `<figure class="photo-slide" data-carousel-slide>` blocks in `index.html`; the counter updates automatically.

The carousel rotates every 5 seconds. Change `AUTO_ROTATE_DELAY` in `assets/js/carousel.js` to adjust this. Previous/Next wrap continuously in both directions.

## Game of Life

The markup and modal text are in `index.html`; simulation behavior is in `assets/js/life.js`.

At the top of `life.js`, comments point to the easiest settings to change:

- random starting density
- animation speed
- grid/cell colors
- preset patterns
- responsive cell size

## Colors and horizontal banners

The main palette is at the top of `assets/css/styles.css` under `:root`. Common reusable banner classes include:

- `band-paper`
- `band-sun`
- `band-lime`
- `band-sky`
- `band-peach`
- `band-lavender`
- `band-mint`
- `band-softblue`
- `band-softgreen`
- `band-softpeach`
- `band-ink`

When adding an entry, reuse one of these classes on its `<article>` to preserve the site’s horizontal-band system.

## Shared navigation and footer

The top navigation and contact footer are repeated in each HTML file because this is a no-build static site. If you change a navigation item or contact link, make the same edit on every page.

On each page, only the active top-nav link should have:

```html
aria-current="page"
```

## Favicon

The browser-tab icon is `assets/img/favicon.svg`, currently a small flask. Every page links to that same file, so replacing the SVG updates the favicon site-wide.

## Publish with GitHub Pages

1. Create/open the GitHub repository for the portfolio.
2. Upload everything **inside this project folder** to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)` folder.
6. Save.

After changing an asset such as the favicon, CSS, or JavaScript, GitHub Pages/browser caching may briefly show the old version. A hard refresh usually fixes this (`Command + Shift + R` on Mac Chrome).
