'use strict';

var SCALE_STEP = 25;
var SCALE_MIN = 25;
var SCALE_MAX = 100;

var messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.Как можно было поймать такой неудачный момент ?!'
];

var descriptions = ['В жизни каждого человека есть радостные мгновения', 'Хочу оставить это здесь', 'Мое любимое фото', 'Самое удачное фото из 100'];

var names = ['Роман', 'Мария', 'Неопознаный енот', 'Кекс', 'Сергей', 'Мурка'];

var createNumberArray = function (counter) {
  var arr = [];
  for (var i = 1; i <= counter; i++) {
    arr.push(i);
  }
  return arr;
};

var srcImgs = createNumberArray(25);

var getRandomNumber = function (min, max) {
  return Math.floor((Math.random() * (max - min)) + min);
};

var getRandomIndex = function (arr) {
  return Math.floor(Math.random() * arr.length);
};

var createPicture = function () {
  var picture = {};
  var imgIndex = getRandomIndex(srcImgs);
  picture.url = 'photos/' + srcImgs[imgIndex] + '.jpg';
  srcImgs.splice(imgIndex, 1);
  picture.description = descriptions[getRandomIndex(descriptions)];
  picture.likes = getRandomNumber(15, 200);
  picture.comments = [
    {
      avatar: 'img/avatar-' + getRandomNumber(1, 6) + '.svg',
      message: messages[getRandomIndex(messages)],
      name: names[getRandomIndex(names)]
    },
    {
      avatar: 'img/avatar-' + getRandomNumber(1, 6) + '.svg',
      message: messages[getRandomIndex(messages)],
      name: names[getRandomIndex(names)]
    }
  ];
  return picture;
};

var createPictures = function (count) {
  var pictures = [];
  for (var i = 0; i < count; i++) {
    pictures.push(createPicture());
  }
  return pictures;
};

var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

var similarListPictures = document.querySelector('.pictures');

var renderPicture = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);
  var pictureImg = pictureElement.querySelector('.picture__img');
  var pictureLikes = pictureElement.querySelector('.picture__likes');
  var pictureComments = pictureElement.querySelector('.picture__comments');
  pictureImg.src = picture.url;
  pictureLikes.textContent = picture.likes;
  pictureComments.textContent = picture.comments.length;
  return pictureElement;
};

var renderPictures = function (pictures) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < pictures.length; i++) {
    fragment.appendChild(renderPicture(pictures[i]));
  }
  similarListPictures.appendChild(fragment);
};

var pictures = createPictures(25);
renderPictures(pictures);

var bigPicture = document.querySelector('.big-picture');
// bigPicture.classList.remove('hidden');

var viewingBigPhoto = function (picture) {
  var pictureImg = bigPicture.querySelector('.big-picture__img img');
  var likesCount = bigPicture.querySelector('.likes-count');
  var commentsCount = bigPicture.querySelector('.comments-count');
  var descriptionPhoto = bigPicture.querySelector('.social__caption');

  pictureImg.src = picture.url;
  likesCount.textContent = picture.likes;
  commentsCount.textContent = picture.comments.length;
  descriptionPhoto.textContent = picture.description;
  renderComments(picture);
};

var commentsBlock = bigPicture.querySelector('.social__comments');

var renderComment = function (commentsItem) {
  var comment = commentsBlock.querySelector('.social__comment').cloneNode(true);
  var avatar = comment.querySelector('.social__picture');
  var commentText = comment.querySelector('.social__text');

  avatar.src = commentsItem.avatar;
  avatar.alt = commentsItem.name;
  commentText.textContent = commentsItem.message;

  return comment;
};

var renderComments = function (picture) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < picture.comments.length; i++) {
    fragment.appendChild(renderComment(picture.comments[i]));
  }
  commentsBlock.appendChild(fragment);
};

viewingBigPhoto(pictures[0]);

bigPicture.querySelector('.social__comment-count').classList.add('hidden');
bigPicture.querySelector('.comments-loader').classList.add('hidden');

// Показ формы редактирования

var upLoadFileInput = document.querySelector('#upload-file');
var imageEditor = document.querySelector('.img-upload__overlay');
var closeImageEditor = document.querySelector('#upload-cancel');
var bodyTag = document.querySelector('body');

var onImgEditorEscPress = function (evt) {
  if (evt.key === 'Escape' && evt.target !== hashtagInput) {
    imageEditor.classList.add('hidden');
  }
};

upLoadFileInput.addEventListener('change', function () {
  imageEditor.classList.remove('hidden');
  document.addEventListener('keydown', onImgEditorEscPress);
  bodyTag.classList.add('modal-open');
});

closeImageEditor.addEventListener('click', function () {
  imageEditor.classList.add('hidden');
  document.removeEventListener('keydown', onImgEditorEscPress);
  bodyTag.classList.remove('modal-open');
});

// Применение эффекта для изображения

var slider = document.querySelector('.effect-level');
var sliderLine = slider.querySelector('.effect-level__line');
var sliderPin = sliderLine.querySelector('.effect-level__pin');
var sliderDepthColor = sliderLine.querySelector('.effect-level__depth');
var effectLevelInput = slider.querySelector('.effect-level__value');
var imgPreviewWrapper = document.querySelector('.img-upload__preview');
var imgPreview = imgPreviewWrapper.querySelector('img');

