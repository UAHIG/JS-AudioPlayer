const player = document.querySelector('.player')
const playBtn = document.querySelector('.play')
const prevBtn = document.querySelector('.prev')
const nextBtn = document.querySelector('.next')
const audio = document.querySelector('.audio')
const progressContainer = document.querySelector('.progress__container')
const progress = document.querySelector('.progress')
const cover = document.querySelector('.cover__img')
const title = document.querySelector('.song')
const imgPausePlay = document.querySelector('.img__src')
const wrapDesigned = document.querySelector('.warpper-designed');
const timeLeft = document.querySelector('.time-left');
const timeRight = document.querySelector('.time-right');
const volumePicture = document.querySelector('.volume-picture');
const volumeSlider = document.querySelector('.slider');
const volumeImg = document.querySelector('.volume-img');

const songs = [
'Alexandrjfk - Catch You (Original Mix)',
'CLUB - LET ME TELL YOU',
'Dymdan - Back To Life',
'Razus - I Could Fly',
'Sleepless - Equalizer'
];

let songIndex = 0;
let volumeMute = false;

//Init 
function loadSong(song) {
  title.innerHTML = song;
  audio.src = `./audio/${song}.mp3`;
  cover.src = `./assets/myImg${songIndex + 1}.png`;
  wrapDesigned.style.backgroundImage = `url(./assets/myImg${songIndex + 1}.png)`;
}
loadSong(songs[songIndex]);

// play
function playSong() {
  player.classList.add('play')
  cover.classList.add('active')
  imgPausePlay.src = './assets/play.png'
  audio.play()
}
//pouse
function pauseSong() {
  player.classList.remove('play')
  cover.classList.remove('active')
  imgPausePlay.src = './assets/pause.png'
  audio.pause()
}

// logic play pouse
playBtn.addEventListener('click', () => {
  const isPlaying = player.classList.contains('play');
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// переключение вперед
function nextSong() {
  songIndex++

  if (songIndex > songs.length - 1) {
    songIndex = 0
  }
  loadSong(songs[songIndex]);
  playSong();
}
nextBtn.addEventListener('click', nextSong);

// переключение назад
function prevSong() {
  songIndex--

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSong(songs[songIndex]);
  playSong();
}
prevBtn.addEventListener('click', prevSong);

// progress bar 
function updateProgress(e) {
 const {duration, currentTime} =  e.srcElement
 const progressPercent = (currentTime / duration) * 100;
 progress.style.width = `${progressPercent}%`
}
audio.addEventListener('timeupdate', updateProgress);

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;
  
  audio.currentTime = (clickX / width) * duration;
}
progressContainer.addEventListener('click', setProgress);

// переключение в конце
audio.addEventListener('ended', nextSong);

// обработка времени в нужный формат
function timeFormatChange(out, input) {
  const minute = Math.floor(input / 60);
  const sec = Math.floor(input % 60);
  if (sec < 10)  {
    out.innerHTML = minute + ':0' + sec;
  } else {
    out.innerHTML = minute + ':' + sec;
  }
}
// ждем загрузки аудио 
audio.addEventListener('canplaythrough', () => {
  const duration = audio.duration;
  timeFormatChange(timeRight, duration);  
});
// установка начала конца времени трека
audio.addEventListener('timeupdate', () => {
  const currentAudioTime = Math.floor(audio.currentTime);
  const duration = audio.duration;
  const resTime = duration - currentAudioTime;
  timeFormatChange(timeLeft, currentAudioTime);
  timeFormatChange(timeRight, resTime);
});

// работа со звуком
function volumeSliderRegulate() {
audio.volume = volumeSlider.value / 100; 
}
volumeSlider.addEventListener('input', volumeSliderRegulate);

// кнопка mute
function toggleMute() {
  if (audio.muted) {
    audio.muted = false;
    volumeImg.src = './assets/soundOn.png' 
  } else {
    audio.muted = true;
    volumeImg.src = './assets/soundOff.png' 
  }
}

volumeImg.addEventListener('click', toggleMute);

// Анимация кнопок
const images = document.querySelectorAll('img');

function toggleScaleAnimation(event) {
  const image = event.target;
  image.classList.toggle('scaledtemp');
}

images.forEach((image) => {
  image.addEventListener('click', toggleScaleAnimation);
});
