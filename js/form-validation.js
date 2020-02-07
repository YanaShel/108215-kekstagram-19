'use strict';

(function () {
  var hashtagInput = document.querySelector('.text__hashtags');
  var formUpload = document.querySelector('.img-upload__form');

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

  hashtagInput.addEventListener('input', function () {
    validateHashtags();
  });

  formUpload.addEventListener('submit', function () {
    validateHashtags();
  });
})();

