//DOM selection

//Event listeners

//Conditional logic

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

document.querySelector("#flower")
  .addEventListener("mouseenter", () => {
    document.querySelector("#flower").setAttribute("opacity", "0.7");
  });
