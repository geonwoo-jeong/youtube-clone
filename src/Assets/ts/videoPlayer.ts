const videoContainer: HTMLElement | null = document.getElementById(
  "jsVideoPlayer"
);
const videoPlayer: HTMLVideoElement | null = document.querySelector(
  "#jsVideoPlayer video"
);
const playBtn: HTMLSpanElement | null = document.getElementById("jsPlayButton");

const handlePlayClick = () => {
  if (videoPlayer) {
    if (videoPlayer.paused) {
      videoPlayer.play();
    } else {
      videoPlayer.pause();
    }
  }
};

const init = () => {
  if (playBtn) {
    playBtn.addEventListener("click", handlePlayClick);
  }
};

if (videoContainer) {
  init();
}
