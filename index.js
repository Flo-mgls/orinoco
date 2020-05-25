import {get} from "./utils.js";

get("http://localhost:3000/api/teddies/")
.then(function(response) {
	for(let i = 0; i < response.length; i++){
		let sectionProducts = document.getElementById("products");

		let card = document.createElement("div");
		card.setAttribute("class", "card");

		let cardRow = document.createElement("div");
		cardRow.setAttribute("class", "row align-items-center");

		let imgCol = document.createElement("div");
		imgCol.setAttribute("class", "col-md-2")

		let cardImage = document.createElement("img");
		cardImage.setAttribute("class", "card-img");
		cardImage.setAttribute("src", response[i].imageUrl);
		cardImage.setAttribute("alt", "image du produit");

		let bodyCol = document.createElement("div");
		bodyCol.setAttribute("class", "col-md-10");

		let cardBody = document.createElement("div");
		cardBody.setAttribute("class", "card-body");

		let cardTitle = document.createElement("h2");
		cardTitle.setAttribute("class", "card-title");
		cardTitle.textContent = response[i].name;

		let cardDescription = document.createElement("p");
		cardDescription.setAttribute("class", "card-text");
		cardDescription.textContent = response[i].description;

		let cardPrice = document.createElement("p");
		cardPrice.setAttribute("class", "card-text");
		cardPrice.textContent = `${response[i].price} €`;

		let addProduct = document.createElement("a");
		addProduct.setAttribute("class", "btn btn-primary btn-addProduct");
		addProduct.setAttribute("href", "#");
		addProduct.setAttribute("id", response[i]._id);
		addProduct.textContent = "Ajouter au panier"

		let displayProduct = document.createElement("a");
		displayProduct.setAttribute("class", "stretched-link");
		displayProduct.setAttribute("href", "#");

		sectionProducts.append(card);
		card.append(cardRow);
		cardRow.append(imgCol, bodyCol);
		imgCol.append(cardImage);
		bodyCol.append(cardBody);
		cardBody.append(cardTitle, cardDescription, cardPrice, addProduct, displayProduct);

	}
})
.catch(function(error){
	let divAlert = document.createElement("div")
	divAlert.setAttribute("class", "alert alert-danger");
	divAlert.setAttribute("role", "alert");
	divAlert.textContent = "Désolé, impossible d'afficher les produits";
	document.getElementById("products").append(divAlert);
})

let btnAddProduct = document.getElementsByClassName("btn-addProduct");
for(let i = 0; i < btnAddProduct.length; i++){
	btnAddProduct.addEventListener("click", function(){
		localStorage.setItem(`produit${i}`, btnAddProduct[i].id);
	})
}










