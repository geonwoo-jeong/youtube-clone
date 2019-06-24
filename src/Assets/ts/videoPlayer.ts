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
const fullScreenBtn: HTMLSpanElement | null = document.getElementById(
  "jsFullScreen"
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

const existFullScreen = () => {
  if (document && fullScreenBtn) {
    document.exitFullscreen();
    fullScreenBtn.addEventListener("click", goFullScreen);
    fullScreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
  }
};

const goFullScreen = () => {
  if (videoContainer && fullScreenBtn) {
    videoContainer.requestFullscreen();
    fullScreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
    fullScreenBtn.removeEventListener("click", goFullScreen);
    fullScreenBtn.addEventListener("click", existFullScreen);
  }
};

const init = () => {
  if (playBtn && volumeBtn && fullScreenBtn) {
    playBtn.addEventListener("click", handlePlayClick);
    volumeBtn.addEventListener("click", handleVolumeClick);
    fullScreenBtn.addEventListener("click", goFullScreen);
  }
};

if (videoContainer) {
  init();
}
