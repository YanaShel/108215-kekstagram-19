'use strict';

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
bigPicture.classList.remove('hidden');

var viewingBigPhoto = function (picture) {
  var pictureImg = bigPicture.querySelector('.big-picture__img img');
  var likesCount = bigPicture.querySelector('.likes-count');
  var commentsCount = bigPicture.querySelector('.comments-count');
  var descriptionPhoto = bigPicture.querySelector('.social__caption');

  pictureImg.src = picture.url;
  likesCount.textContent = picture.likes;
  commentsCount.textContent = picture.comments.length;
  descriptionPhoto.textContent = picture.description;
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
renderComments(pictures[0]);

bigPicture.querySelector('.social__comment-count').classList.add('hidden');
bigPicture.querySelector('.comments-loader').classList.add('hidden');


