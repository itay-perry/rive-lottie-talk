const animation = lottie.loadAnimation({
  container: document.getElementById("lottie"), // the DOM element
  renderer: "svg", // or 'canvas', 'html'
  path: "./dinosaur.json", 
});

// 🌼 Controls built to play with it in Vanilla JS 🌼
const speedInput = document.getElementById("speed");
const speedValue = document.getElementById("speedValue");
const frameDisplay = document.getElementById("currentFrame");
const loopBtn = document.getElementById("loopBtn");
const animationProgressBar = document.getElementById("animationProgressBar");
const playPauseBtn = document.getElementById("playPauseBtn");
const totalFrames = document.getElementById("totalFrames");

function resetPlayer() {
  animationProgressBar.value = 0;
  frameDisplay.textContent = 0;
  playPauseBtn.textContent = "▶️";
  animation.goToAndStop(0, true);
}

function init() {
  resetPlayer();

  // loop
  animation.loop = false;
  loopBtn.textContent = "Loop off";

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

animation.addEventListener("enterFrame", function (e) {
  // frameDisplay.textContent = Math.floor(e.currentTime);
  frameDisplay.textContent = e.currentTime.toFixed(1);
});

loopBtn.addEventListener("click", () => {
  animation.loop = !animation.loop;
  loopBtn.textContent = `Loop ${animation.loop ? "🔁" : "off"}`;
});

let isScrubbing = false;

animation.addEventListener("enterFrame", (e) => {
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
  if (animation.isPaused || animation.isStopped) {
    animation.play();
    playPauseBtn.textContent = "⏸️";
  } else {
    animation.pause();
    playPauseBtn.textContent = "▶️";
  }
});
