
const form = document.getElementById("input");
const imageInput = document.getElementById("image");
const preview = document.getElementById("preview");

// Initially hide the preview
preview.style.display = "none";

// ===== Preview Image =====
imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];

  if (!file) {
    preview.src = "";
    preview.style.display = "none"; // hide if no file
    return;
  }

  // Create a temporary URL for preview
  const url = URL.createObjectURL(file);
  preview.src = url;
  preview.style.display = "block";
});

// ===== Submit Form =====
form.addEventListener("submit", async (e) => {
  e.preventDefault(); // prevent default form submission

  const formData = new FormData(form);

  try {
    const response = await fetch("save_item.php", {
      method: "POST",
      body: formData
    });

    const result = await response.json();

    if (result.status === "success") {
      console.log("Item saved to database");

      // Reset form & hide preview
      form.reset();
      preview.src = "";
      preview.style.display = "none";
    } else {
      console.error("Failed to save item");
    }
  } catch (err) {
    console.error("Error submitting form:", err);
  }
});

