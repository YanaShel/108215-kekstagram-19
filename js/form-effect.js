'use strict';

(function () {
  var Effect = {
    DEFAULT: 'none',
    CHROME: 'chrome',
    SEPIA: 'sepia',
    MARVIN: 'marvin',
    PHOBOS: 'phobos',
    HEAT: 'heat'
  };

  var FilterCoefficient = {
    CHROME: 100,
    SEPIA: 100,
    PHOBOS: 0.03,
    HEAT: 0.02
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
    if (evt.target.value === Effect.DEFAULT) {
      imgPreview.style.filter = 'none';
      slider.classList.add('hidden');
    } else {
      slider.classList.remove('hidden');
      currentEffectName = evt.target.value;
      updateEffect(evt.target.value);
    }
  };

  var updateEffect = function (effectName) {
    var EffectValue = {
      CHROME: getEffectPercentLevel() / FilterCoefficient.CHROME,
      SEPIA: getEffectPercentLevel() / FilterCoefficient.SEPIA,
      MARVIN: getEffectPercentLevel(),
      PHOBOS: getEffectPercentLevel() * FilterCoefficient.PHOBOS,
      HEAT: (getEffectPercentLevel() * FilterCoefficient.HEAT) + 1
    };
    switch (effectName) {
      case Effect.CHROME:
        imgPreview.style.filter = 'grayscale(' + EffectValue.CHROME + ')';
        break;
      case Effect.SEPIA:
        imgPreview.style.filter = 'sepia(' + EffectValue.SEPIA + ')';
        break;
      case Effect.MARVIN:
        imgPreview.style.filter = 'invert(' + EffectValue.MARVIN + '%)';
        break;
      case Effect.PHOBOS:
        imgPreview.style.filter = 'blur(' + EffectValue.PHOBOS + 'px)';
        break;
      case Effect.HEAT:
        imgPreview.style.filter = 'brightness(' + EffectValue.HEAT + ')';
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

