'use strict';

(function () {
  var scaleInput = document.querySelector('.scale__control--value');
  var imgPreviewWrapper = document.querySelector('.img-upload__preview');
  var imgPreview = document.querySelector('.img-upload__preview img');
  var slider = document.querySelector('.effect-level');
  var hashtagInput = document.querySelector('.text__hashtags');
  var commentDescription = document.querySelector('.text__description');
  var formUpload = document.querySelector('.img-upload__form');
  var imageEditor = document.querySelector('.img-upload__overlay');

  var validateHashtags = function () {
    var pattern = /^\#[а-яА-ЯёЁa-zA-Z0-9]+$/;
    var hashtagsValue = hashtagInput.value;
    var hashtags = hashtagsValue.split(' ');

    var checkDoubleHashtag = function () {
      var currentHashtag = hashtags[i];
      var isResult;
      for (var j = 0; j < hashtags.length; j++) {
        if (currentHashtag.toLowerCase() === hashtags[j].toLowerCase() && j !== i) {
          isResult = true;
        }
      }
      return isResult;
    };

    for (var i = 0; i < hashtags.length; i++) {
      if (hashtags[i].charAt(0) !== '#') {
        hashtagInput.setCustomValidity('Хэш-тег должен начинается с символа # (решётка)');
      } else if (hashtags[i] === '#') {
        hashtagInput.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
      } else if (!pattern.test(hashtags[i])) {
        hashtagInput.setCustomValidity('Cтрока после решётки должна состоять из букв и чисел');
      } else if (hashtags[i].length > 20) {
        hashtagInput.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку');
      } else if (checkDoubleHashtag()) {
        hashtagInput.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
      } else if (hashtags.length > 5) {
        hashtagInput.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
      } else {
        hashtagInput.setCustomValidity('');
      }
    }
  };

  var resetForm = function () {
    scaleInput.value = '100%';
    imgPreviewWrapper.style.transform = 'scale(1)';
    imgPreview.style.filter = 'none';
    hashtagInput.value = '';
    commentDescription.value = '';
    slider.classList.add('hidden');
  };

  var onFormSubmit = function (evt) {
    window.backend.save(new FormData(formUpload), function () {
      imageEditor.classList.add('hidden');
    });
    resetForm();
    evt.preventDefault();
  };

  hashtagInput.addEventListener('input', function () {
    validateHashtags();
  });

  formUpload.addEventListener('submit', onFormSubmit);


})();


