'use strict';

(function () {
  var QUANTITY_PICTURES = 25;

  var messages = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают.Как можно было поймать такой неудачный момент ?!'
  ];

  var descriptions = [
    'В жизни каждого человека есть радостные мгновения',
    'Хочу оставить это здесь', 'Мое любимое фото',
    'Самое удачное фото из 100'
  ];

  var names = [
    'Роман',
    'Мария',
    'Неопознаный енот',
    'Кекс',
    'Сергей',
    'Мурка'];

  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var similarListPictures = document.querySelector('.pictures');

  var srcImgs = window.utils.createNumberArray(QUANTITY_PICTURES);

  var createPicture = function () {
    var picture = {};
    var imgIndex = window.utils.getRandomIndex(srcImgs);
    picture.url = 'photos/' + srcImgs[imgIndex] + '.jpg';
    srcImgs.splice(imgIndex, 1);
    picture.description = descriptions[window.utils.getRandomIndex(descriptions)];
    picture.likes = window.utils.getRandomNumber(15, 200);
    picture.comments = [
      {
        avatar: 'img/avatar-' + window.utils.getRandomNumber(1, 6) + '.svg',
        message: messages[window.utils.getRandomIndex(messages)],
        name: names[window.utils.getRandomIndex(names)]
      },
      {
        avatar: 'img/avatar-' + window.utils.getRandomNumber(1, 6) + '.svg',
        message: messages[window.utils.getRandomIndex(messages)],
        name: names[window.utils.getRandomIndex(names)]
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

  var pictures = createPictures(QUANTITY_PICTURES);
  renderPictures(pictures);

  window.gallery = {
    pictures: pictures
  };

})();

