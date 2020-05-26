import {get, displayBasket, addToBasket} from "./utils.js";
let urlWithParameters = window.location.search;
let urlParameters = new URLSearchParams(urlWithParameters);
let idProduct = urlParameters.get("id");
get("http://localhost:3000/api/teddies/" + idProduct)
.then(function(response){
	let breadcrumb = document.getElementsByClassName("breadcrumb")[0];
	breadcrumb.lastElementChild.setAttribute("class", "breadcrumb-item");
	breadcrumb.lastElementChild.removeAttribute("aria-current");
	breadcrumb.lastElementChild.innerHTML = '<a href="./index.html">Peluches</a>'
	let breadcrumbCurrent = document.createElement("li");
	breadcrumbCurrent.setAttribute("class", "breadcrumb-item active")
	breadcrumbCurrent.setAttribute("aria-current", "page");
	breadcrumbCurrent.textContent = response.name;
	breadcrumb.append(breadcrumbCurrent);

	let sectionProducts = document.getElementById("products");

	let card = document.createElement("article");
	card.setAttribute("class", "card card-product");

	let cardImage = document.createElement("img");
	cardImage.setAttribute("class", "card-img-top");
	cardImage.setAttribute("src", response.imageUrl);
	cardImage.setAttribute("alt", "image du produit");

	let cardBody = document.createElement("div");
	cardBody.setAttribute("class", "card-body text-center");

	let cardTitle = document.createElement("h2");
	cardTitle.setAttribute("class", "card-title");
	cardTitle.textContent = response.name;

	let cardDescription = document.createElement("p");
	cardDescription.setAttribute("class", "card-text");
	cardDescription.textContent = response.description;

	let cardPrice = document.createElement("p");
	cardPrice.setAttribute("class", "card-text");
	cardPrice.textContent = `${response.price} €`;

	let selectColor = document.createElement("select");
	selectColor.setAttribute("class", "custom-select mb-4");

	let optionTitle = document.createElement("option");
	optionTitle.setAttribute("selected", "");
	optionTitle.setAttribute("disabled", "");
	optionTitle.textContent = "Sélectionnez une couleur";

	let addProduct = document.createElement("btn");
	addProduct.setAttribute("class", "btn btn-primary btn-addProduct");
	addProduct.setAttribute("value", response._id);
	addProduct.textContent = "Ajouter au panier"

	sectionProducts.append(card);
	card.append(cardImage, cardBody);
	cardBody.append(cardTitle, cardDescription, cardPrice, selectColor, addProduct);
	selectColor.append(optionTitle);
	for(let i = 0; i < response.colors.length; i++){
		let optionColor = document.createElement("option");
		optionColor.textContent = response.colors[i];
		selectColor.append(optionColor);
	}
	return response;
})
.then(function(response){
	addToBasket(response);
})
.catch(function(error){
	let divAlert = document.createElement("div")
	divAlert.setAttribute("class", "alert alert-danger");
	divAlert.setAttribute("role", "alert");
	divAlert.textContent = "Désolé, impossible d'afficher le produit demandé";
	document.getElementById("products").append(divAlert);
})
displayBasket();
document.getElementById("clean-basket").addEventListener("click", function(){
	localStorage.clear();
	displayBasket();
})