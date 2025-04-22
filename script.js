const upload = document.getElementById("upload");
const gallery = document.getElementById("gallery");

upload.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = document.createElement("img");
      img.src = e.target.result;

      // אפשרות להוריד
      const link = document.createElement("a");
      link.href = img.src;
      link.download = "wedding-photo.jpg";
      link.appendChild(img);

      gallery.appendChild(link);
    };
    reader.readAsDataURL(file);
  }
});
