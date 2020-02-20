'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var fileChooser = document.querySelector('.img-upload__start input[type=file]');
  var preview = document.querySelector('.img-upload__preview img');

  var onChangePicture = function (evt) {
    var file = evt.target.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        preview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  };

  fileChooser.addEventListener('change', onChangePicture);

  window.uploadPicture = {
    onChangePicture: onChangePicture
  };
})();
