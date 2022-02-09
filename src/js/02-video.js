
// <!-- Добавь библиотеку как зависимость проекта через npm.
// Инициализируй плеер в файле скрипта как это описано в секции pre-existing player, но учти что у тебя плеер добавлен как npm пакет, а не через CDN.
// Разбери документацию метода on() и начни отслеживать событие timeupdate - обновление времени воспроизведения.
// Сохраняй время воспроизведения в локальное хранилище.
// Пусть ключом для хранилища будет строка "videoplayer-current-time".
// При перезагрузке страницы воспользуйся методом setCurrentTime() для того чтобы возобновить воспроизведение с сохраненной позиции.
// Добавь в проект бибилотеку lodash.throttle и сделай так, чтобы время воспроизведения обновлялось в хранилище не чаще чем раз в секунду.
//  -->

// const iframe = document.querySelector('iframe');
// const player = new Vimeo.Player(iframe);

// player.on('play', function () {
//   console.log('played the video!');
// });

// player.getVideoTitle().then(function (title) {
//   console.log('title:', title);
// });

import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Vimeo.Player(iframe);

const onPlayTime = function (data) {
  localStorage.setItem('videoplayer-current-time', JSON.stringify(data));
};
console.log(onPlayTime);
player.on('timeupdate', throttle(onPlayTime, 1000)); 
const savedTime = localStorage.getItem('videoplayer-current-time');
const parsedTime = JSON.parse(savedTime);
if (parsedTime.seconds === 571.563) {
    localStorage.removeItem('videoplayer-current-time'); 
  player
    .setCurrentTime(parsedTime.seconds)
    .then(function (seconds) {
      console.log('seconds = the actual time that the player seeked to');
    })
    .catch(function (error) {
      switch (error.name) {
        case 'RangeError':
          console.log('RangeError');
          break;
        default:
          break;
      }
    });
}
