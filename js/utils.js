'use strict';

(function () {
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
      }, window.const.DEBOUNCE_INTERVAL);
    };
  };

  window.utils = {
    getRandomIndex: getRandomIndex,
    debounce: debounce
  };

})();
