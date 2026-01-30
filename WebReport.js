const form = document.getElementById("input");
const imageInput = document.getElementById("image");
const preview = document.getElementById("preview");

// Load saved items or start empty
let items = JSON.parse(localStorage.getItem("lostItems")) || [];

// ---- IMAGE PREVIEW ----
imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];

  if (!file || !file.type.startsWith("image/")) {
    preview.src = "";
    preview.style.display = "none";
    return;
  }

  const url = URL.createObjectURL(file);
  preview.src = url;
  preview.style.display = "block";
});

// ---- FORM SUBMIT ----
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const itemName = document.getElementById("itemName").value;
  const description = document.getElementById("description").value;
  const imageFile = imageInput.files[0];

  // Convert image to Base64 so it can be stored
  const reader = new FileReader();
  reader.onload = () => {
    const item = {
      name: itemName,
      description: description,
      image: reader.result, // Base64 string
      dateReported: new Date().toISOString()
    };

    items.push(item);
    localStorage.setItem("lostItems", JSON.stringify(items));

    console.log("Saved item:", item);

    form.reset();
    preview.style.display = "none";
  };

  if (imageFile) {
    reader.readAsDataURL(imageFile);
  }
});

