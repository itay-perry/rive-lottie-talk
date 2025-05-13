let movementInput;
const r = new rive.Rive({
  src: "./cute.riv",
  canvas: document.getElementById("canvas"),
  autoplay: true,
  stateMachines: "State Machine 1",
  onLoad: () => {
    // Ensure the drawing surface matches the canvas size and device pixel ratio
    r.resizeDrawingSurfaceToCanvas();
    const inputs = r.stateMachineInputs("State Machine 1");
    movementInput = inputs[0];
    console.log(inputs);
  },
});

// Function to update movement.value based on select input
function updateMovementValue(newValue) {
  movementInput.value = newValue;
  console.log(`Movement value updated to: ${movementInput.value}`);
}

// Add event listener to the select element
document.addEventListener("DOMContentLoaded", () => {
  const selectElement = document.getElementById("numberSelect");
  console.log(selectElement);
  // Update movement.value on change
  selectElement.value = 1;
  selectElement.addEventListener("change", (event) => {
    updateMovementValue(event.target.value);
  });

  // Set initial value on load
  updateMovementValue(selectElement.value);
});
