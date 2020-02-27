'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 500;
  var IMAGE_TAG = 'img';

  var Key = {
    ESC: 'Escape',
    ENTER: 'Enter'
  };

  var FieldStyle = {
    VALID: '#ffffff',
    INVALID: '#F6CECE'
  };

  var Effect = {
    DEFAULT: 'none',
    CHROME: 'chrome',
    SEPIA: 'sepia',
    MARVIN: 'marvin',
    PHOBOS: 'phobos',
    HEAT: 'heat'
  };

  var Hashtag = {
    LENGTH_MAX: 20,
    QUANTITY: 5
  };

  var Scale = {
    STEP: 25,
    MIN: 25,
    MAX: 100
  };

  var QuantityPicture = {
    DEFAULT: 25,
    RANDOM: 10
  };

  var Comment = {
    INITIAL_QUANTITY: 0,
    PORTION: 5
  };

  window.const = {
    Key: Key,
    FieldStyle: FieldStyle,
    Effect: Effect,
    Hashtag: Hashtag,
    Scale: Scale,
    QuantityPicture: QuantityPicture,
    Comment: Comment,
    DEBOUNCE_INTERVAL: DEBOUNCE_INTERVAL,
    IMAGE_TAG: IMAGE_TAG
  };
})();
