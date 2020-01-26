'use strict';

var messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.Как можно было поймать такой неудачный момент ?!'
];

var descriptions = ['В жизни каждого человека есть радостные мгновения', 'Хочу оставить это здесь', 'Мое любимое фото'];

var names = ['Роман', 'Мария', 'Неопознаный енот', 'Кекс', 'Сергей', 'Мурка'];

var srcImgs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];

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

var pictures = createPictures(25);

var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

var similarListPictures = document.querySelector('.pictures');

var renderPicture = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
  return pictureElement;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < pictures.length; i++) {
  fragment.appendChild(renderPicture(pictures[i]));
}

similarListPictures.appendChild(fragment);


