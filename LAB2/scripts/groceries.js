	
// Array of products, each product is an object with different fieldset
// A set of ingredients should be added to products		 

var products = [
	{
		name: "Brocoli",
		lactoseFree: true,
		nutFree: true,
        organic: true,
		price: 1.99
	},
	{
		name: "Bread",
		lactoseFree: true,
		nutFree: false,
        organic: false,
		price: 2.35
	},
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
    {
		name: "Rice 2kg",
		lactoseFree: true,
		nutFree: true,
        organic: true,
		price: 10.00
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
    {
		name: "Peanut Butter Ice Cream",
		lactoseFree: false,
		nutFree: true,
        organic: false,
		price: 10.00
	}
];
	


// given restrictions provided, make a reduced list of products
// prices should be included in this list, as well as a sort based on price

function restrictListProducts(prods, restriction) {
	let product_names = [];
	for (let i=0; i<prods.length; i+=1) {
		if ((restriction == "LactoseFree") && (prods[i].lactoseFree == true)){
			product_names.push(prods[i].name);
		}
		else if ((restriction == "NutFree") && (prods[i].nutFree == true)){
			product_names.push(prods[i].name);
		}
		else if (restriction == "None"){
			product_names.push(prods[i].name);
		}
	}
	return product_names;
}

//Fucntion to add the organic options in the products
function organic(prods, restriction){
    let product_names = [];
    if (document.getElementById('dietSelect').checked)
        if((restriction == "Organic") && (prods[i].organic == true)){
            product_names.push(prods[i].name);
    }
    return product_names;
}

// Calculate the total price of items, with received parameter being a list of products
function getTotalPrice(chosenProducts) {
	totalPrice = 0;
	for (let i=0; i<products.length; i+=1) {
		if (chosenProducts.indexOf(products[i].name) > -1){
			totalPrice += products[i].price;
		}
	}
	return "$" + totalPrice;
}