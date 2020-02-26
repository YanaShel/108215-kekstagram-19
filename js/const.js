'use strict';

(function () {
  var Kye = {
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
    Kye: Kye,
    FieldStyle: FieldStyle,
    Effect: Effect,
    Hashtag: Hashtag,
    Scale: Scale,
    QuantityPicture: QuantityPicture,
    Comment: Comment
  };
})();
