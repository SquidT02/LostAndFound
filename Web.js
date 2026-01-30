const form = document.getElementById("input");
const imageInput = document.getElementById("image");
const preview = document.getElementById("preview");

const itemCategories = {
    clothing: [],
    accessories: [],
    electronics: [],
    other: []

};
const categoryKeywords = {

    clothing: ['t-shirt', 'jeans', 'jacket', 'shoes', 'hat', 'coat', 'shorts'],
    accessories: ['watch', 'belt', 'glasses', 'scarf', 'jewelry', 'bag', 'backpack', 'wallet'],
    electronics: ['phone', 'laptop', 'headphones', 'charger'],
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  console.log("Item Name:", formData.get("itemName"));
  console.log("Description:", formData.get("description"));
  console.log("Image File:", formData.get("image"));

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

function categorizeItem(description) {

    const lowerDescription = description.toLowerCase();

    for (const [category, keywords] of Object.entries(categoryKeywords)) {

        if (keywords.some(keyword => lowerDescription.includes(keyword))) {
            return category;

        }
    }
    return 'other';
}

function storeReportedItem(FormData) {

    //needs in webReport description and name
    const item = {
        name: formData.itemName,
        description: formData.description,
        image: formData.image,
        dateReported: new Date(),
        category: category
    };

    itemCategories[category].push(item);
    console.log('Item stored in category:', category);
}
