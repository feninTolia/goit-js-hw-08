import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const currentTimeOfVimeoHandler = ({ seconds }) => {
  localStorage.setItem('videoplayer-current-time', seconds);
};

player.on('timeupdate', throttle(currentTimeOfVimeoHandler, 1000));

const currentTime = localStorage.getItem('videoplayer-current-time');

if (currentTime) {
  player.setCurrentTime(Number(currentTime));
}
