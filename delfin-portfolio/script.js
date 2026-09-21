// Theme toggle (remembers choice when the browser allows it)
const root = document.documentElement;
const themeBtn = document.getElementById("themeBtn");

function applyTheme(theme) {
  root.setAttribute("data-theme", theme);
  const light = theme === "light";
  themeBtn.textContent = light ? "Dark Mode" : "Light Mode";
  themeBtn.setAttribute("aria-pressed", String(light));
}

let saved = null;
try { saved = localStorage.getItem("theme"); } catch (e) {}
applyTheme(saved === "light" ? "light" : "dark");

themeBtn.addEventListener("click", () => {
  const next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
  applyTheme(next);
  try { localStorage.setItem("theme", next); } catch (e) {}
});

// Mobile menu
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
menuBtn.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  })
);

// Highlight current section in the nav
const links = [...nav.querySelectorAll("a")];
const sections = links.map((a) => document.querySelector(a.getAttribute("href")));
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        links.forEach((a) =>
          a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id)
        );
      }
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
sections.forEach((s) => s && observer.observe(s));

// Project screenshot viewer
const viewer = document.getElementById("viewer");
const viewerImg = document.getElementById("viewerImg");
const viewerTitle = document.getElementById("viewerTitle");
document.querySelectorAll(".project").forEach((card) =>
  card.addEventListener("click", () => {
    viewerImg.src = card.dataset.img;
    viewerImg.alt = card.dataset.title + " screenshot";
    viewerTitle.textContent = card.dataset.title;
    viewer.showModal();
  })
);
document.getElementById("viewerClose").addEventListener("click", () => viewer.close());
viewer.addEventListener("click", (e) => { if (e.target === viewer) viewer.close(); });

document.getElementById("year").textContent = new Date().getFullYear();
