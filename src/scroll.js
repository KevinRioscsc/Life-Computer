const canvas = document.querySelector(".canvas");
console.log(canvas);

let isDown = false;
let startX;
let startY;
let scrollLeft;
let scrollTop;

canvas.addEventListener("mousedown", (e) => {
  isDown = true;
  canvas.classList.add("active");
  startX = e.pageX - canvas.offsetLeft;
  startY = e.pageY = canvas.offsetTop;
  scrollLeft = canvas.scrollLeft;
  scrollTop = canvas.scrollTop;
});
canvas.addEventListener("mouseleave", (e) => {
  isDown = false;
  canvas.classList.remove("active");
});
canvas.addEventListener("mouseup", (e) => {
  isDown = false;
  canvas.classList.remove("active");
});
canvas.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - canvas.offsetLeft;
  const y = (e.pageY = canvas.offsetTop);
  const walkX = x - startX;
  const walkY = y - startY;
  canvas.scrollLeft = scrollLeft - walkX;
  canvas.scrollTop = scrollTop - walkY;
});
