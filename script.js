const playButton = document.getElementById("play");
const forwardButton = document.getElementById("forward");
const backButton = document.getElementById("backward");
const volume = document.getElementById("volume");
const audio = document.getElementById("audio");
const currentTime = document.getElementById("current-time");
const totalTime = document.getElementById("total-time");
const render = document.getElementById("render");
const progressBar = document.getElementById("progress");
const songTitle = document.getElementById("title");
const songArtist = document.getElementById("singer");
let currentSong = 0;

const playlist = [
  {
    title: "Din Pareshaan Hai",
    artist: "Sajjad Ali",
  },
  {
    title: "Aabaad Barbaad [Slowed+Reverb]",
    artist: "Arijit Singh",
  },
  {
    title: "Kinna Sona [Slowed+Reverb]",
    artist: "Arijit Singh",
  },
];

function playAudio() {
  playButton.classList.replace("fa-play", "fa-pause");
  audio.play();
}

function pauseAudio() {
  playButton.classList.replace("fa-pause", "fa-play");
  audio.pause();
}

function loadSong() {
  audio.src = `Music/${playlist[currentSong].title}.mp3`;
  if (playlist[currentSong].title.length > 22) {
    songTitle.style.marginTop = "-31px";
  } else {
    songTitle.style.marginTop = "0px";
  }
  songTitle.innerHTML = playlist[currentSong].title;
  songArtist.innerHTML = playlist[currentSong].artist;
}

function loadNextSong() {
  if (currentSong == playlist.length) {
    currentSong = 0;
  }
  currentSong = (currentSong + 1) % playlist.length;
  loadSong();
  playAudio();
}

function loadPreviousSong() {
  if (currentSong < 0) {
    currentSong = playlist.length - 1;
  }
  currentSong = (currentSong - 1) % playlist.length;
  loadSong();
  playAudio();
}

function calculateTime(option) {
  const currentTimeInSeconds = audio.currentTime;
  const totalTimeInSeconds = audio.duration;
  if (option === "current") {
    const minutes = Math.floor(currentTimeInSeconds / 60);
    let seconds = Math.floor(currentTimeInSeconds % 60);
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return `${minutes}:${seconds}`;
  } else if (option === "total") {
    const minutes = Math.floor(totalTimeInSeconds / 60);
    let seconds = Math.floor(totalTimeInSeconds % 60);
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    return `${minutes}:${seconds}`;
  }
}

function updateProgress() {
  progressBar.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
  currentTime.innerHTML = `${calculateTime("current")}`;
  if (audio.duration) {
    totalTime.textContent = calculateTime("total");
  }
  if (audio.currentTime >= audio.duration) {
    loadNextSong();
  }
}

// Event listeners
playButton.addEventListener("click", () => {
  audio.paused ? playAudio() : pauseAudio();
});

audio.addEventListener("timeupdate", updateProgress);

render.addEventListener("click", (event) => {
  let skippedProgress =
    ((event.screenX - render.offsetLeft) / render.offsetWidth) * 100;
  audio.currentTime = (skippedProgress * audio.duration) / 100;
  progressBar.style.width = `${skippedProgress}%`;
});

forwardButton.addEventListener("click", loadNextSong);
backButton.addEventListener("click", loadPreviousSong);

volume.addEventListener("click", () => {
  if (audio.volume == 1) {
    audio.volume = 0;
    volume.classList.replace("fa-volume-up", "fa-volume-mute");
  } else if (audio.volume == 0) {
    audio.volume = 0.33;
    volume.classList.replace("fa-volume-mute", "fa-volume-off");
  } else if (audio.volume == 0.33) {
    audio.volume = 0.66;
    volume.classList.replace("fa-volume-off", "fa-volume-down");
  } else if (audio.volume == 0.66) {
    audio.volume = 1;
    volume.classList.replace("fa-volume-down", "fa-volume-up");
  }
});

// On load
loadSong();
