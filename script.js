const images = [
  "https://picsum.photos/id/237/200/300",
  "https://picsum.photos/seed/picsum/200/300",
  "https://picsum.photos/200/300?grayscale",
  "https://picsum.photos/200/300/",
  "https://picsum.photos/200/300.jpg"
];

const container = document.getElementById("image-container");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const message = document.getElementById("h");
const result = document.getElementById("para");

let selectedImages = [];
let imageOrder = [];

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function init() {
  selectedImages = [];
  result.textContent = "";
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";
  message.textContent = "Please click on the identical tiles to verify that you are not a robot.";

  // Pick a random image to duplicate
  const duplicateIndex = Math.floor(Math.random() * images.length);

  // Create image objects with class names
  imageOrder = images.map((src, idx) => {
    return { src, className: `img${idx + 1}` };
  });

  // Add the duplicate
  imageOrder.push({ src: images[duplicateIndex], className: `img${duplicateIndex + 1}` });

  // Shuffle images
  shuffleArray(imageOrder);

  // Render images
  container.innerHTML = "";
  imageOrder.forEach((imgObj, index) => {
    const img = document.createElement("img");
    img.src = imgObj.src;
    img.classList.add(imgObj.className);
    img.dataset.index = index;
    img.addEventListener("click", handleClick);
    container.appendChild(img);
  });
}

function handleClick(e) {
  const img = e.target;

  // Prevent selecting same image twice
  if (selectedImages.includes(img)) return;

  img.classList.add("selected");
  selectedImages.push(img);

  if (selectedImages.length === 1) resetBtn.style.display = "inline-block";
  if (selectedImages.length === 2) verifyBtn.style.display = "inline-block";
}

resetBtn.addEventListener("click", () => {
  selectedImages.forEach(img => img.classList.remove("selected"));
  selectedImages = [];
  verifyBtn.style.display = "none";
  resetBtn.style.display = "none";
  result.textContent = "";
});

verifyBtn.addEventListener("click", () => {
  const [first, second] = selectedImages;
  if (first.src === second.src) {
    result.textContent = "You are a human. Congratulations!";
  } else {
    result.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
  }
  verifyBtn.style.display = "none";
});

window.onload = init;
