LAB PHOTO CAROUSEL

Current image filenames:
- lab-photo-01.jpg
- lab-photo-02.jpg
- lab-photo-03.jpg
- lab-photo-04.jpg
- lab-photo-05.jpg
- lab-photo-06.jpg

Fastest way to replace photos:
Overwrite these files with your own images while keeping the filenames.

Recommended image shape: landscape, about 3:2 (for example 1500 x 1000 px).
The website uses object-fit: cover, so portrait photos work but may be cropped.

To ADD or REMOVE slides:
Edit the “Lab photos and fun” section in index.html and duplicate/delete a full
<figure class="photo-slide" data-carousel-slide> block. The visible slide total is
calculated automatically by assets/js/carousel.js.

The carousel auto-rotates every 5 seconds. Change AUTO_ROTATE_DELAY in
assets/js/carousel.js if you want a different interval.
