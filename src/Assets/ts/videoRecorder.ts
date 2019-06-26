const recorderContainer = document.getElementById(
  "jsRecordContainer"
) as HTMLDivElement;
const recordBtn = document.getElementById("jsRecordBtn") as HTMLButtonElement;
const videoPreview = document.getElementById(
  "jsVideoPreview"
) as HTMLVideoElement;

const startRecording = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 1280, height: 720 }
    });
    videoPreview.srcObject = stream;
    videoPreview.muted = true;
    videoPreview.play();
  } catch (error) {
    recordBtn.innerHTML = "Can't Record";
    recordBtn.removeEventListener("click", startRecording);
  }
};

const init = () => {
  recordBtn.addEventListener("click", startRecording);
};

if (recorderContainer) {
  init();
}
