'use strict';

(function () {
  var imgPreviewWrapper = document.querySelector('.img-upload__preview');
  var scaleContainer = document.querySelector('.scale');
  var btnSmaller = scaleContainer.querySelector('.scale__control--smaller');
  var btnBigger = scaleContainer.querySelector('.scale__control--bigger');
  var scaleInput = scaleContainer.querySelector('.scale__control--value');

  var zoom = function (evt) {
    var currentScale = scaleInput.value.slice(0, 3);
    currentScale = parseInt(currentScale, 10);
    if (evt.target === btnBigger && currentScale < window.const.Scale.MAX) {
      scaleInput.value = currentScale + window.const.Scale.STEP;
    }
    if (evt.target === btnSmaller && currentScale > window.const.Scale.MIN) {
      scaleInput.value = currentScale - window.const.Scale.STEP;
    }
    imgPreviewWrapper.style.transform = 'scale(' + scaleInput.value / window.const.Scale.MAX + ')';
    if (scaleInput.value.substr(-1) !== '%') {
      scaleInput.value += '%';
    }
  };

  scaleContainer.addEventListener('click', function (evt) {
    zoom(evt);
  }, true);

})();


