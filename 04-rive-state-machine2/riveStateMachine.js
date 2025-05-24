let movementInput;
const r = new rive.Rive({
  src: "./sun_and_moon.riv",
  canvas: document.getElementById("canvas"),
  autoplay: true,
  stateMachines: "State Machine 1",
  onLoad: () => {
    r.resizeDrawingSurfaceToCanvas();
    movementInput = r.stateMachineInputs("State Machine 1")[0];
  },
});

function updateMovementValue(value) {
  movementInput.value = value;
}

document.addEventListener("DOMContentLoaded", () => {
  const radioInputs = document.querySelectorAll('input[name="dayNight"]');

  radioInputs.forEach(radio => {
    radio.addEventListener("change", e => e.target.checked && updateMovementValue(e.target.value));
  });

  updateMovementValue(document.querySelector('input[name="dayNight"]:checked').value);
});
