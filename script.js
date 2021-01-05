/****************************
 * Links
 *
 * {@link} - https://developer.mozilla.org/en-US/docs/Web/CSS/object-fit
 * {@link} - https://fontawesome.com/icons?d=gallery&q=close&m=free
 * {@link} - https://www.w3schools.com/tags/ref_av_dom.asp
 * {@link} - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator
 * {@link} - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
 * {@link} - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor
 * {@link} - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators
 * {@link} - https://www.w3schools.com/js/js_this.asp
 * {@link} -innerText vs textConntet https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
 *******************************/
const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const progress = document.getElementById('progress');
const progressConatainer = document.getElementById('progress-container');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

//music
const songs = [
    {
        name: 'jacinto-1',
        displayName: 'electic chill machine',
        artist: 'jacinto',
    },
    {
        name: 'jacinto-2',
        displayName: 'seven nation army',
        artist: 'jacinto',
    },
    {
        name: 'jacinto-3',
        displayName: 'goodnight',
        artist: 'jacinto',
    },
    {
        name: 'metric-1',
        displayName: 'front row',
        artist: 'metric',
    },
];

//check if playing
let isPlaying = false;


//play
function playSong() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'pause');
    music.play();
}

//pause
function pauseSong() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'play');
    music.pause();
}


//play or pause event listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

//update dom
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// current song
let songIndex = 0;


//prev song 
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

//next song 
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

//on load - select first song
loadSong(songs[songIndex]);


//update progress bar and time
function updateProgressBar(e) {

    //console.log(e);
    if (isPlaying) {
        //console.log(e);
        const { duration, currentTime } = e.srcElement;
        //console.log(duration, currentTime);

        //update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        //console.log(progressPercent);
        progress.style.width = `${progressPercent}%`;

        //calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        //console.log('minutes', durationMinutes);

        let durationSeconds = Math.floor(duration % 60);
        //console.log('sec', durationSecons);

        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }

        //console.log('sec', durationSecons);
        //durationEl.textContent = `${durationMinutes}:${durationSeconds}`;

        //delay switching duration Element to avoid NaN
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;

        }

        //calculate display for current time
        const currentMinutes = Math.floor(currentTime / 60);
        //console.log('minutes', currentMinutes);

        let currentSeconds = Math.floor(currentTime % 60);
        //console.log('sec', currentSeconds);

        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }
        //console.log('sec', currnetSeconds);
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}


//set progressBar
function setProgressBar(e) {
    //console.log(e);

    const width = this.clientWidth;
    //console.log('width', width);

    const clickX = e.offsetX;
    //console.log('clickX', clickX);

    const { duration } = music;
    //console.log(clickX / width);
    //console.log((clickX / width) * duration);

    music.currentTime = ((clickX / width) * duration);
}


//event listeners 
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressConatainer.addEventListener('click', setProgressBar);
