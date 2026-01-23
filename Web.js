const form = document.getElementById("input");
const imageInput = document.getElementById("image");
const preview = document.getElementById("preview");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  console.log("Form ready to send", formData);
});

imageInput.addEventListener("change", () => {
  const formData = new FormData(form);
  const file = formData.get("image");

  if (!(file instanceof File) || !file.type.startsWith("image/")) {
    preview.style.display = "none";
    preview.src = "";
    return;
  }

  const imageURL = URL.createObjectURL(file);
  preview.src = imageURL;
  preview.style.display = "block";

  preview.onload = () => URL.revokeObjectURL(imageURL);
});

