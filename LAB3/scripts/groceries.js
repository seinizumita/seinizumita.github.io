	
// Array of products, each product is an object with different fieldset
// A set of ingredients should be added to products		 

var productCategories = [
	{
		name: 'Produce',
		products:[
		{
			name: "Brocoli",
			lactoseFree: true,
			nutFree: true,
			organic: true,
			price: 1.99
		},
		{
			name: "Bananas",
			lactoseFree: true,
			nutFree: true,
			organic: true,
			price: 10.00
		},
		{
			name: "Strawberries",
			lactoseFree: true,
			nutFree: true,
			organic: true,
			price: 10.00
		},
		],
	},
	{
		name: 'Dairy',
		products:[
		{
		name: "2% Milk",
		lactoseFree: false,
		nutFree: true,
        organic: false,
		price: 10.00
	},
	{
		name: "Oat Milk",
		lactoseFree: true,
		nutFree: true,
        organic: true,
		price: 10.00
	},
	{
		name: "Peanut Butter Ice Cream",
		lactoseFree: false,
		nutFree: true,
        organic: false,
		price: 10.00
	},	
		],
	},
	{
		name:'Grains',
		products:[
		{
			name: "Bread",
			lactoseFree: true,
			nutFree: false,
			organic: false,
			price: 2.35
			},
			{
			name: "Rice 2kg",
			lactoseFree: true,
			nutFree: true,
			organic: true,
			price: 10.00
			},
		],
	},
	{
		name:'Nuts',
		products:[
		{
		name: "Assorted Nuts",
		lactoseFree: true,
		nutFree: false,
        organic: true,
		price: 10.00
		},
    	{
		name: "Peanut Butter",
		lactoseFree: true,
		nutFree: false,
        organic: false,
		price: 10.00
		},

		]
	}
    
]
	


// given restrictions provided, make a reduced list of products
// prices should be included in this list, as well as a sort based on price

var restrictions = {
	lactoseFree: false,
	nutFree: false,
	organic: false,
}


// Using the restrictions, make a reduced list of products
// prices should be included in this list, as well as a sort based on price

function filterProducts() {
	var avail_products = [...this.productCategories]
	// Go through each product category to filter out and sort them by price
	avail_products.forEach((p) => {
		// If any of the restrictions have been applied, we filter them out
		if (
			restrictions.lactoseFree ||
			restrictions.nutFree ||
			restrictions.organic
		) {
			p.products = p.products.filter(function (prod) {
				return (
					(!this.restrictions.lactoseFree
						? true
						: prod.lactoseFree == this.restrictions.lactoseFree) &&
					(!this.restrictions.nutFree
						? true
						: prod.nutFree == this.restrictions.nutFree) &&
					(!this.restrictions.organic
						? true
						: prod.organic == this.restrictions.organic)
				)
			})
		}
		// Sort by price
		if (p.products?.length != 0) {
			p.products.sort(function (a, b) {
				if (a.price < b.price) {
					return -1
				}
				if (a.price > b.price) {
					return 1
				}
				return 0
			})
		}
	})

	return avail_products
}


//Setters for restrictions
function setLactoseFree(selection) {
	this.restrictions.lactoseFree = selection
}

function setNutFree(selection) {
	this.restrictions.nutFree = selection
}

function setOrganic(selection) {
	this.restrictions.organic = selection
}
