'use strict';

(function () {
  var bodyTag = document.body;
  var mainTag = bodyTag.querySelector('main');
  var formUpload = bodyTag.querySelector('.img-upload__form');
  var hashtagInput = formUpload.querySelector('.text__hashtags');
  var imageEditor = formUpload.querySelector('.img-upload__overlay');
  var pattern = /^\#[а-яА-ЯёЁa-zA-Z0-9]+$/;
  var validate = true;

  var markInvalidField = function () {
    if (!validate && hashtagInput.value) {
      hashtagInput.style.backgroundColor = window.const.FieldStyle.INVALID;
    }
  };

  var markValidField = function () {
    hashtagInput.style.backgroundColor = window.const.FieldStyle.VALID;
  };

  var validateHashtags = function () {
    var hashtagsValue = hashtagInput.value;
    if (!hashtagsValue) {
      hashtagInput.setCustomValidity('');
      return;
    }

    var hashtags = hashtagsValue.split(' ');

    var checkDoubleHashtag = function (currentHashtag, currentIndex) {
      var isResult;
      hashtags.forEach(function (doubleHashtag, doubleIndex) {
        if (currentHashtag.toLowerCase() === doubleHashtag.toLowerCase() && currentIndex !== doubleIndex) {
          isResult = true;
        }
      });
      return isResult;
    };

    hashtags.forEach(function (hashtag, index) {
      if (!hashtag.startsWith('#')) {
        hashtagInput.setCustomValidity('Хэш-тег должен начинатся с символа # (решётка)');
        validate = false;
      } else if (hashtag === '#') {
        hashtagInput.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
        validate = false;
      } else if (!pattern.test(hashtag)) {
        hashtagInput.setCustomValidity('Cтрока после решётки должна состоять из букв и чисел');
        validate = false;
      } else if (hashtag.length > window.const.Hashtag.LENGTH_MAX) {
        hashtagInput.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку');
        validate = false;
      } else if (checkDoubleHashtag(hashtag, index)) {
        hashtagInput.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
        validate = false;
      } else if (hashtags.length > window.const.Hashtag.QUANTITY) {
        hashtagInput.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
        validate = false;
      } else {
        hashtagInput.setCustomValidity('');
        validate = true;
      }
    });
  };

  var onFormSubmit = function (evt) {
    window.backend.save(new FormData(formUpload), showSuccessMessage, showErrorMessage);
    evt.preventDefault();
  };

  var removeMessage = function () {
    var successMessage = mainTag.querySelector('.success');
    var errorMessage = mainTag.querySelector('.error');
    if (successMessage) {
      mainTag.removeChild(successMessage);
    }
    if (errorMessage) {
      mainTag.removeChild(errorMessage);
    }
  };

  var addMessage = function (template) {
    var messageElement = template.cloneNode(true);
    mainTag.appendChild(messageElement);
    document.addEventListener('click', removeMessage);
    document.addEventListener('keydown', function (evt) {
      if (evt.key === window.Key.ESC) {
        removeMessage();
      }
    });
    bodyTag.classList.remove('modal-open');
    window.form.resetForm();
  };

  var showErrorMessage = function () {
    imageEditor.classList.add('hidden');
    var errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
    addMessage(errorMessageTemplate);
  };

  var showSuccessMessage = function () {
    imageEditor.classList.add('hidden');
    var successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
    addMessage(successMessageTemplate);
  };

  hashtagInput.addEventListener('input', function () {
    validateHashtags();
  });
  hashtagInput.addEventListener('blur', function () {
    markInvalidField();
  });
  hashtagInput.addEventListener('keydown', function () {
    markValidField();
  });
  formUpload.addEventListener('submit', onFormSubmit);
  document.removeEventListener('click', function () {
    removeMessage();
  });
})();


