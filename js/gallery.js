'use strict';

(function () {
  var QUANTITY_PICTURES = 25;

  var filterBlock = document.querySelector('.img-filters');
  var similarListPictures = document.querySelector('.pictures');

  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var cleanPictures = function () {
    var pictures = document.querySelectorAll('.picture');
    pictures.forEach(function (picture) {
      similarListPictures.removeChild(picture);
    });
  };

  var removeActiveBtn = function () {
    var filterList = document.querySelectorAll('.img-filters__button');
    filterList.forEach(function (filterBtn) {
      filterBtn.classList.remove('img-filters__button--active');
    });
  };

  var picturesData = [];
  var loadPictureData = function (data) {
    if (data) {
      renderPictures(data);
      filterBlock.classList.remove('img-filters--inactive');
    }
    picturesData = data;
  };

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

  // По умолчанию — фотографии в изначальном порядке с сервера

  var filterDefault = filterBlock.querySelector('#filter-default');
  filterDefault.addEventListener('click', function () {
    cleanPictures();
    renderPictures(picturesData);
    removeActiveBtn();
    filterDefault.classList.add('img-filters__button--active');
  });

  var renderPictures = function (pictures) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < QUANTITY_PICTURES; i++) {
      fragment.appendChild(renderPicture(pictures[i]));
    }
    similarListPictures.appendChild(fragment);
  };

  // Случайные — 10 случайных, не повторяющихся фотографий.

  var filterRandom = filterBlock.querySelector('#filter-random');
  filterRandom.addEventListener('click', function () {
    cleanPictures();
    renderRandomPictures(picturesData);
    removeActiveBtn();
    filterRandom.classList.add('img-filters__button--active');
  });

  var renderRandomPictures = function (pictures) {
    var copyPictures = pictures.slice();
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 10; i++) {
      var pictureIndex = window.utils.getRandomIndex(copyPictures);
      fragment.appendChild(renderPicture(copyPictures[pictureIndex]));
      copyPictures.splice(pictureIndex, 1);
    }
    similarListPictures.appendChild(fragment);
  };

  // Обсуждаемые — фотографии, отсортированные в порядке убывания количества комментариев.

  var renderDiscussedPictures = function (pictures) {
    var copyPictures = pictures.slice();
    copyPictures.sort(function (second, first) {
      return first.comments.length - second.comments.length;
    });
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < QUANTITY_PICTURES; i++) {
      fragment.appendChild(renderPicture(copyPictures[i]));
    }
    similarListPictures.appendChild(fragment);
  };

  var filterDiscussed = filterBlock.querySelector('#filter-discussed');
  filterDiscussed.addEventListener('click', function () {
    cleanPictures();
    renderDiscussedPictures(picturesData);
    removeActiveBtn();
    filterDiscussed.classList.add('img-filters__button--active');
  });

  window.backend.load(loadPictureData);

})();

