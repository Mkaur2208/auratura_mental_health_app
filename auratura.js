let colors = [
  "#FFF500", // Happy (Yellow)
  "#ADB6FF", // Sad (Blue)
  "#F78181", // Anger (Red)
  "#C2A5FC", // Fear (Purple)
  "#C1D193", // Disgust (Green)
  "#FDB54F", // Anxiety (Orange)
  "#BEBEBE", // Add your Own Emotion (Gray)
];

let color_names = [
  "Happy",
  "Sad",
  "Anger",
  "Fear",
  "Disgust",
  "Anxiety",
  "Add your Own Emotion",
];

let angle = 0;  // Rotation angle
let wheelRadius = 300;  // Smaller radius of the wheel (smaller pie slices)
let wheelSpeed = 0.3;  // Slower speed of rotation
let isRotating = true;  // Whether the wheel is still rotating
let sectors = colors.length;
let sectorAngle = 360 / sectors;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  textFont('Lato', 14);  // Set font for the labels
}

function draw() {
  background(255);

  translate(width / 2, height / 2); // Move the origin to the center of the canvas

  // If the wheel is rotating, increase the angle
  if (isRotating) {
    angle += wheelSpeed;
  }

  // Draw the color wheel
  drawColorWheel(angle);
}

// Function to draw the color wheel
function drawColorWheel(rotationAngle) {
  for (let i = 0; i < sectors; i++) {
    // Calculate angle for each sector
    let startAngle = i * sectorAngle + rotationAngle;
    let endAngle = (i + 1) * sectorAngle + rotationAngle;

    // Draw each colored sector as a disconnected slice
    fill(colors[i]);
    noStroke(); // Remove stroke to avoid black outlines
    beginShape();
    vertex(0, 0); // Start at the center
    arc(0, 0, wheelRadius * 5, wheelRadius * 5, startAngle, endAngle, PIE);
    endShape(CLOSE);

    // Draw the name of the emotion in the center of each sector
    push();
    rotate(startAngle + sectorAngle / 2); // Rotate to the middle of the sector
    textAlign(CENTER, CENTER);
    fill(46, 46, 46); // Set text color to black
    textStyle(BOLD); // Make text bold
    text(color_names[i], wheelRadius / 1.5, 0); // Place the text within the color sector
    pop();
  }
}

// Function to stop rotation when the user taps or clicks on the wheel
function mousePressed() {
  let mouseAngle = atan2(mouseY - height / 2, mouseX - width / 2) + 180;
  if (mouseAngle < 0) mouseAngle += 360;

  let clickedSector = floor(mouseAngle / sectorAngle);
  let sectorStartAngle = clickedSector * sectorAngle + angle;
  let sectorEndAngle = (clickedSector + 1) * sectorAngle + angle;

  // Check if the click/tap is within the bounds of the clicked sector
  if (mouseAngle >= sectorStartAngle && mouseAngle <= sectorEndAngle) {
    isRotating = false; // Stop the rotation
    console.log("Selected: " + color_names[clickedSector]);
  }
}

