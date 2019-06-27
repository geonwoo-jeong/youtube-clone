const recorderContainer = document.getElementById(
  "jsRecordContainer"
) as HTMLDivElement;
const recordBtn = document.getElementById("jsRecordBtn") as HTMLButtonElement;
const videoPreview = document.getElementById(
  "jsVideoPreview"
) as HTMLVideoElement;

let streamObject: MediaStream;
let videoRecorder: MediaRecorder;

const handleVideoData = (event: any): void => {
  const { data: videoFile } = event;
  const link = document.createElement("a");
  link.href = URL.createObjectURL(videoFile);
  link.download = "recorded.webm";
  document.body.appendChild(link);
  link.click();
};

const stopRecording = (): void => {
  videoRecorder.stop();
  recordBtn.removeEventListener("click", stopRecording);
  recordBtn.addEventListener("click", getVideo);
  recordBtn.innerHTML = "Start recording";
};

const startRecording = (): void => {
  videoRecorder = new MediaRecorder(streamObject);
  videoRecorder.start();
  videoRecorder.addEventListener("dataavailable", handleVideoData);
  recordBtn.addEventListener("click", stopRecording);
};

const getVideo = async (): Promise<void> => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: { width: 1280, height: 720 }
    });
    videoPreview.srcObject = stream;
    videoPreview.muted = true;
    videoPreview.play();
    recordBtn.innerHTML = "Stop recording";
    streamObject = stream;
    startRecording();
  } catch (error) {
    recordBtn.innerHTML = "☹️ Can't Record";
  } finally {
    recordBtn.removeEventListener("click", getVideo);
  }
};

const init = (): void => {
  recordBtn.addEventListener("click", getVideo);
};

if (recorderContainer) {
  init();
}
