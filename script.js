(function($) {
  const $imageContainer = $('#image-container');
  const $loader = $('#loader');

  let ready = false,              // flag for when all images are loaded
      imagesLoaded = 0,           // number of images that have loaded
      totalImages = 0,            // total number of images
      photosArray = [];           // array to store photos

  // Unsplash API
  let count = 5;
  const apiKey = '0IkSETU44v0o-lncIJYOxt-rdhMhpxdQYTnhLWMGfPY';
  const apiUrl = `https://api.unsplash.com/photos/random/?count=${count}&client_id=${apiKey}`;

  // Get photos from Unsplash API
  async function getPhotos() {
    try {
      const response = await fetch(apiUrl);
      photosArray = await response.json();

      displayPhotos();

    } catch (error) {
      console.log(error)
    }
  }

  // Create elements for links & photosArray, add to page
  function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run function for each object in photosArray
    photosArray.forEach((photo) => {
      // Create <a> to link to unsplash
      const $item = $(`<a href="${photo.links.html}" target="_blank"></a>`);

      // Create <img> for photo
      const $img = $(
        `<img src="${photo.urls.regular}" alt="${photo.alt_description}" title="${photo.alt_description}" />`
      );

      // Event Listener, check when each is finished loading
      $img.on('load', imageLoaded);

      // Put <img> inside <a> then put both inside imageContainer element
      $item.append($img);
      $imageContainer.append($item);
    });
  }

  // Check if all images were loaded
  function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === totalImages) {
      ready = true;
      $loader.hide();
      count = 30;
    }
  }

  // Check to see if scrolling near bottom of pageXOffset, Load More Photos
  window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
      ready = false;
      getPhotos();
    }
  })

  $(document).ready(() => {
    getPhotos();
  });
  
})(jQuery);