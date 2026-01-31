const form = document.getElementById("input");
const imageInput = document.getElementById("image");
const preview = document.getElementById("preview");

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
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("itemName", document.getElementById("itemName").value);
  formData.append("description", document.getElementById("description").value);
  formData.append("image", imageInput.files[0]);

  try {
    const response = await fetch("save_item.php", {
      method: "POST",
      body: formData
    });

    const result = await response.json();

    if (result.status === "success") {
      console.log("Item saved to database");
      form.reset();
      preview.style.display = "none";
    } else {
      console.error("Failed to save item");
    }
  } catch (err) {
    console.error("Error:", err);
  }
});


