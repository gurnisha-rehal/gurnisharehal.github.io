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

