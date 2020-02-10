'use strict';

(function () {
  var upLoadFileInput = document.querySelector('#upload-file');
  var imageEditor = document.querySelector('.img-upload__overlay');
  var closeBtnEditor = document.querySelector('#upload-cancel');
  var hashtagInput = document.querySelector('.text__hashtags');
  var commentsBlock = document.querySelector('.text__description');
  var bodyTag = document.querySelector('body');

  var onImgEditorEscPress = function (evt) {
    if (evt.key === window.utils.ESC_KEY && evt.target !== hashtagInput && evt.target !== commentsBlock) {
      imageEditor.classList.add('hidden');
    }
  };

  var openImageEditor = function () {
    imageEditor.classList.remove('hidden');
    document.addEventListener('keydown', onImgEditorEscPress);
    bodyTag.classList.add('modal-open');
  };

  var closeImageEditor = function () {
    imageEditor.classList.add('hidden');
    document.removeEventListener('keydown', onImgEditorEscPress);
    bodyTag.classList.remove('modal-open');
  };

  upLoadFileInput.addEventListener('change', function () {
    openImageEditor();
  });

  closeBtnEditor.addEventListener('click', function () {
    closeImageEditor();
  });

})();

