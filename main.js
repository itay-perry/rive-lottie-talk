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

function resetPlayer() {
  animationProgressBar.value = 0;
  frameDisplay.textContent = 0;
  updatePlayButton(false);
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

let isScrubbing = false;

animation.addEventListener("enterFrame", (e) => {
  // Update frame display
  frameDisplay.textContent = e.currentTime.toFixed(1);

  if (isScrubbing) return; // don’t overwrite while dragging
  console.log(e.currentTime);
  const progressPercent = Math.round(
    (e.currentTime / animation.totalFrames) * 100
  );
  console.log(progressPercent);
  animationProgressBar.value = progressPercent.toFixed(1);
});

animation.addEventListener("complete", () => {
  resetPlayer();
  console.log("Animation completed");
});

animationProgressBar.addEventListener("input", () => {
  isScrubbing = true;
  const percent = parseFloat(animationProgressBar.value) / 100;
  const targetFrame = percent * animation.totalFrames;
  animation.goToAndStop(targetFrame, true);
});

animationProgressBar.addEventListener("change", () => {
  isScrubbing = false;
});

animation.addEventListener("DOMLoaded", () => {
  console.log("Total frames:", animation.totalFrames);
  totalFrames.textContent = animation.totalFrames;
});

playPauseBtn.addEventListener("click", () => {
  const isPausedOrStopped = animation.isPaused || animation.isStopped;
  if (isPausedOrStopped) {
    animation.play();
  } else {
    animation.pause();
  }
  updatePlayButton(isPausedOrStopped);
});
