import {get, displayMiniBasket, addToBasket} from "./utils.js";
get("http://localhost:3000/api/teddies/")
.then(function(response) {
	response.forEach(function(product){
		let sectionProducts = document.getElementById("products");

		let card = document.createElement("article");
		card.setAttribute("class", "card");

		let cardRow = document.createElement("div");
		cardRow.setAttribute("class", "row align-items-center");

		let imgCol = document.createElement("div");
		imgCol.setAttribute("class", "col-md-4");

		let cardImage = document.createElement("img");
		cardImage.setAttribute("class", "card-img");
		cardImage.setAttribute("src", product.imageUrl);
		cardImage.setAttribute("alt", "");

		let bodyCol = document.createElement("div");
		bodyCol.setAttribute("class", "col-md-8");

		let cardBody = document.createElement("div");
		cardBody.setAttribute("class", "card-body");

		let cardTitle = document.createElement("h2");
		cardTitle.setAttribute("class", "card-title");
		cardTitle.textContent = product.name;

		let cardDescription = document.createElement("p");
		cardDescription.setAttribute("class", "card-text");
		cardDescription.textContent = product.description;

		let cardPrice = document.createElement("p");
		cardPrice.setAttribute("class", "card-text");
		cardPrice.textContent = `${product.price} €`;

		let addProduct = document.createElement("btn");
		addProduct.setAttribute("class", "btn btn-primary btn-addProduct");
		addProduct.setAttribute("value", product._id);
		addProduct.textContent = "Ajouter au panier";
		addProduct.style.zIndex = "2";
		addProduct.style.position = "relative";

		let displayProduct = document.createElement("a");
		displayProduct.setAttribute("class", "stretched-link goto-product");
		displayProduct.setAttribute("href", `./product.html?id=${product._id}`);
		displayProduct.setAttribute("value", product._id);

		sectionProducts.append(card);
		card.append(cardRow, displayProduct);
		cardRow.append(imgCol, bodyCol);
		imgCol.append(cardImage);
		bodyCol.append(cardBody);
		cardBody.append(cardTitle, cardDescription, cardPrice, addProduct);
	});

	return response;
})
.then(function(response){
	addToBasket(response);
})
.catch(function(error){
	let divAlert = document.createElement("div");
	divAlert.setAttribute("class", "alert alert-danger");
	divAlert.setAttribute("role", "alert");
	divAlert.textContent = "Désolé, impossible d'afficher les produits";
	document.getElementById("products").append(divAlert);
});

displayMiniBasket();

document.getElementById("clean-basket").addEventListener("click", function(){
	localStorage.clear();
	displayMiniBasket();
});





