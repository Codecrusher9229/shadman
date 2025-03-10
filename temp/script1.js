
// Function to switch sections
function showSection(sectionId) {
    document.querySelectorAll(".content-section").forEach(section => {
        section.classList.add("hidden");
    });

    document.getElementById(sectionId).classList.remove("hidden");

    // Highlight active button
    document.querySelectorAll(".nav-btn").forEach(btn => {
        btn.classList.remove("active");
    });
    document.querySelector(`[onclick="showSection('${sectionId}')"]`).classList.add("active");
}
// Upcoming Events
// Upcoming Events
document.addEventListener("DOMContentLoaded", async function () {
    const futureEventsContainer = document.getElementById("future-events-list");
    
    // Ensure the container exists
    if (!futureEventsContainer) {
        console.error("Error: #future-events-list not found in the DOM");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/api/events");
        const events = await response.json();

        futureEventsContainer.innerHTML = ""; // Clear previous content

        if (events.length === 0) {
            futureEventsContainer.innerHTML = "<p>No upcoming events at the moment.</p>";
            return;
        }

        events.forEach(event => {
            const eventCard = document.createElement("div");
            eventCard.classList.add("event-card");
            eventCard.innerHTML = `
                <h3>${event.name}</h3>
                <p>Date: ${new Date(event.date).toDateString()}</p>
            `;
            futureEventsContainer.appendChild(eventCard);
        });
    } catch (error) {
        console.error("Error fetching events:", error);
    }
});

// Auto Image Slider
let currentSlide = 0;
let images = [];

async function fetchGalleryImages() {
    const response = await fetch("http://localhost:5000/api/gallery");
    images = await response.json();

    if (images.length > 0) {
        updateSlider();
        setInterval(() => changeSlide(1), 3000);
    }
}
function updateSlider() {
    const slider = document.querySelector(".slider");
    slider.innerHTML = ""; // Clear previous images

    images.forEach((img, index) => {
        const imgElement = document.createElement("img");
        imgElement.src = `http://localhost:5000/uploads/${img}`;
        imgElement.classList.add("slide-image"); // Add a class
        if (index === currentSlide) imgElement.classList.add("active"); // Show active image
        slider.appendChild(imgElement);
    });
}


function changeSlide(direction) {
    currentSlide = (currentSlide + direction + images.length) % images.length;
    updateSlider();
}

// Fetch images when page loads
document.addEventListener("DOMContentLoaded", fetchGalleryImages);








/* Google Font */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');

/* General Reset */
* {
margin: 0;
padding: 0;
box-sizing: border-box;
font-family: 'Poppins', sans-serif;
}

/* Page Background */
body {
/* min-height: 100vh; */
/* background: linear-gradient(135deg, #4facfe, #00f2fe); */
background-image: url("/public/admin/pngtree-refreshing-natural-yellow-green-blue-watercolor-smudge-background-picture-image_1311486.jpg");
background-repeat: no-repeat;
background-size: cover;
}

/* Registration Form Container */
.container {
height: 40w;
width: 90vw;
margin-left: 5vw;
background: #fff;
padding: 25px;
border-radius: 12px;
box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
margin-top: 3vw;
}
h5{
color: red;
margin-left: 4vw;


}
/* Form Header */

h1{
    margin-left: 4vw;
    padding-top: 1vw;
  
}
.event{
    margin-top: 2.4vw;
}
/* Input Fields */
.input-group {
margin-bottom: 15px;
}

label {
display: block;
font-weight: 500;
color: #555;
margin-top: 1.2vw;

}

input, select {
width: 30vw;
padding: 10px;
border: 1px solid #ccc;
border-radius: 6px;
font-size: 16px;
outline: none;
transition: 0.3s;
}

input:focus, select:focus {
border-color: #0c6ddb;
box-shadow: 0px 0px 5px rgba(0, 242, 254, 0.5);
}

/* Submit Button */
button {
width:90%;
margin-left: 4vw;
margin-bottom: 2vw;
padding: 10px;
border: none;
background:  #253466;
color: white;
font-size: 16px;
font-weight: 500;
border-radius: 6px;
cursor: pointer;
transition: 0.3s;
}

button:hover {
background: #0056b3;
}

form{
    /* background-color: #00f2fe; */
    margin-top: 1.5vw;
   
}

.main{
 display: flex;
 padding-bottom: 4vw;
 padding-top: 0vw;
 margin-left: 2vw;
}

.first{
    margin-left: 2vw;
}

.second{
    margin-left: 3vw;
}

.h5k{
    margin-left: 0vw;
    font-size: 0.8vw;
}
.h5a{
    display:none;
}

@media screen and (max-width: 768px) {
    .main{
        height: 40vw;
    }

    body{
        background-size: 260vw;
    }

    *{
        overflow: hidden;
    }
}



