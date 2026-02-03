//DOM selection

//Event listeners

//Conditional logic


let titles = document.querySelectorAll(".title");
console.log(titles);

titles.forEach((title) => {
  title.addEventListener("mouseenter", () => {
    title.style.color = "#61a5aa"; // Using a blue color value
  });
});

titles.forEach((title) => {
  title.addEventListener("mouseleave", () => {
    title.style.color = "black";
  });
});

// Toggle contact info display

const contactBtn = document.getElementById("contactBtn");
const contactInfo = document.getElementById("contactInfo");

contactBtn.addEventListener("click", () => {
  if (contactInfo.style.display === "none") {
    contactInfo.style.display = "block";
    contactBtn.textContent = "Hide Contact Info";
  } else {
    contactInfo.style.display = "none";
    contactBtn.textContent = "Show Contact Info";
  }
});

