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

const cvDownload = document.querySelector('[data-cv-download]');
if (cvDownload) {
  const path = cvDownload.getAttribute('href');
  if (path) {
    cvDownload.removeAttribute('aria-disabled');
    cvDownload.removeAttribute('title');
  }
}
