const form = document.getElementById("input");
const imageInput = document.getElementById("image");
const preview = document.getElementById("preview");

// Preview Image
imageInput.addEventListener("change", () => {
  const file = imageInput.files[0];
  const url = URL.createObjectURL(file);
 if (file) {
    preview.src = url;
    preview.style.display = "block";
    preview.style.visibility = "visible";
  }
});

// Submit Form
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);

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
    console.log(err);
  }
});


