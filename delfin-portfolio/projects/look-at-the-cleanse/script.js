// Keep the original name and button interactions without submitting the form.
const title = document.getElementById("title");

document.getElementById("student-form").addEventListener("submit", (event) => {
  event.preventDefault();
});

document.getElementById("textbox").addEventListener("input", function () {
  title.textContent = this.value;
  // A brighter green preserves the original interaction while remaining readable on red.
  title.style.color = "#00ff00";
});

document.getElementById("btn1").addEventListener("click", () => {
  title.textContent = "HELLO";
});
