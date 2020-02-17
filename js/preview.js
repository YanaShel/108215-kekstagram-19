'use strict';

(function () {
  var filterBlock = document.querySelector('.img-filters');
  var picturesWrapper = document.querySelector('.pictures');
  var bigPicture = document.querySelector('.big-picture');
  var closeBtnBigPicture = bigPicture.querySelector('.big-picture__cancel');
  var commentsBlock = bigPicture.querySelector('.social__comments');
  var bodyTag = document.body;

  var renderComment = function (commentsItem) {
    var comment = commentsBlock.querySelector('.social__comment').cloneNode(true);
    var avatar = comment.querySelector('.social__picture');
    var commentText = comment.querySelector('.social__text');

    avatar.src = commentsItem.avatar;
    avatar.alt = commentsItem.name;
    commentText.textContent = commentsItem.message;

    return comment;
  };

  var renderComments = function (comments) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < comments.length; i++) {
      fragment.appendChild(renderComment(comments[i]));
    }
    commentsBlock.textContent = '';
    commentsBlock.appendChild(fragment);
  };

  var picturesData;
  var loadPictureData = function (data) {
    if (data) {
      filterBlock.classList.remove('img-filters--inactive');
    }
    picturesData = data;
    return picturesData;
  };

  window.backend.load(loadPictureData);

  var viewingBigPhoto = function (picture) {
    var pictureImg = bigPicture.querySelector('.big-picture__img img');
    var likesCount = bigPicture.querySelector('.likes-count');
    var commentsCount = bigPicture.querySelector('.comments-count');
    var descriptionPhoto = bigPicture.querySelector('.social__caption');

    pictureImg.src = picture.url;
    likesCount.textContent = picture.likes;
    commentsCount.textContent = picture.comments.length;
    descriptionPhoto.textContent = picture.description;
    renderComments(picture.comments);
  };

  var onEscapePressPopup = function (evt) {
    if (evt.key === window.utils.ESC_KEY) {
      closePopupPreview();
    }
  };

  var openPopupPreview = function () {
    bigPicture.classList.remove('hidden');
    bodyTag.classList.add('modal-open');
    document.addEventListener('keydown', onEscapePressPopup);
  };

  var closePopupPreview = function () {
    bigPicture.classList.add('hidden');
    bodyTag.classList.remove('modal-open');
    document.removeEventListener('keydown', onEscapePressPopup);
  };

  var showBigPhoto = function (src) {
    for (var i = 0; i < picturesData.length; i++) {
      if (src === picturesData[i].url) {
        openPopupPreview();
        viewingBigPhoto(picturesData[i]);
      }
    }
  };

  var onPictureClick = function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      var srcActivePicture = evt.target.attributes.src.value;
      showBigPhoto(srcActivePicture);
    }
  };

  var onPictureEnterPress = function (evt) {
    if (evt.key === window.utils.ENTER_KEY) {
      var srcActivePicture = evt.target.children[0].attributes.src.value;
      showBigPhoto(srcActivePicture);
    }
  };

  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');

  picturesWrapper.addEventListener('click', onPictureClick, true);
  picturesWrapper.addEventListener('keydown', onPictureEnterPress, true);
  closeBtnBigPicture.addEventListener('click', function () {
    closePopupPreview();
  });

})();