slider.classList.add('hidden');

var currentEffectName;

var effectList = document.querySelector('.effects__list');
var onChangeEffect = function (evt) {
  sliderPin.style.left = '100%';
  sliderDepthColor.style.width = '100%';
  if (typeof evt.target.value === 'string') {
    if (evt.target.value === effect.DEFAULT) {
      imgPreview.style.filter = 'none';
      slider.classList.add('hidden');
    } else {
      slider.classList.remove('hidden');
      currentEffectName = evt.target.value;
      updateEffect(evt.target.value);
    }
  }
};
effectList.addEventListener('click', onChangeEffect);

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
    changeEffectImg();
  };

  var onMouseUp = function () {
    evt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('moueup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);
});

var changeEffectImg = function () {
  var effectLevel = getEffectPercentLevel();
  sliderDepthColor.style.width = effectLevel + '%';
  effectLevelInput.value = effectLevel;
};

var getEffectPercentLevel = function () {
  var widthLine = sliderLine.clientWidth;
  var sliderPinLeft = sliderPin.offsetLeft;
  return Math.floor((sliderPinLeft * 100) / widthLine);
};

var effect = {
  DEFAULT: 'none',
  CHROME: 'chrome',
  SEPIA: 'sepia',
  MARVIN: 'marvin',
  PHOBOS: 'phobos',
  HEAT: 'heat'
};

function updateEffect(effectName) {
  if (effectName === effect.CHROME) {
    imgPreview.style.filter = 'grayscale(' + getEffectPercentLevel() / 100 + ')';
  }
  if (effectName === effect.SEPIA) {
    imgPreview.style.filter = 'sepia(' + getEffectPercentLevel() / 100 + ')';
  }
  if (effectName === effect.MARVIN) {
    imgPreview.style.filter = 'invert(' + getEffectPercentLevel() + '%)';
  }
  if (effectName === effect.PHOBOS) {
    imgPreview.style.filter = 'blur(' + getEffectPercentLevel() * 0.03 + 'px)';
  }
  if (effectName === effect.HEAT) {
    imgPreview.style.filter = 'brightness(' + ((getEffectPercentLevel() * 0.02) + 1) + ')';
  }
}

// Валидация хеш-тегов

var hashtagInput = document.querySelector('.text__hashtags');
var formUpload = document.querySelector('.img-upload__form');

var validateHashtags = function () {
  var pattern = /^\#[а-яА-ЯёЁa-zA-Z0-9]+$/;
  var hashtagsValue = hashtagInput.value;
  var hashtags = hashtagsValue.split(' ');

  var checkDoubleHashtag = function () {
    var currentHashtag = hashtags[i];
    var isResult;
    for (var j = 0; j < hashtags.length; j++) {
      if (currentHashtag.toLowerCase() === hashtags[j].toLowerCase() && j !== i) {
        isResult = true;
      }
    }
    return isResult;
  };

  for (var i = 0; i < hashtags.length; i++) {
    if (hashtags[i].charAt(0) !== '#') {
      hashtagInput.setCustomValidity('Хэш-тег должен начинается с символа # (решётка)');
    } else if (hashtags[i] === '#') {
      hashtagInput.setCustomValidity('Хеш-тег не может состоять только из одной решётки');
    } else if (!pattern.test(hashtags[i])) {
      hashtagInput.setCustomValidity('Cтрока после решётки должна состоять из букв и чисел');
    } else if (hashtags[i].length > 20) {
      hashtagInput.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку');
    } else if (checkDoubleHashtag() === true) {
      hashtagInput.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
    } else if (hashtags.length > 5) {
      hashtagInput.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
    } else {
      hashtagInput.setCustomValidity('');
    }
  }
};

hashtagInput.addEventListener('input', function () {
  validateHashtags();
});

formUpload.addEventListener('submit', function () {
  validateHashtags();
});

var scaleContainer = document.querySelector('.scale');
var btnSmaller = scaleContainer.querySelector('.scale__control--smaller');
var btnBigger = scaleContainer.querySelector('.scale__control--bigger');
var scaleInput = scaleContainer.querySelector('.scale__control--value');

scaleContainer.addEventListener('click', function (evt) {
  if (evt.target === btnBigger) {
    zoomIn();
  }
  if (evt.target === btnSmaller) {
    zoomOut();
  }
});

var zoomIn = function () {
  var currentScale = scaleInput.value.slice(0, 3);
  currentScale = parseInt(currentScale, 10);
  if (currentScale < SCALE_MAX) {
    scaleInput.value = currentScale + SCALE_STEP;
    imgPreviewWrapper.style.transform = 'scale(' + scaleInput.value / 100 + ')';
    scaleInput.value += '%';
  }
};

var zoomOut = function () {
  var currentScale = scaleInput.value.slice(0, 3);
  currentScale = parseInt(currentScale, 10);
  if (currentScale > SCALE_MIN) {
    scaleInput.value = currentScale - SCALE_STEP;
    imgPreviewWrapper.style.transform = 'scale(' + scaleInput.value / 100 + ')';
    scaleInput.value += '%';
  }
};
