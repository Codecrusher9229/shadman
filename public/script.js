// Set the target date and time for the countdown
const targetDate = new Date("March 23, 2025 15:00:00").getTime();

// Update the countdown every second
const countdownInterval = setInterval(() => {
  // Get the current date and time
  const now = new Date().getTime();

  // Calculate the time difference between the current date/time and the target date/time
  const timeDifference = targetDate - now;

  // Calculate days, hours, minutes, and seconds
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  // Display the calculated time in the HTML elements
  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;

  // Check if the countdown has expired
  if (timeDifference < 0) {
    clearInterval(countdownInterval);
    document.getElementById("timer").innerHTML = "Countdown expired";
  }
}, 1000);


//slider js

// let currentIndex = 0;
// let imageArray = [];

async function fetchEventBanners() {
  try {
    // Fetching images from your API
    const response = await fetch("http://localhost:5000/api/events");
    const events = await response.json();

    const bannerContainer = document.getElementById("slider-image");
    bannerContainer.innerHTML = "";

    if (events.length === 0) {
            bannerContainer.innerHTML = "<p>No events available.</p>";
            return;
        }
        events.forEach(event => {
          const slideDiv = document.createElement("div");
          slideDiv.classList.add("swiper-slide");

          slideDiv.innerHTML = `
              <img src="http://localhost:5000${event.imageUrl}" alt="${event.title}" />
              <div class="image-data">
              </div>
          `;

          bannerContainer.appendChild(slideDiv);
      });
 // ✅ Initialize Swiper.js
 new Swiper(".swiper-container", {
  loop: true,
  autoplay: { delay: 3000, disableOnInteraction: false },
  effect: "fade", // ✅ Smooth fade transition
  navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
  pagination: { el: ".swiper-pagination", clickable: true }
});

} catch (error) {
  console.error("❌ Error fetching event banners:", error);
}
}
// 🎯 Page Load hone par function call karo
document.addEventListener("DOMContentLoaded", fetchEventBanners);
