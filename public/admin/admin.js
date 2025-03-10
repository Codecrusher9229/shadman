// admin.js 

document.addEventListener("DOMContentLoaded", () => {
    fetchAdminEvents(); // Load events on page load
    fetchRegisteredParticipants(); // Load registered participants
    toggleSection("add-event"); // Ensure "Add Event" is active

    // ✅ Event Form Submission (Add Event)
    document.getElementById("eventForm").addEventListener("submit", async function (event) {
        event.preventDefault();

        const eventName = document.getElementById("eventName").value.trim();
        const eventDate = document.getElementById("eventDate").value;
        const eventDescription = document.getElementById("eventDescription").value.trim();
        const eventImage = document.getElementById("eventImage").files[0];

        if (!eventName || !eventDate || !eventDescription || !eventImage) {
            alert("⚠️ All fields are required!");
            return;
        }

        const formData = new FormData();
        formData.append("title", eventName);
        formData.append("date", eventDate);
        formData.append("description", eventDescription);
        formData.append("image", eventImage);

        const token = localStorage.getItem("adminToken");
        if (!token) {
            alert("❌ Unauthorized! Please log in again.");
            window.location.href = "adminLogin.html";
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/events/add", {
                method: "POST",
                headers: { "Authorization": `Bearer ${token}` },
                body: formData
            });

            const result = await response.json();
            console.log("📩 Add Event Response:", result);

            if (response.ok) {
                alert("✅ Event added successfully!");
                fetchAdminEvents();
                document.getElementById("eventForm").reset();
            } else {
                alert(result.message || "❌ Failed to add event!");
            }
        } catch (error) {
            console.error("❌ Error adding event:", error);
            alert("⚠️ Server error, try again later!");
        }
    });

    // ✅ Gallery Image Upload Form with Authentication
    document.getElementById("galleryForm").addEventListener("submit", async function (event) {
        event.preventDefault();
    
        const selectedEvent = document.getElementById("galleryEvent").value;
        const imagesInput = document.getElementById("galleryImages");
        const files = imagesInput.files;
    
        if (!selectedEvent) {
            alert("⚠️ Please select an event.");
            return;
        }
    
        if (files.length === 0) {
            alert("⚠️ Please select images to upload.");
            return;
        }
    
        const formData = new FormData();
        formData.append("eventId", selectedEvent);  // ✅ Event ID bhejna zaroori hai
        for (let i = 0; i < files.length; i++) {
            formData.append("images", files[i]); // ✅ Image file bhi bhejni hai
        }
    
        try {
            const response = await fetch("http://localhost:5000/api/gallery/upload", {
                method: "POST",
                body: formData
            });
    
            const result = await response.json();
            console.log("Gallery Upload Response:", result); // ✅ Debugging ke liye log
    
            if (response.ok) {
                alert("✅ Images uploaded successfully!");
                imagesInput.value = "";
            } else {
                alert(result.message || "❌ Failed to upload images!");
            }
        } catch (error) {
            console.error("❌ Error uploading images:", error);
            alert("⚠️ Server error, try again later!");
        }
    });
    

    // ✅ Handle Navigation Clicks
    document.querySelectorAll(".nav-btn").forEach(button => {
        button.addEventListener("click", function () {
            const sectionId = this.getAttribute("onclick").split("'")[1];
            toggleSection(sectionId);
        });
    });
});

// ✅ Function to Toggle Between Sections
function toggleSection(sectionId) {
    document.querySelectorAll("main section").forEach(section => section.style.display = "none");
    document.getElementById(sectionId).style.display = "block";

    document.querySelectorAll(".nav-btn").forEach(button => button.classList.remove("active"));
    document.querySelector(`[onclick="toggleSection('${sectionId}')"]`).classList.add("active");
}

// ✅ Fetch Events from MongoDB
async function fetchAdminEvents() {
    try {
        const response = await fetch("http://localhost:5000/api/events");
        if (!response.ok) throw new Error("⚠️ Failed to fetch events");

        const events = await response.json();
        console.log("📅 Fetched Events:", events);

        const eventDropdown = document.getElementById("galleryEvent");
        eventDropdown.innerHTML = '<option value="">Select an event</option>';

        events.forEach(event => {
            const option = document.createElement("option");
            option.value = event._id;
            option.textContent = `${event.title} - ${new Date(event.date).toDateString()}`;
            eventDropdown.appendChild(option);
        });
    } catch (error) {
        console.error("❌ Error fetching events:", error);
    }
}

