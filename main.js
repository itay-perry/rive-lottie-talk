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

const someConstants = {
  playIcon: "▶️",
  pauseIcon: "⏸️",
  loopOnText: "on",
  loopOffText: "off",
};

function updatePlayButton(isPlaying) {
  playPauseBtn.textContent = isPlaying
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
  updatePlayButton(false);
  animation.goToAndStop(0, true);
}

function init() {
  animationProgressBar.value = 0;
  frameDisplay.textContent = 0;
  updatePlayButton(false);

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
  // if (isScrubbing) return;
  // Always show actual frame number
  // debugger;
  frameDisplay.textContent = Number(e.currentTime).toFixed(1);
  // Always update progress bar based on current frame
  animationProgressBar.value = Number(e.currentTime);
});

animation.addEventListener("complete", () => {
  resetPlayer();
  console.log("Animation completed");
});

animationProgressBar.addEventListener("input", () => {
  const isPausedOrStopped = animation.isPaused || animation.isStopped;

  isScrubbing = true;
  if (isPausedOrStopped) {
    animation.goToAndStop(animationProgressBar.value, true);
    // animation.goToAndStop triggers complete which is bad
    // do nothing?
  } else {
    animation.goToAndPlay(animationProgressBar.value, true);
  }
});

animationProgressBar.addEventListener("change", () => {
  isScrubbing = false;
});

animation.addEventListener("DOMLoaded", () => {
  console.log("Total frames:", animation.totalFrames);
  totalFrames.textContent = animation.totalFrames;

  // Set the range input to cover all frames
  animationProgressBar.min = 0;
  animationProgressBar.max = animation.totalFrames;
  animationProgressBar.value = 0;
});

playPauseBtn.addEventListener("click", () => {
  const isPausedOrStopped = animation.isPaused || animation.isStopped;
  if (isPausedOrStopped) {
    // animation.play();
    animation.goToAndPlay(animationProgressBar.value, true);
  } else {
    // animation.pause();
    animation.goToAndStop(animationProgressBar.value, true);
  }
  updatePlayButton(isPausedOrStopped);
});

playSegmentBtn.addEventListener("click", () => {
  const start = parseInt(startFrameInput.value);
  const end = parseInt(endFrameInput.value);

  animation.playSegments([start, end], true);

  updatePlayButton(true);
});
