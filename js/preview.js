'use strict';

(function () {
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

  var loadPictureData = function (data) {
    for (var i = 0; i < data.length; i++) {
      if (srcImg === data[i].url) {
        var pictureImg = bigPicture.querySelector('.big-picture__img img');
        var likesCount = bigPicture.querySelector('.likes-count');
        var commentsCount = bigPicture.querySelector('.comments-count');
        var descriptionPhoto = bigPicture.querySelector('.social__caption');

        pictureImg.src = data[i].url;
        likesCount.textContent = data[i].likes;
        commentsCount.textContent = data[i].comments.length;
        descriptionPhoto.textContent = data[i].description;
        renderComments(data[i].comments);
        displayBigPicture();
      }
    }
  };

  var onEscapePressPopup = function (evt) {
    if (evt.key === window.utils.ESC_KEY) {
      closePopupPreview();
    }
  };

  var openPopupPreview = function () {
    document.addEventListener('keydown', onEscapePressPopup);
  };

  var displayBigPicture = function () {
    bigPicture.classList.remove('hidden');
    bodyTag.classList.add('modal-open');
  };

  var closePopupPreview = function () {
    bigPicture.classList.add('hidden');
    bodyTag.classList.remove('modal-open');
    document.removeEventListener('keydown', onEscapePressPopup);
  };

  var srcImg;

  var onPictureClick = function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      srcImg = evt.target.attributes.src.value;
      window.backend.load(loadPictureData, window.utils.showErrorMessage);
      openPopupPreview();
    }
  };

  var onPictureEnterPress = function (evt) {
    if (evt.key === window.utils.ENTER_KEY) {
      srcImg = evt.target.children[0].attributes.src.value;
      window.backend.load(loadPictureData, window.utils.showErrorMessage);
      openPopupPreview();
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

