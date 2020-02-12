'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

  var createNumberArray = function (counter) {
    var arr = [];
    for (var i = 1; i <= counter; i++) {
      arr.push(i);
    }
    return arr;
  };

  var getRandomNumber = function (min, max) {
    return Math.floor((Math.random() * (max - min)) + min);
  };

  var getRandomIndex = function (arr) {
    return Math.floor(Math.random() * arr.length);
  };

  var showErrorMessage = function (errorMessage) {
    var node = document.createElement('div');
    node.classList.add('error');
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var removeErrorMessage = function () {
    var errorMessage = document.querySelector('.error');
    document.body.removeChild(errorMessage);
  };

  window.utils = {
    ESC_KEY: ESC_KEY,
    ENTER_KEY: ENTER_KEY,
    createNumberArray: createNumberArray,
    getRandomNumber: getRandomNumber,
    getRandomIndex: getRandomIndex,
    showErrorMessage: showErrorMessage,
    removeErrorMessage: removeErrorMessage
  };

})();
