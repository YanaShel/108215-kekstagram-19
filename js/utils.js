'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;

  var Key = {
    ESC: 'Escape',
    ENTER: 'Enter'
  };

  var FieldStyle = {
    VALID: '#ffffff',
    INVALID: '#F6CECE'
  };

  var getRandomIndex = function (arr) {
    return Math.floor(Math.random() * arr.length);
  };

  var debounce = function (cb) {
    var lastTimeout = null;
    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  window.utils = {
    Key: Key,
    FieldStyle: FieldStyle,
    getRandomIndex: getRandomIndex,
    debounce: debounce
  };

})();
