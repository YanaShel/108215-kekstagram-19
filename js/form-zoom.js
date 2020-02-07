'use strict';

(function () {
  var SCALE_STEP = 25;
  var SCALE_MIN = 25;
  var SCALE_MAX = 100;

  var scaleContainer = document.querySelector('.scale');
  var btnSmaller = scaleContainer.querySelector('.scale__control--smaller');
  var btnBigger = scaleContainer.querySelector('.scale__control--bigger');
  var scaleInput = scaleContainer.querySelector('.scale__control--value');
  var imgPreviewWrapper = document.querySelector('.img-upload__preview');

  var zoom = function (evt) {
    var currentScale = scaleInput.value.slice(0, 3);
    currentScale = parseInt(currentScale, 10);
    if (evt.target === btnBigger && currentScale < SCALE_MAX) {
      scaleInput.value = currentScale + SCALE_STEP;
    }
    if (evt.target === btnSmaller && currentScale > SCALE_MIN) {
      scaleInput.value = currentScale - SCALE_STEP;
    }
    imgPreviewWrapper.style.transform = 'scale(' + scaleInput.value / 100 + ')';
    if (scaleInput.value.substr(-1) !== '%') {
      scaleInput.value += '%';
    }
  };

  scaleContainer.addEventListener('click', function (evt) {
    zoom(evt);
  });

})();


