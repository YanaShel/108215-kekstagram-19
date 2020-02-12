'use strict';

(function () {
  var QUANTITY_PICTURES = 25;

  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var similarListPictures = document.querySelector('.pictures');

  var renderPicture = function (picture) {
    var pictureElement = pictureTemplate.cloneNode(true);
    var pictureImg = pictureElement.querySelector('.picture__img');
    var pictureLikes = pictureElement.querySelector('.picture__likes');
    var pictureComments = pictureElement.querySelector('.picture__comments');
    pictureImg.src = picture.url;
    pictureLikes.textContent = picture.likes;
    pictureComments.textContent = picture.comments.length;
    return pictureElement;
  };

  var renderPictures = function (pictures) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < QUANTITY_PICTURES; i++) {
      fragment.appendChild(renderPicture(pictures[i]));
    }
    similarListPictures.appendChild(fragment);
  };

  window.backend.load(renderPictures, window.utils.showErrorMessage);

})();

