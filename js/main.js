'use strict';

var messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.Как можно было поймать такой неудачный момент ?!'
];

var descriptions = ['В жизни каждого человека есть радостные мгновения' , 'Хочу оставить это здесь', 'Мое любимое фото'];

var names = ['Роман', 'Мария', 'Неопознаный енот', 'Кекс', 'Сергей', 'Мурка'];

var getRandomNumber = function (min, max) {
  return Math.floor(min + (Math.random() * (max - min)));
};

var getRandomValue = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var createPicture = function () {
  var picture = {};
  picture.url = 'photos/' + getRandomNumber(1, 25) + '.jpg';
  picture.description = getRandomValue(descriptions);
  picture.likes = getRandomNumber(15, 200);
  picture.comments = [
    {
      avatar: 'img/avatar-' + getRandomNumber(1, 6) + '.svg',
      message: getRandomValue(messages),
      name: getRandomValue(names)
    },
    {
      avatar: 'img/avatar-' + getRandomNumber(1, 6) + '.svg',
      message: getRandomValue(messages),
      name: getRandomValue(names)
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

console.log(createPictures(25));