/* Responsive Design */
@media (max-width: 429px) {

    .main{
        height: 100vw;
        flex-direction: column;
    }

    h5{
        font-size: 2.5vw;
    }

    input, select {
        width: 70vw;
        padding: 4px;
        border: 1px solid #ccc;
        border-radius: 6px;
        font-size: 16px;
        outline: none;
        transition: 0.3s;
        }

    
.h5k{
    margin-left: 0vw;
    font-size: 1.5vw;
}   

label {
    display: block;
    font-weight: 500;
    color: #555;
    margin-top: 1.2vw;
    font-size: 3.5vw;
    }

    select{
        font-size: 3vw;
        padding: 9px;
    }
}

@media screen and (max-width: 376px){
    h1{
        font-size: 8vw;
        line-height: 1.3;
      
    }
    
    .main{
        height: 110vw;
    }

    button{
        font-size: 3.5vw;
    }

    label{
        margin-top: 8px;
    }

    .main{
        margin-left: 0.5vw;
    }

    h4{
        margin-left: -1vw;
    }
}

@media screen and (max-width: 321px){
body{
    background-size: 300vw;

}

.main{
    height: 130vw;
}

label{
    margin-top: 12px;
}

.h5k{
    font-size: 2vw;
}
}


//////////////
//////////////////////////////
//////////////////////////////////////
///////////////////////////////////////////////
//////////////////////////////////////////////////////
<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}

body {
    background-image: url("/public/admin/pngtree-refreshing-natural-yellow-green-blue-watercolor-smudge-background-picture-image_1311486.jpg");
    background-repeat: no-repeat;
    background-size: cover;
}

.container {
    height: 40w;
    width: 90vw;
    margin-left: 5vw;
    background: #fff;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
    margin-top: 3vw;
}
.main {
    display: flex;
    padding-bottom: 4vw;
    padding-top: 0vw;
    margin-left: 2vw;
    margin-top: 35px;
}
h1 {
    margin-left: 4vw;
    padding-top: 1vw;
}

h5 {
    color: red;
    margin-left: 4vw;
}

.form-group {
    display: flex;
    justify-content: space-between;
    gap: 15px;
    margin-bottom: 15px;
    margin-left: 2vw;
}
.h5k {
margin-left: 0vw;
font-size: 0.8vw;
}
.form-group div {
    flex: 1;
}
.first {
    margin-left: 2vw;
}
.second {
    margin-left: 3vw;
}
label {
display: block;
font-weight: 500;
color: #555;
margin-top: 1.2vw;
}

input, select {
    width: 30vw;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 16px;
    outline: none;
    transition: 0.3s;
}

input:focus, select:focus {
    border-color: #00f2fe;
    box-shadow: 0px 0px 5px rgba(0, 242, 254, 0.5);
}
.logo {
position: absolute;
top: 77px;
right: 152px;
width: 240px;
height: auto;
}

button {
    width: 90%;
    margin-left: 4vw;
    margin-bottom: 2vw;
    padding: 10px;
    border: none;
    background: #253466;
    color: white;
    font-size: 16px;
    font-weight: 500;
    border-radius: 6px;
    cursor: pointer;
    transition: 0.3s;
}

button:hover {
    background: #003b80;
}


@media screen and (max-width: 768px) {
.main{
height: 40vw;
}

body{
background-size: 260vw;
}
.logo {
position: absolute;
top: 47px;
right: 75px;
width: 240px;
height: auto;
}
*{
overflow: scroll;
}
}

@media (max-width: 1024px) {
.logo {
position: absolute;
top: 58px;
right: 113px;
width: 240px;
height: auto;
}
}


/* Responsive Design */
@media (max-width: 429px) {

.main{
height: 100vw;
flex-direction: column;
}

h5{
font-size: 2.5vw;
}
.logo {
display: none;
position: absolute;
top: 47px;
right: 75px;
width: 240px;
height: auto;
}
input, select {
width: 70vw;
padding: 4px;
border: 1px solid #ccc;
border-radius: 6px;
font-size: 16px;
outline: none;
transition: 0.3s;
}


.h5k{
margin-left: 0vw;
font-size: 1.5vw;
}   

label {
display: block;
font-weight: 500;
color: #555;
margin-top: 1.2vw;
font-size: 3.5vw;
}

/* select{
font-size: 3vw;
padding: 9px;
} */
}

@media screen and (max-width: 376px){
h1{
font-size: 8vw;
line-height: 1.3;

}

.main{
height: 110vw;
}

button{
font-size: 3.5vw;
}

label{
margin-top: 8px;
}

.main{
margin-left: 0.5vw;
}

h4{
margin-left: -1vw;
}
}

@media screen and (max-width: 321px){
body{
background-size: 300vw;

}

.main{
height: 130vw;
}

label{
margin-top: 12px;
}

.h5k{
font-size: 2vw;
}
}



</style>