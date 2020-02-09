'use strict';

(function () {
  var bigPicture = document.querySelector('.big-picture');
  var commentsBlock = bigPicture.querySelector('.social__comments');

  var renderComment = function (commentsItem) {
    var comment = commentsBlock.querySelector('.social__comment').cloneNode(true);
    var avatar = comment.querySelector('.social__picture');
    var commentText = comment.querySelector('.social__text');

    avatar.src = commentsItem.avatar;
    avatar.alt = commentsItem.name;
    commentText.textContent = commentsItem.message;

    return comment;
  };

  var renderComments = function (picture) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < picture.comments.length; i++) {
      fragment.appendChild(renderComment(picture.comments[i]));
    }
    commentsBlock.appendChild(fragment);
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
    renderComments(picture);
  };

  viewingBigPhoto(window.gallery.pictures[0]);

  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');

})();

