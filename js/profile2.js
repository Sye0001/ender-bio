const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const randomChar = () => chars[Math.floor(Math.random() * (chars.length - 1))],
  randomString = length => Array.from(Array(length)).map(randomChar).join("");
const card = document.querySelector(".card"),
  letters = card.querySelector(".card-letters");
const handleOnMove = e => {
  const rect = card.getBoundingClientRect(),
    x = e.clientX - rect.left,
    y = e.clientY - rect.top;
  letters.style.setProperty("--x", `${x}px`);
  letters.style.setProperty("--y", `${y}px`);
  letters.innerText = randomString(1500);
}
card.onmousemove = e => handleOnMove(e);
card.ontouchmove = e => handleOnMove(e.touches[0]);





const profile = document.querySelector(".profile");
let startX = 0;
profile.addEventListener("mousedown", e => {
  startX = e.clientX;
});
profile.addEventListener("mouseup", e => {
  const endX = e.clientX;
  const diffX = endX - startX;
  if (diffX > 50) {
    // Swipe right, scroll to the very start with animation
    smoothScrollTo(profile, 0, 500);
  } else if (diffX < -50) {
    // Swipe left, scroll to the end with animation
    smoothScrollTo(profile, profile.scrollWidth - profile.clientWidth, 500);
  }
});

function smoothScrollTo(element, to, duration) {
  const start = element.scrollLeft;
  const change = to - start;
  const startTime = performance.now();

  function animateScroll(time) {
    const elapsedTime = time - startTime;
    element.scrollLeft = easeInOut(elapsedTime, start, change, duration);
    if (elapsedTime < duration) {
      requestAnimationFrame(animateScroll);
    }
  }

  function easeInOut(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }
  requestAnimationFrame(animateScroll);
}