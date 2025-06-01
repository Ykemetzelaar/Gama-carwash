const slideContainer = document.querySelector("ul");
const slide = document.querySelector("li");
const prevButton = document.getElementById("slide-arrow-prev");
const nextButton = document.getElementById("slide-arrow-next");

nextButton.addEventListener("click", () => {
  const slideWidth = slide.clientWidth;
  slideContainer.scrollLeft += slideWidth;
});

prevButton.addEventListener("click", () => {
  const slideWidth = slide.clientWidth;
  slideContainer.scrollLeft -= slideWidth;
});
