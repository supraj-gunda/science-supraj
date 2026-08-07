/*
  Direct PDF embed helper.

  Any HTML element with:
    data-document="assets/docs/example.pdf"
    data-label="Accessible description"
  is replaced with an iframe pointing directly at that PDF.

  This intentionally does NOT check the file with fetch/HEAD first. Direct loading works
  both on GitHub Pages and when previewing the site locally with file:// URLs.
*/
const frames = document.querySelectorAll('[data-document]');

frames.forEach((frame) => {
  const path = frame.dataset.document;
  const label = frame.dataset.label || 'PDF document';

  if (!path) return;

  const iframe = document.createElement('iframe');
  iframe.src = `${path}#view=FitH`;
  iframe.title = label;
  iframe.loading = 'lazy';

  frame.replaceChildren(iframe);
});
