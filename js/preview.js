'use strict';

(function () {
  var IMAGE_TAG = 'img';
  var Comment = {
    INITIAL_QUANTITY: 0,
    PORTION: 5
  };

  var bodyTag = document.body;
  var picturesWrapper = bodyTag.querySelector('.pictures');
  var bigPicture = bodyTag.querySelector('.big-picture');
  var fileChooser = bodyTag.querySelector('.img-upload__start input[type=file]');
  var closeBtnBigPicture = bigPicture.querySelector('.big-picture__cancel');
  var commentsBlock = bigPicture.querySelector('.social__comments');
  var loaderButton = bigPicture.querySelector('.comments-loader');
  var commentCount = bigPicture.querySelector('.social__comment-count');
  var picturesData;
  var commentsData;

  var renderComment = function (commentsItem) {
    var comment = commentsBlock.querySelector('.social__comment').cloneNode(true);
    var avatar = comment.querySelector('.social__picture');
    var commentText = comment.querySelector('.social__text');

    avatar.src = commentsItem.avatar;
    avatar.alt = commentsItem.name;
    commentText.textContent = commentsItem.message;

    return comment;
  };

  var showLoaderBtn = function (quantityComments) {
    var counter;
    if (commentsData.length <= quantityComments + Comment.PORTION) {
      counter = commentsData.length;
      loaderButton.classList.add('hidden');
    } else {
      counter = quantityComments + Comment.PORTION;
      loaderButton.classList.remove('hidden');
    }
    return counter;
  };

  var showComments = function (numberCommentsDisplay, counter, isClearComments) {
    var fragment = document.createDocumentFragment();
    for (var i = numberCommentsDisplay; i < counter; i++) {
      fragment.appendChild(renderComment(commentsData[i]));
    }
    if (isClearComments) {
      commentsBlock.textContent = '';
    }
    commentsBlock.appendChild(fragment);
    commentCount.firstChild.textContent = counter + ' из ';
  };

  var renderComments = function (comments) {
    commentsData = comments;
    var numberCommentsDisplay = Comment.INITIAL_QUANTITY;
    var counter = showLoaderBtn(numberCommentsDisplay);
    showComments(numberCommentsDisplay, counter, true);
  };

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

  var showBigPhoto = function (src) {
    picturesData.forEach(function (picture) {
      if (src === picture.url) {
        openPopupPreview();
        viewingBigPhoto(picture);
      }
    });
  };

  var onPictureClick = function (evt) {
    if (evt.target.tagName.toLowerCase() === IMAGE_TAG) {
      var srcActivePicture = evt.target.attributes.src.value;
      showBigPhoto(srcActivePicture);
    }
  };

  var onLoaderButtonClick = function () {
    var numberCommentsDisplay = commentsBlock.children.length;
    var counter = showLoaderBtn(numberCommentsDisplay);
    showComments(numberCommentsDisplay, counter, false);
  };

  var onPictureEnterPress = function (evt) {
    if (evt.key === window.utils.Key.ENTER) {
      var srcActivePicture = evt.target.children[0].attributes.src.value;
      showBigPhoto(srcActivePicture);
    }
  };

  var onEscapePressPopup = function (evt) {
    if (evt.key === window.utils.Key.ESC) {
      closePopupPreview();
    }
  };

  var openPopupPreview = function () {
    bigPicture.classList.remove('hidden');
    bodyTag.classList.add('modal-open');
    document.addEventListener('keydown', onEscapePressPopup);
    loaderButton.addEventListener('click', onLoaderButtonClick);
  };

  var closePopupPreview = function () {
    bigPicture.classList.add('hidden');
    bodyTag.classList.remove('modal-open');
    document.removeEventListener('keydown', onEscapePressPopup);
    loaderButton.removeEventListener('click', onLoaderButtonClick);
    fileChooser.removeEventListener('change', window.uploadPicture.onChangePicture);
  };

  var loadPictureData = function (data) {
    picturesData = data;
  };

  window.backend.load(loadPictureData);

  picturesWrapper.addEventListener('click', onPictureClick, true);
  picturesWrapper.addEventListener('keydown', onPictureEnterPress, true);
  closeBtnBigPicture.addEventListener('click', function () {
    closePopupPreview();
  });

})();

