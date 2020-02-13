'use strict';

(function () {
  var scaleInput = document.querySelector('.scale__control--value');
  var imgPreviewWrapper = document.querySelector('.img-upload__preview');
  var imgPreview = document.querySelector('.img-upload__preview img');
  var slider = document.querySelector('.effect-level');
  var upLoadFileInput = document.querySelector('#upload-file');
  var imageEditor = document.querySelector('.img-upload__overlay');
  var closeBtnEditor = document.querySelector('#upload-cancel');
  var hashtagInput = document.querySelector('.text__hashtags');
  var commentDescription = document.querySelector('.text__description');
  var bodyTag = document.body;

  var resetForm = function () {
    scaleInput.value = '100%';
    imgPreviewWrapper.style.transform = 'scale(1)';
    imgPreview.style.filter = 'none';
    hashtagInput.value = '';
    commentDescription.value = '';
    slider.classList.add('hidden');
  };

  var onImgEditorEscPress = function (evt) {
    if (evt.key === window.utils.ESC_KEY && evt.target !== hashtagInput && evt.target !== commentDescription) {
      imageEditor.classList.add('hidden');
      resetForm();
    }
  };

  var openImageEditor = function () {
    imageEditor.classList.remove('hidden');
    document.addEventListener('keydown', onImgEditorEscPress);
    bodyTag.classList.add('modal-open');
  };

  var closeImageEditor = function () {
    imageEditor.classList.add('hidden');
    resetForm();
    document.removeEventListener('keydown', onImgEditorEscPress);
    bodyTag.classList.remove('modal-open');
  };

  upLoadFileInput.addEventListener('change', function () {
    openImageEditor();
  });

  closeBtnEditor.addEventListener('click', function () {
    closeImageEditor();
  });

  window.form = {
    resetForm: resetForm
  };

})();