// ✅ Fetch Registered Participants
let participantsData = []; // Ensure this is globally declared at the top

async function fetchRegisteredParticipants() {
    try {
        const token = localStorage.getItem("adminToken"); // Get the stored token
        const response = await fetch("http://localhost:5000/api/admin/registered-participants", {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) throw new Error("⚠️ Failed to fetch participants");

        const participants = await response.json();
        participantsData = participants; // Store fetched participants globally

        console.log("👥 Fetched Participants:", participants);

        const participantsTable = document.getElementById("participantsTable");
        participantsTable.innerHTML = ""; // Clear previous data

        participants.forEach(participant => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${participant.fullName}</td>
                <td>${participant.department}</td>
                <td>${participant.studentId}</td>
                <td>${participant.email}</td>
                <td>${participant.phone}</td>
                <td>${participant.event ? participant.event.title : "Event Not Found"}</td>
            `;
            participantsTable.appendChild(row);
        });
    } catch (error) {
        console.error("❌ Error fetching participants:", error);
    }
}

// Function to convert data to CSV and trigger download
function downloadCSV() {
    if (!participantsData || participantsData.length === 0) {
        alert("⚠️ No participant data available to download.");
        return;
    }

    // Define CSV headers
    let csvContent = "Full Name,Department,Student ID,Email,Phone,Event\n";

    // Loop through participant data and format it as CSV
    participantsData.forEach(participant => {
        const row = [
            participant.fullName,
            participant.department,
            participant.studentId,
            participant.email,
            participant.phone,
            participant.event ? participant.event.title : "N/A"
        ].join(","); // Convert to CSV format

        csvContent += row + "\n"; // Add to CSV content
    });

    // Create a Blob and download the CSV file
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Participants_List.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Ensure the button exists before adding the event listener
document.addEventListener("DOMContentLoaded", () => {
    fetchRegisteredParticipants(); // Fetch participants on page load

    const downloadButton = document.getElementById("downloadCSVBtn");
    if (downloadButton) {
        downloadButton.addEventListener("click", downloadCSV);
    }
});

// Call this function when the Admin Dashboard loads
document.addEventListener("DOMContentLoaded", () => {
    fetchRegisteredParticipants();
});
//  Event gallery
document.addEventListener("DOMContentLoaded", fetchGalleryImages);

const galleryContainer = document.getElementById("galleryImagesContainer");

// ✅ Fetch Images from Backend
async function fetchGalleryImages() {
    try {
        const response = await fetch("http://localhost:5000/api/gallery/fetch");
        const images = await response.json();

        galleryContainer.innerHTML = ""; // Clear existing images

        if (images.length === 0) {
            galleryContainer.innerHTML = "<p>No images available.</p>";
            return;
        }

        images.forEach(image => {
            const imgWrapper = document.createElement("div");
            imgWrapper.classList.add("image-wrapper");

            const img = document.createElement("img");
            img.src = `http://localhost:5000${image.imageUrl}`;
            img.alt = "Event Image";

            const deleteBtn = document.createElement("button");
            deleteBtn.innerText = "Delete";
            deleteBtn.classList.add("delete-btn");
            deleteBtn.onclick = () => deleteImage(image._id);

            imgWrapper.appendChild(img);
            imgWrapper.appendChild(deleteBtn);
            galleryContainer.appendChild(imgWrapper);
        });
    } catch (error) {
        console.error("Error fetching images:", error);
    }
}

// ✅ Delete Image Function
async function deleteImage(imageId) {
    if (!confirm("Are you sure you want to delete this image?")) return;

    try {
        const response = await fetch(`http://localhost:5000/api/gallery/delete/${imageId}`, {
            method: "DELETE",
        });

        const data = await response.json();
        alert(data.message);

        // Refresh gallery after deletion
        fetchGalleryImages();
    } catch (error) {
        console.error("Error deleting image:", error);
    }
}


// ✅ Logout Function
function logout() {
    localStorage.removeItem("adminToken");
    alert("✅ Logged out successfully!");
    window.location.href = "adminLogin.html";
}
