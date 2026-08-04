# Supraj Gunda Science + Technology Portfolio

A static multi-page portfolio designed for GitHub Pages. The layout uses a persistent top navigation and full-width horizontal editorial bands throughout the site.

## Pages

- `index.html` — About page and interactive Conway’s Game of Life
- `research.html` — Research projects and document embeds
- `industry.html` — Engineering and technical leadership
- `honors.html` — Awards and recognition
- `activities.html` — Leadership and community work
- `cv.html` — Embedded PDF CV

## Add your documents

Place these files inside `assets/docs/`:

- `atkinson-lab-poster.pdf`
- `wingreen-lab-poster.pdf`
- `deutsch-lab-presentation.pdf`
- `puchalla-lab-poster.pdf`
- `Supraj_Gunda_CV.pdf`

The wildlife-trade paper is embedded from its online Springer publication page. Until the remaining PDFs are added, the Research and CV pages show labeled placeholders.

## Add your lab photos

The About page includes a six-image carousel that advances automatically every five seconds and pauses while a visitor hovers over or interacts with it. Replace these files with your own photos while keeping the filenames the same:

- `assets/img/lab-photos/lab-photo-01.jpg`
- `assets/img/lab-photos/lab-photo-02.jpg`
- `assets/img/lab-photos/lab-photo-03.jpg`
- `assets/img/lab-photos/lab-photo-04.jpg`
- `assets/img/lab-photos/lab-photo-05.jpg`
- `assets/img/lab-photos/lab-photo-06.jpg`

Landscape images around a 3:2 aspect ratio work best. You can duplicate or delete a `<figure class="photo-slide">` block in `index.html` to change the number of photos. The previous and next controls wrap continuously from the last photo to the first and vice versa.

## Publish with GitHub Pages

1. Create a new GitHub repository.
2. Upload everything inside this folder to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)` folder.
6. Save.

No build step or server is required.
