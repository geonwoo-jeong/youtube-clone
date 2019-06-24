import getBlobDuration from "get-blob-duration";

interface ExtendedDocument extends Document {
  msExitFullscreen?: () => void;
  mozCancelFullScreen?: () => void;
  webkitExistFullScreen?: () => void;
  msExistFullScreen?: () => void;
}

interface VideoContainer extends HTMLElement {
  mozRequestFullScreen?: () => void;
  webkitRequestFullScreen?: () => void;
  msRequestFullScreen?: () => void;
}

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
const currentTime = document.getElementById("jsCurrentTime");
const totalTime = document.getElementById("jsTotalTime");

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
  const Document = <ExtendedDocument>document;

  if (Document && fullScreenBtn) {
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
  }
};

const goFullScreen = () => {
  const VideoContainer = <VideoContainer>videoContainer;

  if (VideoContainer && fullScreenBtn) {
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
  }
};

const getCurrentTime = () => {
  if (videoPlayer && currentTime) {
    currentTime.innerHTML = formatDate(videoPlayer.currentTime);
  }
};

const setTotalTime = async () => {
  if (videoPlayer && totalTime) {
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
  }
};

const init = () => {
  if (videoPlayer && playBtn && volumeBtn && fullScreenBtn) {
    playBtn.addEventListener("click", handlePlayClick);
    volumeBtn.addEventListener("click", handleVolumeClick);
    fullScreenBtn.addEventListener("click", goFullScreen);
    videoPlayer.addEventListener("loadedmetadata", setTotalTime);
  }
};

if (videoContainer) {
  init();
}
