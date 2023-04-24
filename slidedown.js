const scrollBtn = document.getElementById("scroll-btn");
const scrollBtn2 = document.getElementById("scroll-btn2");
const scrollPoint = document.getElementById("scroll-point");

scrollBtn.addEventListener("click", () => {
    scrollPoint.scrollIntoView({ behavior: "smooth" });
  });
  scrollBtn2.addEventListener("click", () => {
    scrollPoint.scrollIntoView({ behavior: "smooth" });
  });
