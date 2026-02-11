
document.addEventListener("DOMContentLoaded", () => {
  const preview = document.getElementById("home-preview");

  if (!preview) return;

  fetch("latest_item.php")
    .then(response => response.json())
    .then(item => {
      // No items found
      if (!item || !item.id) {
        preview.innerHTML = `
          <p style="color:#6b7280;">
            No items have been reported yet.
          </p>
        `;
        return;
      }

      const imageHTML = item.image
        ? `<img src="${item.image}" alt="${item.name}" class="preview-image">`
        : `<div class="preview-placeholder">No image</div>`;

      preview.innerHTML = `
        <div class="preview-card">
          ${imageHTML}
          <div class="preview-info">
            <h4>${item.name}</h4>
          </div>
        </div>
      `;
    })
    .catch(err => {
      console.error(err);
      preview.innerHTML = `
        <p style="color:#b91c1c;">
          Unable to load latest item.
        </p>
      `;
    });
});
