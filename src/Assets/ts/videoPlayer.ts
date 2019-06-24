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

const setTotalTime = async () => {
  if (videoPlayer) {
    try {
      const video = await fetch(videoPlayer.src);
      const blob = await video.blob();
      const duration = await getBlobDuration(blob);
    } catch (error) {
      console.log(error);
    }
  }
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
