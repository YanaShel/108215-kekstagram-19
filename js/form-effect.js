'use strict';

(function () {
  var effect = {
    DEFAULT: 'none',
    CHROME: 'chrome',
    SEPIA: 'sepia',
    MARVIN: 'marvin',
    PHOBOS: 'phobos',
    HEAT: 'heat'
  };

  var slider = document.querySelector('.effect-level');
  var imgPreview = document.querySelector('.img-upload__preview img');
  var effectList = document.querySelector('.effects__list');
  var sliderLine = slider.querySelector('.effect-level__line');
  var sliderPin = sliderLine.querySelector('.effect-level__pin');
  var sliderDepthColor = sliderLine.querySelector('.effect-level__depth');
  var effectLevelInput = slider.querySelector('.effect-level__value');
  var currentEffectName;
  slider.classList.add('hidden');

  var getEffectPercentLevel = function () {
    var widthLine = sliderLine.clientWidth;
    var sliderPinLeft = sliderPin.offsetLeft;
    return Math.floor((sliderPinLeft * 100) / widthLine);
  };

  var changeDepthColor = function () {
    var effectLevel = getEffectPercentLevel();
    sliderDepthColor.style.width = effectLevel + '%';
    effectLevelInput.value = effectLevel;
  };

  var onChangeEffect = function (evt) {
    sliderPin.style.left = '100%';
    sliderDepthColor.style.width = '100%';
    if (evt.target.value === effect.DEFAULT) {
      imgPreview.style.filter = 'none';
      slider.classList.add('hidden');
    } else {
      slider.classList.remove('hidden');
      currentEffectName = evt.target.value;
      updateEffect(evt.target.value);
    }
  };

  var updateEffect = function (effectName) {
    switch (effectName) {
      case effect.CHROME:
        imgPreview.style.filter = 'grayscale(' + getEffectPercentLevel() / 100 + ')';
        break;
      case effect.SEPIA:
        imgPreview.style.filter = 'grayscale(' + getEffectPercentLevel() / 100 + ')';
        break;
      case effect.MARVIN:
        imgPreview.style.filter = 'invert(' + getEffectPercentLevel() + '%)';
        break;
      case effect.PHOBOS:
        imgPreview.style.filter = 'blur(' + getEffectPercentLevel() * 0.03 + 'px)';
        break;
      case effect.HEAT:
        imgPreview.style.filter = 'brightness(' + ((getEffectPercentLevel() * 0.02) + 1) + ')';
        break;
      default:
        imgPreview.style.filter = 'none';
    }
  };

  sliderPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX
    };

    var onMouseMove = function (moveEvt) {
      var shift = {
        x: startCoords.x - moveEvt.clientX
      };
      startCoords = {
        x: moveEvt.clientX
      };

      if (sliderPin.offsetLeft - shift.x <= sliderLine.clientWidth && sliderPin.offsetLeft - shift.x >= sliderLine.clientLeft) {
        var effectLevel = sliderPin.offsetLeft - shift.x;
        sliderPin.style.left = effectLevel + 'px';
        updateEffect(currentEffectName);
      }
      changeDepthColor();
    };

    var onMouseUp = function () {
      evt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('moueup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  });
  effectList.addEventListener('click', onChangeEffect, true);

})();

