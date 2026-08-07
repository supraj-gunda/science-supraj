LOCAL PDF ASSETS

Put PDFs referenced by the portfolio in this folder.

Current filenames used by the site:
- atkinson-lab-poster.pdf
- wingreen-lab-poster.pdf
- deutsch-lab-presentation.pdf
- puchalla-lab-poster.pdf
- Supraj_Gunda_CV.pdf

The Rivera Lab wildlife-trade paper is an external web link in research.html,
so there is no wildlife-trade PDF required here.

HOW EMBEDS WORK
research.html and cv.html contain elements with a data-document path.
assets/js/embed-loader.js converts each one directly into an iframe.

If you rename a PDF, update the matching data-document="assets/docs/..." path
in research.html or cv.html. If a referenced file is missing, the browser cannot
render that iframe, so keep the filename/path exact.
