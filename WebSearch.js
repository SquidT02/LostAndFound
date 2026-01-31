const searchInput = document.getElementById("searchInput");
const resultsContainer = document.getElementById("results");

// Load items from database
async function loadItems(query = "") {
  const response = await fetch(`search_items.php?q=${encodeURIComponent(query)}`);
  return await response.json();
}

// Display all items on page load
(async () => {
  const items = await loadItems();
  displayItems(items);
})();

// Live search
searchInput.addEventListener("input", async () => {
  const query = searchInput.value;
  const items = await loadItems(query);
  displayItems(items);
});

// Display function (mostly unchanged)

function displayItems(itemList) {
  resultsContainer.innerHTML = "";

  if (!itemList || itemList.length === 0) {
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
      <br><br>
      <button class="claim-btn" onclick="claimItem(${item.id})">Claim</button>
    `;

    resultsContainer.appendChild(card);
  });
}

function claimItem(itemId) {
  window.location.href = `claim.html?item_id=${itemId}`;
}

