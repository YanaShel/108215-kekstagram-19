'use strict';

(function () {

  var bodyTag = document.body;
  var upLoadFileInput = document.querySelector('#upload-file');
  var imageEditor = document.querySelector('.img-upload__overlay');
  var loadPhotoInput = document.querySelector('#upload-file');
  var scaleInput = imageEditor.querySelector('.scale__control--value');
  var closeBtnEditor = imageEditor.querySelector('#upload-cancel');
  var hashtagInput = imageEditor.querySelector('.text__hashtags');
  var commentDescription = imageEditor.querySelector('.text__description');
  var slider = imageEditor.querySelector('.effect-level');
  var imgPreviewWrapper = imageEditor.querySelector('.img-upload__preview');
  var imgPreview = imgPreviewWrapper.querySelector('.img-upload__preview img');

  var resetForm = function () {
    loadPhotoInput.value = '';
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

