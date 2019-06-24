const videoContainer: HTMLElement | null = document.getElementById(
  "jsVideoPlayer"
);
const videoPlayer: HTMLVideoElement | null = document.querySelector(
  "#jsVideoPlayer video"
);
const playBtn: HTMLSpanElement | null = document.getElementById("jsPlayButton");
const volumeBtn: HTMLSpanElement | null = document.getElementById(
  "jsVolumeButton"
);

const handlePlayClick = () => {
  if (videoPlayer && playBtn) {
    if (videoPlayer.paused) {
      videoPlayer.play();
      playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
      videoPlayer.pause();
      playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
  }
};

const handleVolumeClick = () => {
  if (videoPlayer && volumeBtn) {
    if (videoPlayer.muted) {
      videoPlayer.muted = false;
      volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    } else {
      videoPlayer.muted = true;
      volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
    }
  }
};

const init = () => {
  if (playBtn && volumeBtn) {
    playBtn.addEventListener("click", handlePlayClick);
    volumeBtn.addEventListener("click", handleVolumeClick);
  }
};

if (videoContainer) {
  init();
}
