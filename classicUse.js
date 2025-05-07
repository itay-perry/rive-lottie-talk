const animation = lottie.loadAnimation({
  container: document.getElementById("lottie"), // the DOM element
  renderer: "svg", // or 'canvas', 'html'
  path: "./LoadingSuccessError.json",
  loop: true,
  autoplay: false,
});

animation.addEventListener("DOMLoaded", () => {
  console.log("Total frames:", animation.totalFrames);
  animation.playSegments(
    [
      [30, 60],
      [91, 138],
    ],
    true
  );
  animation.setSpeed(0.1);
});
