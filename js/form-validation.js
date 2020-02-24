'use strict';

(function () {

  var bodyTag = document.body;
  var hashtagInput = document.querySelector('.text__hashtags');
  var formUpload = document.querySelector('.img-upload__form');
  var imageEditor = document.querySelector('.img-upload__overlay');
  var mainTag = document.querySelector('main');
  var pattern = /^\#[а-яА-ЯёЁa-zA-Z0-9]+$/;
  var validate = true;

  var markInvalidField = function () {
    if (!validate && hashtagInput.value) {
      hashtagInput.style.backgroundColor = '#F6CECE';
    }
  };

  var markValidField = function () {
    hashtagInput.style.backgroundColor = 'white';
  };

  var validateHashtags = function () {
    var hashtagsValue = hashtagInput.value;
    if (!hashtagsValue) {
      hashtagInput.setCustomValidity('');
      return;
    }

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
      if (!hashtags[i].startsWith('#')) {
        hashtagInput.setCustomValidity('Хэш-тег должен начинатся с символа # (решётка)');
        validate = false;
      } else if (hashtags[i] === '#') {
        hashtagInput.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
        validate = false;
      } else if (!pattern.test(hashtags[i])) {
        hashtagInput.setCustomValidity('Cтрока после решётки должна состоять из букв и чисел');
        validate = false;
      } else if (hashtags[i].length > 20) {
        hashtagInput.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку');
        validate = false;
      } else if (checkDoubleHashtag()) {
        hashtagInput.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
        validate = false;
      } else if (hashtags.length > 5) {
        hashtagInput.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
        validate = false;
      } else {
        hashtagInput.setCustomValidity('');
        validate = true;
      }
    }
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
      if (evt.key === 'Escape') {
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


