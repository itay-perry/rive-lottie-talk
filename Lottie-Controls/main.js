const animation = lottie.loadAnimation({
  container: document.getElementById("lottie"), // the DOM element
  renderer: "svg", // or 'canvas', 'html'
  path: "./dinosaur.json",
});

// 🌼 Controls built to play with lottie-web in Vanilla JS 🌼
const speedInput = document.getElementById("speed");
const speedValue = document.getElementById("speedValue");
const frameDisplay = document.getElementById("currentFrame");
const loopBtn = document.getElementById("loopBtn");
const loopBtnText = document.getElementById("loopBtnText");
const animationProgressBar = document.getElementById("animationProgressBar");
const playPauseBtn = document.getElementById("playPauseBtn");
const totalFrames = document.getElementById("totalFrames");
const startFrameInput = document.getElementById("startFrame");
const endFrameInput = document.getElementById("endFrame");
const playSegmentBtn = document.getElementById("playSegmentBtn");

let currentSegment = null;
const someConstants = {
  playIcon: "▶️",
  pauseIcon: "⏸️",
  loopOnText: "on",
  loopOffText: "off",
};

function updatePlayButton(button, isPlaying) {
  button.textContent = isPlaying
    ? someConstants.pauseIcon
    : someConstants.playIcon;
}

function updateLoopButton(isLooping) {
  loopBtnText.textContent = isLooping
    ? someConstants.loopOnText
    : someConstants.loopOffText;
}

// seems problematic? requires checking 👾
function resetPlayer() {
  animationProgressBar.value = 0;
  frameDisplay.textContent = 0;
  updatePlayButton(playPauseBtn, false);
  updatePlayButton(playSegmentBtn, false);
  animation.goToAndStop(0, true);
}

function init() {
  resetPlayer();

  // autoplay
  animation.autoplay = false;
  // loop
  animation.loop = false;
  updateLoopButton(false);

  // speed
  const initialSpeed = 0.5;
  animation.setSpeed(initialSpeed);
  speedValue.textContent = initialSpeed;
}

init();

speedInput.addEventListener("input", () => {
  const speed = parseFloat(speedInput.value);
  animation.setSpeed(speed);
  speedValue.textContent = speed.toFixed(1);
});

loopBtn.addEventListener("click", () => {
  animation.loop = !animation.loop;
  updateLoopButton(animation.loop);
});

// let isScrubbing = false;

animation.addEventListener("enterFrame", (e) => {
  let currentFrame = Number(e.currentTime);

  // If playing a segment, offset the frame number
  if (currentSegment) {
    currentFrame += currentSegment[0];
  }

  frameDisplay.textContent = currentFrame.toFixed(1);
  animationProgressBar.value = currentFrame;
});

animation.addEventListener("complete", () => {
  resetPlayer();
  console.log("Animation completed");
});

animationProgressBar.addEventListener("input", () => {
  const isPausedOrStopped = animation.isPaused || animation.isStopped;

  isScrubbing = true;
  if (isPausedOrStopped) {
    // animation.goToAndPlay(animationProgressBar.value, true);
    animation.goToAndStop(Number(animationProgressBar.value), true);
  } else {
    animation.goToAndPlay(Number(animationProgressBar.value), true);
  }
});

animationProgressBar.addEventListener("change", () => {
  isScrubbing = false;
});

animation.addEventListener("DOMLoaded", () => {
  console.log("Total frames:", animation.totalFrames);
  totalFrames.textContent = animation.totalFrames;

  animationProgressBar.min = 0;
  animationProgressBar.max = animation.totalFrames - 1;
  animationProgressBar.value = 0;
});

playPauseBtn.addEventListener("click", () => {
  currentSegment = null;
  animation.resetSegments();
  const isPausedOrStopped = animation.isPaused || animation.isStopped;
  if (isPausedOrStopped) {
    animation.goToAndPlay(Number(animationProgressBar.value), true);
  } else {
    animation.goToAndStop(Number(animationProgressBar.value), true);
  }
  updatePlayButton(playPauseBtn, isPausedOrStopped);
});

playSegmentBtn.addEventListener("click", () => {
  const start = parseInt(startFrameInput.value);
  const end = parseInt(endFrameInput.value);

  currentSegment = [start, end];
  // Forcing true on .playSegments restricts future playing - GitHub #101
  animation.playSegments([start, end], true);
  updatePlayButton(playSegmentBtn, true);
});
