import throttle from 'lodash.throttle';
// import vimeoPlayer from '@vimeo/player';
import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const player = new vimeoPlayer(iframe);
const PLAYER_KEY_TIME = 'videoplayer-current-time';

function getCurrentTime({ seconds }) {
  localStorage.setItem(PLAYER_KEY_TIME, seconds);
}

player.on('timeupdate', throttle(getCurrentTime, 1000));

player.setCurrentTime(localStorage.getItem(PLAYER_KEY_TIME) || 0);
