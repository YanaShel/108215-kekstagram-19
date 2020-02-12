'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';
  var StatusCode = {
    OK: 200,
    FOUND: 302,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503
  };
  var TIMEOUT_IN_MS = 10000;

  var serverRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_IN_MS;

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case StatusCode.OK:
          if (document.querySelector('.error')) {
            window.utils.removeErrorMessage();
          }
          onLoad(xhr.response);
          break;
        case StatusCode.FOUND:
          onError('Запрошенный документ временно доступен по другому URI');
          break;
        case StatusCode.BAD_REQUEST:
          onError('Cервер обнаружил в вашем запросе синтаксическую ошибку');
          break;
        case StatusCode.NOT_FOUND:
          onError('Ошибка в написании адреса Web-страницы');
          break;
        case StatusCode.INTERNAL_SERVER_ERROR:
          onError('Ошибка сервера');
          break;
        case StatusCode.SERVICE_UNAVAILABLE:
          onError('Сервер временно не имеет возможности обрабатывать запросы по техническим причинам');
          break;
        default:
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    return xhr;
  };

  var load = function (onLoad, onError) {
    var xhr = serverRequest(onLoad, onError);
    xhr.open('GET', URL);
    xhr.send();
  };

  window.backend = {
    load: load
  };
})();
