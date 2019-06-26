import getBlobDuration from "get-blob-duration";

interface IExtendedDocument extends Document {
  msExitFullscreen?: () => void;
  mozCancelFullScreen?: () => void;
  webkitExistFullScreen?: () => void;
  msExistFullScreen?: () => void;
}

interface IVideoContainer extends HTMLElement {
  mozRequestFullScreen?: () => void;
  webkitRequestFullScreen?: () => void;
  msRequestFullScreen?: () => void;
}

const videoContainer = document.getElementById("jsVideoPlayer") as HTMLElement;
const videoPlayer = document.querySelector(
  "#jsVideoPlayer video"
) as HTMLVideoElement;
const playBtn = document.getElementById("jsPlayButton") as HTMLSpanElement;
const volumeBtn = document.getElementById("jsVolumeButton") as HTMLSpanElement;
const fullScreenBtn = document.getElementById(
  "jsFullScreen"
) as HTMLSpanElement;
const currentTime = document.getElementById("jsCurrentTime") as HTMLSpanElement;
const totalTime = document.getElementById("jsTotalTime") as HTMLSpanElement;
const volumeRange = document.getElementById("jsVolume") as HTMLInputElement;

const registerView = (): void => {
  const videoId = window.location.href.split("/videos/")[1];
  fetch(`/api/${videoId}/view`, {
    method: "POST"
  });
};

const formatDate = (seconds: any) => {
  const secondsNumber = parseInt(seconds, 10);
  let hours: any = Math.floor(secondsNumber / 3600);
  let minutes: any = Math.floor((secondsNumber - hours * 3600) / 60);
  let totalSeconds: any = secondsNumber - hours * 3600 - minutes * 60;

  if (hours < 10) {
    hours = `0${hours}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (seconds < 10) {
    totalSeconds = `0${totalSeconds}`;
  }
  return `${hours}:${minutes}:${totalSeconds}`;
};

const handlePlayClick = () => {
  if (videoPlayer.paused) {
    videoPlayer.play();
    playBtn.innerHTML = '<i class="fas fa-pause"></i>';
  } else {
    videoPlayer.pause();
    playBtn.innerHTML = '<i class="fas fa-play"></i>';
  }
};

const handleVolumeClick = () => {
  if (videoPlayer.muted) {
    videoPlayer.muted = false;
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
    volumeRange.value = String(videoPlayer.volume);
  } else {
    volumeRange.value = "0";
    videoPlayer.muted = true;
    volumeBtn.innerHTML = '<i class="fas fa-volume-mute"></i>';
  }
};

const existFullScreen = () => {
  const Document = document as IExtendedDocument;

  fullScreenBtn.addEventListener("click", goFullScreen);
  fullScreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
  if (Document.exitFullscreen) {
    Document.exitFullscreen();
  } else if (Document.mozCancelFullScreen) {
    Document.mozCancelFullScreen();
  } else if (Document.webkitExistFullScreen) {
    Document.webkitExistFullScreen();
  } else if (Document.msExistFullScreen) {
    Document.msExistFullScreen();
  }
};

const goFullScreen = () => {
  const VideoContainer = videoContainer as IVideoContainer;

  fullScreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
  fullScreenBtn.removeEventListener("click", goFullScreen);
  fullScreenBtn.addEventListener("click", existFullScreen);
  if (VideoContainer.requestFullscreen) {
    VideoContainer.requestFullscreen();
  } else if (VideoContainer.mozRequestFullScreen) {
    VideoContainer.mozRequestFullScreen();
  } else if (VideoContainer.webkitRequestFullScreen) {
    VideoContainer.webkitRequestFullScreen();
  } else if (VideoContainer.msRequestFullScreen) {
    VideoContainer.msRequestFullScreen();
  }
};

const getCurrentTime = () => {
  currentTime.innerHTML = formatDate(Math.floor(videoPlayer.currentTime));
};

const setTotalTime = async () => {
  try {
    const video = await fetch(videoPlayer.src);
    const blob = await video.blob();
    const duration = await getBlobDuration(blob);
    const totalTimeString = formatDate(duration);
    totalTime.innerHTML = totalTimeString;
    setInterval(getCurrentTime, 1000);
  } catch (error) {
    console.log(error);
  }
};

const handleEnded = () => {
  registerView();
  videoPlayer.currentTime = 0;
  playBtn.innerHTML = '<i class="fas fa-play"></i>';
};

const handleDrag = (event: any): void => {
  const {
    target: { value }
  } = event;
  videoPlayer.volume = value;
  if (value >= 0.6) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-up"></i>';
  } else if (value >= 0.2) {
    volumeBtn.innerHTML = '<i class="fas fa-volume-down"></i>';
  } else {
    volumeBtn.innerHTML = '<i class="fas fa-volume-off"></i>';
  }
};

const init = () => {
  videoPlayer.volume = 0.5;
  playBtn.addEventListener("click", handlePlayClick);
  volumeBtn.addEventListener("click", handleVolumeClick);
  fullScreenBtn.addEventListener("click", goFullScreen);
  videoPlayer.addEventListener("loadedmetadata", setTotalTime);
  videoPlayer.addEventListener("ended", handleEnded);
  volumeRange.addEventListener("input", handleDrag);
};

if (videoContainer) {
  init();
}
