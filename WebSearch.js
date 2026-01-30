
const searchInput = document.getElementById("searchInput");
const resultsContainer = document.getElementById("results");

// Load items from localStorage
function loadItems() {
  return JSON.parse(localStorage.getItem("lostItems")) || [];
}

// Display all items on load
displayItems(loadItems());

// Live search (no submit needed)
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const items = loadItems();

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(query) ||
    item.description.toLowerCase().includes(query)
  );

  displayItems(filteredItems);
});

// Display function
function displayItems(itemList) {
  resultsContainer.innerHTML = "";

  if (itemList.length === 0) {
    resultsContainer.innerHTML = "<p>No items found.</p>";
    return;
  }

  itemList.forEach(item => {
    const card = document.createElement("div");
    card.className = "item-card";

    card.innerHTML = `
      <h3>${item.name}</h3>
      <p>${item.description}</p>
      ${item.image ? `<img src="${item.image}" alt="${item.name}">` : ""}
      <small>Reported: ${new Date(item.dateReported).toLocaleDateString()}</small>
    `;

    resultsContainer.appendChild(card);
  });
}


