const cloudinaryUrl = "https://api.cloudinary.com/v1_1/dejcl7muo/image/upload";

const upload = document.getElementById("upload");
const gallery = document.getElementById("gallery");
const showGalleryButton = document.getElementById("showGallery");

// פונקציה להעלאת תמונה ל-Cloudinary
const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "WeddingPhotos");

  try {
    const response = await fetch(cloudinaryUrl, {
        method: "POST",
      body: formData,
    });

    const data = await response.json();
    return data.secure_url; // כתובת התמונה בענן
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    alert("Failed to upload image.");
  }
};

// הוספת תמונה לגלריה
const addToGallery = (imageUrl) => {
  const imgElement = document.createElement("img");
  imgElement.src = imageUrl;
  imgElement.alt = "Wedding Image";
  imgElement.className = "gallery-image";

  const link = document.createElement("a");
  link.href = imageUrl;
  link.download = "wedding-photo.jpg";
  link.appendChild(imgElement);

  gallery.appendChild(link);
  gallery.classList.remove("hidden");
};

// העלאת תמונות והצגתן בגלריה
upload.addEventListener("change", async (event) => {
  const file = event.target.files[0];
  if (file) {
    const imageUrl = await uploadToCloudinary(file);
    if (imageUrl) {
      addToGallery(imageUrl);
    }
  } else {
    alert("Please select a file!");
  }
});

// כפתור להצגת הגלריה
showGalleryButton.addEventListener("click", () => {
  gallery.classList.toggle("hidden");
});
