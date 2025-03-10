<main>
    <div class="slider-container">
      <div class="slider">
          <!-- Image to be displayed -->
          <img id="slider-image" src="" alt="Event Banner">
      </div>
      <!-- Navigation buttons -->
      <button class="swiper-button-prev">Previous</button>
      <button class="swiper-button-next">Next</button>
  </div>
  </main>

  .slider-container {
  position: relative;
  margin-left: 8vw;
  width: 80%;
  max-width: 900px;
  overflow: hidden; /* Hide the images outside the container */
  border: 2px solid #ddd;
  border-radius: 8px;
}

.slider {
  display: flex; /* Align images side by side */
  transition: transform 0.5s ease; /* Smooth transition for sliding */
}

.slider-img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  font-size: 18px;
  cursor: pointer;
  border-radius: 50%;
  z-index: 10;
}

.swiper-button-prev {
  left: 10px;
}

.swiper-button-next {
  right: 10px;
}

button:hover {
  background-color: rgba(0, 0, 0, 0.7);
}



let currentIndex = 0;
let imageArray = [];

async function fetchEventBanners() {
  try {
    // Fetching images from your API
    const response = await fetch("http://localhost:5000/api/events");
    const events = await response.json();

    const bannerContainer = document.getElementById("slider-image");

    if (events.length === 0) {
      bannerContainer.src = "";
      bannerContainer.alt = "No events available.";
      return;
    }

    // Storing the images in an array
    imageArray = events.map(event => "http://localhost:5000" + event.imageUrl);
    displayImage(currentIndex);

  } catch (error) {
    console.error("Error fetching event banners:", error);
  }
}

function displayImage(index) {
  const slider = document.querySelector('.slider');
  slider.innerHTML = ''; // Clear the slider before adding new images

  // Dynamically create image elements and append them to the slider container
  imageArray.forEach((imageSrc, i) => {
    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = `Event Image ${i + 1}`;
    img.classList.add('slider-img');
    slider.appendChild(img);
  });

  // Apply the transform property to slide to the correct image
  slider.style.transform = `translateX(-${(currentIndex * 100)}%)`; // Slide to the correct image
}

function nextImage() {
  currentIndex = (currentIndex + 1) % imageArray.length;
  displayImage(currentIndex);
}

function prevImage() {
  currentIndex = (currentIndex - 1 + imageArray.length) % imageArray.length;
  displayImage(currentIndex);
}

// Page Load hone par function call karo
document.addEventListener("DOMContentLoaded", fetchEventBanners);

// Adding event listeners to the next and previous buttons
document.querySelector(".swiper-button-next").addEventListener("click", nextImage);
document.querySelector(".swiper-button-prev").addEventListener("click", prevImage);

 

  

