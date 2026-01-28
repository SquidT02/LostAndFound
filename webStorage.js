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

function categorizeItem(description) {

    const lowerDescription = description.toLowerCase();

    for (const [category, keywords] of Object.entries(categoryKeywords)) {

        if (keywords.some(keyword => lowerDescription.includes(keyword))) {
            return category;

        }
    }
    return 'other';
}

function storeReportedItem(formData) {

    const category = categorizeItem(formData.description);

    const item = {
        name: formData.name,
        description: formData.description,
        image: formData.itemImage,
        dateReported: new Date(),
        category: category
    };

    itemCategories[category].push(item);
    console.log('Item stored in category:', category);