document.getElementById("registrationForm").addEventListener("submit", async function (event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append("fullName", document.getElementById("fullName").value.trim());
    formData.append("phone", document.getElementById("phone").value.trim());
    formData.append("studentId", document.getElementById("studentId").value.trim());
    formData.append("gender", document.getElementById("gender").value);
    formData.append("email", document.getElementById("email").value.trim());
    formData.append("department", document.getElementById("department").value.trim());
    formData.append("category", document.getElementById("category").value);
    
    const fileInput = document.getElementById("candidateImg");
    if (fileInput.files.length === 0) {
        alert("⚠️ Please upload an image!");
        return;
    }
    formData.append("candidateImg", fileInput.files[0]);

    try {
        const response = await fetch("http://localhost:5000/api/future/register", {
            method: "POST",
            body: formData
        });

        const result = await response.json();
        console.log("📩 Registration Response:", result);

        if (response.ok) {
            alert("✅ Registration successful!");
            document.getElementById("registrationForm").reset();
        } else {
            alert(result.message || "❌ Failed to register!");
        }
    } catch (error) {
        console.error("❌ Error registering participant:", error);
        alert("⚠️ Server error, try again later!");
    }
});

// Capitalize input values automatically
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("input").forEach(input => {
        input.addEventListener("input", function() {
            this.value = this.value.toUpperCase();
        });
    });
});
