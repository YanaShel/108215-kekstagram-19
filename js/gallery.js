'use strict';

(function () {
  var QuantityPicture = {
    DEFAULT: 25,
    RANDOM: 10
  };

  var filterBlock = document.querySelector('.img-filters');
  var similarListPictures = document.querySelector('.pictures');
  var filterForm = filterBlock.querySelector('.img-filters__form');
  var picturesData;

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

  var renderPictures = function (pictures) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < QuantityPicture.DEFAULT; i++) {
      fragment.appendChild(renderPicture(pictures[i]));
    }
    similarListPictures.appendChild(fragment);
  };

  var renderRandomPictures = function (pictures) {
    var copyPictures = pictures.slice();
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < QuantityPicture.RANDOM; i++) {
      var pictureIndex = window.utils.getRandomIndex(copyPictures);
      fragment.appendChild(renderPicture(copyPictures[pictureIndex]));
      copyPictures.splice(pictureIndex, 1);
    }
    similarListPictures.appendChild(fragment);
  };

  var renderDiscussedPictures = function (pictures) {
    var copyPictures = pictures.slice();
    copyPictures.sort(function (second, first) {
      return first.comments.length - second.comments.length;
    });
    renderPictures(copyPictures);
  };

  var onFilterChange = window.utils.debounce(function (callback) {
    cleanPictures();
    callback(picturesData);
  });

  filterForm.addEventListener('click', function (evt) {
    switch (evt.target.id) {
      case 'filter-random':
        onFilterChange(renderRandomPictures);
        break;
      case 'filter-discussed':
        onFilterChange(renderDiscussedPictures);
        break;
      default:
        onFilterChange(renderPictures);
    }
    removeActiveBtn();
    evt.target.classList.add('img-filters__button--active');
  }, true);

  window.backend.load(loadPictureData);
})();

