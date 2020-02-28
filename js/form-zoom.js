'use strict';

(function () {
  var Scale = {
    STEP: 25,
    MIN: 25,
    MAX: 100
  };

  var imgPreviewWrapper = document.querySelector('.img-upload__preview');
  var scaleContainer = document.querySelector('.scale');
  var btnSmaller = scaleContainer.querySelector('.scale__control--smaller');
  var btnBigger = scaleContainer.querySelector('.scale__control--bigger');
  var scaleInput = scaleContainer.querySelector('.scale__control--value');

  var zoom = function (evt) {
    var currentScale = scaleInput.value.slice(0, 3);
    currentScale = parseInt(currentScale, 10);
    if (evt.target === btnBigger && currentScale < Scale.MAX) {
      scaleInput.value = currentScale + Scale.STEP;
    }
    if (evt.target === btnSmaller && currentScale > Scale.MIN) {
      scaleInput.value = currentScale - Scale.STEP;
    }
    imgPreviewWrapper.style.transform = 'scale(' + scaleInput.value / Scale.MAX + ')';
    if (scaleInput.value.substr(-1) !== '%') {
      scaleInput.value += '%';
    }
  };

  scaleContainer.addEventListener('click', function (evt) {
    zoom(evt);
  }, true);

})();


