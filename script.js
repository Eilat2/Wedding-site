const cloudinaryUrl = "https://api.cloudinary.com/v1_1/dejcl7muo/image/upload";
const cloudName = 'dejcl7muo'; // שם הענן שלך ב-Cloudinary
const apiKey = 'kFQHgiH2kfjcoH2krEPS43ebEpo'; // הוסף את ה-API Key שלך כאן

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
      headers: {
        "Authorization": `Bearer ${apiKey}` // שימוש ב-API Key בהדרכה מאובטחת
      }
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
  link.target = "_blank"; // פותח בלשונית חדשה
  link.appendChild(imgElement);

  gallery.appendChild(link);
  gallery.classList.remove("hidden");
};

// טעינת כל התמונות ישירות מ-Cloudinary
const loadImagesFromCloudinary = async () => {
  try {
    const response = await fetch(`https://res.cloudinary.com/${cloudName}/image/list/WeddingPhotos.json`);
    const data = await response.json();

    data.resources.forEach((image) => {
      const imageUrl = `https://res.cloudinary.com/${cloudName}/image/upload/${image.public_id}.${image.format}`;
      addToGallery(imageUrl);
    });

    gallery.classList.remove('hidden');
  } catch (error) {
    console.error('Error loading images from Cloudinary:', error);
  }
};

// כשמעלים קובץ
upload.addEventListener("change", async (event) => {
  const file = event.target.files[0];
  if (file) {
    const imageUrl = await uploadToCloudinary(file);
    if (imageUrl) {
      addToGallery(imageUrl);
      // כאן אין צורך לשמור את ה-URL ל-JSON כי אנחנו לא עובדים יותר עם JSON
    }
  } else {
    alert("נא לבחור קובץ");
  }
});

// כפתור להצגת/הסתרת הגלריה
showGalleryButton.addEventListener("click", () => {
  gallery.classList.toggle("hidden");
});

// בטעינה ראשונית — טוען את התמונות מהענן
loadImagesFromCloudinary();
