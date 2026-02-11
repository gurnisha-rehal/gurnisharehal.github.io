// DATA for the growth bar chart
//Event listeners and DOM manipulation for SVG chart

document.addEventListener("DOMContentLoaded", () => {
const skillsData = [
  { skill: "Strategic Preparation", before: 3, after: 5 },
  { skill: "Exposure to Specs", before: 1, after: 4 },
  { skill: "Focusing Project Goals", before: 2, after: 4 },
  { skill: "Presenting Findings", before: 2, after: 5 },
  { skill: "Confidence in Q&A", before: 2, after: 4 }
];

const levelsData = [
  { value: 1, label: "Beginning" },
  { value: 2, label: "Developing" },
  { value: 3, label: "Meeting" },
  { value: 4, label: "Exceeding" },
  { value: 5, label: "Advanced" }
];

//X-axis labels and bars
const svg = document.getElementById("growthBarChart");

const chartHeight = 300;
const barWidth = 18;
const groupSpacing = 110;
const barSpacing = 6;
const scaleFactor = 45;

skillsData.forEach((item, index) => {
  const groupX = index * groupSpacing + 80;

  // BEFORE bar
  const beforeBar = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  beforeBar.setAttribute("x", groupX);
  beforeBar.setAttribute("y", chartHeight - item.before * scaleFactor);
  beforeBar.setAttribute("width", barWidth);
  beforeBar.setAttribute("height", item.before * scaleFactor);
  beforeBar.setAttribute("fill", "#F4A261");

  // AFTER bar
  const afterBar = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  afterBar.setAttribute("x", groupX + barWidth + barSpacing);
  afterBar.setAttribute("y", chartHeight - item.after * scaleFactor);
  afterBar.setAttribute("width", barWidth);
  afterBar.setAttribute("height", item.after * scaleFactor);
  afterBar.setAttribute("fill", "#2A9D8F");

  svg.appendChild(beforeBar);
  svg.appendChild(afterBar);
});


// Y-axis labels and grid lines
levelsData.forEach(level => {
  const y = chartHeight - level.value * scaleFactor;

  // Label text
  const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  text.setAttribute("x", 60); // left of bars
  text.setAttribute("y", y + 4); // vertical alignment tweak
  text.setAttribute("text-anchor", "end");
  text.setAttribute("font-size", "11");
  text.setAttribute("fill", "#555");
  text.textContent = level.label;

  // Optional grid line
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", 70);
  line.setAttribute("x2", 480);
  line.setAttribute("y1", y);
  line.setAttribute("y2", y);
  line.setAttribute("stroke", "#e0e0e0");
  line.setAttribute("stroke-dasharray", "2,2");

  svg.appendChild(line);
  svg.appendChild(text);
});


  // Setting up labels and legend

skillsData.forEach((item, index) => {
  const label = document.createElementNS("http://www.w3.org/2000/svg", "text");

  label.setAttribute("x", index * groupSpacing + 100);
  label.setAttribute("y", chartHeight + 25);
  label.setAttribute("font-size", "10");
  label.setAttribute("fill", "#333");
  label.setAttribute("text-anchor", "middle");

  label.textContent = item.skill;

  svg.appendChild(label);
});

const legendData = [
  { label: "Before", color: "#F4A261" },
  { label: "After", color: "#2A9D8F" }
];

legendData.forEach((item, i) => {
  const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  rect.setAttribute("x", 500);
  rect.setAttribute("y", 30 + i * 20);
  rect.setAttribute("width", 12);
  rect.setAttribute("height", 12);
  rect.setAttribute("fill", item.color);

  const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
  text.setAttribute("x", 520);
  text.setAttribute("y", 40 + i * 20);
  text.setAttribute("font-size", "12");
  text.textContent = item.label;

  svg.appendChild(rect);
  svg.appendChild(text);
});
});

//Creative Visualization

const creativeSVG = document.getElementById("creativeViz");

// Arc
const arc = document.createElementNS("http://www.w3.org/2000/svg", "path");
arc.setAttribute("d", "M60 120 Q240 20 420 120");
arc.setAttribute("fill", "none");
arc.setAttribute("stroke", "#ffffff");
arc.setAttribute("stroke-width", "2");
creativeSVG.appendChild(arc);

// Flower group
const flowerGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
flowerGroup.setAttribute("transform", "translate(240 70)");

const petals = [
  [0, -8], [8, 0], [0, 8], [-8, 0]
];

petals.forEach(([x, y]) => {
  const petal = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  petal.setAttribute("cx", x);
  petal.setAttribute("cy", y);
  petal.setAttribute("r", 6);
  petal.setAttribute("fill", "#F4A261");
  flowerGroup.appendChild(petal);
});

// Center
const center = document.createElementNS("http://www.w3.org/2000/svg", "circle");
center.setAttribute("cx", 0);
center.setAttribute("cy", 0);
center.setAttribute("r", 4);
center.setAttribute("fill", "#E76F51");
flowerGroup.appendChild(center);

creativeSVG.appendChild(flowerGroup);

// Star
const star = document.createElementNS("http://www.w3.org/2000/svg", "path");
star.setAttribute(
  "d",
  "M 0 -10 L 2 -2 L 10 -2 L 4 2 L 6 10 L 0 5 L -6 10 L -4 2 L -10 -2 L -2 -2 Z"
);
star.setAttribute("fill", "#9B5DE5");
star.setAttribute("transform", "translate(420 120) scale(2)");
creativeSVG.appendChild(star);

//Heart
const heart = document.createElementNS("http://www.w3.org/2000/svg", "path");
heart.setAttribute(
  "d",
  "M 0 0 C -5 -15, -20 -15, -20 0 C -20 15, -15 25, 0 30 C 15 25, 20 15, 20 0 C 20 -15, 5 -15, 0 0 Z"
);
heart.setAttribute("fill", "#E76F51");
heart.setAttribute("transform", "translate(60 110)");
creativeSVG.appendChild(heart);