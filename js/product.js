import {get, displayMiniBasket, addToBasket} from "./utils.js"; // On importe les fonctions nécessaires

let urlWithParameters = window.location.search; // On récupère les paramètre d'url, donc l'id
let urlParameters = new URLSearchParams(urlWithParameters); // On utilise l'interface URLSearchParams pour détacher les paramètres
let idProduct = urlParameters.get("id"); // On récupère l'id

get("http://localhost:3000/api/teddies/" + idProduct) // On fait une requête pour obtenir la peluche correspondant à l'id récupérée
.then(function(response){ // Si la requête a fonctionné
	document.title = "Orinoco - Peluche " + response.name; // On détermine le titre de la page en fonction de la peluche

	let breadcrumb = document.getElementsByClassName("breadcrumb")[0]; // On met à jour le fil d'ariane
	breadcrumb.lastElementChild.setAttribute("class", "breadcrumb-item");
	breadcrumb.lastElementChild.removeAttribute("aria-current"); 
	breadcrumb.lastElementChild.innerHTML = '<a href="./index.html">Peluches</a>'; // On lui permet de revenir à la page de toutes les peluches

	let breadcrumbCurrent = document.createElement("li"); // On ajoute le nouveau
	breadcrumbCurrent.setAttribute("class", "breadcrumb-item active");
	breadcrumbCurrent.setAttribute("aria-current", "page");
	breadcrumbCurrent.textContent = response.name; // Son contenu étant la propriété name de notre peluche
	breadcrumb.append(breadcrumbCurrent); // On l'ajoute au DOM

	let sectionProducts = document.getElementById("products"); // On récupère la section qui contiendra les infos de notre object peluche

	let card = document.createElement("article"); // Comme pour la page index, on affiche toutes les infos dans une carte bootstrap
	card.setAttribute("class", "card card-product");

	let cardImage = document.createElement("img");
	cardImage.setAttribute("class", "card-img-top");
	cardImage.setAttribute("src", response.imageUrl);
	cardImage.setAttribute("alt", "");

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

	let form = document.createElement("form"); // On crée un élément form qui contiendra le choix des couleurs
	form.setAttribute("id", "formBuy");

	let selectColor = document.createElement("select"); // On crée donc un élément select 
	selectColor.setAttribute("class", "form-control custom-select mb-4");
	selectColor.setAttribute("required", ""); // On oblige l'user à faire un choix

	let optionTitle = document.createElement("option"); // On crée une première option qui servira de titre-info de notre liste déroulante
	optionTitle.setAttribute("selected", ""); // On sélectionne donc cette option de base
	optionTitle.setAttribute("disabled", ""); // Qu'on désactive pour ne pas être choisie
	optionTitle.setAttribute("value", "");
	optionTitle.textContent = "Sélectionnez une couleur";

	let addProduct = document.createElement("button"); // On crée un élement button pour l'ajout au panier
	addProduct.setAttribute("class", "btn btn-primary btn-addProduct");
	addProduct.setAttribute("value", response._id); // On lui met comme valeur l'id de notre peluche qui servira à addToBasket() pour l'ajout
	addProduct.setAttribute("type", "submit");
	addProduct.textContent = "Ajouter au panier";

	sectionProducts.append(card); // On intègre tous ces éléments au DOM
	card.append(cardImage, cardBody);
	cardBody.append(cardTitle, cardDescription, cardPrice, form);
	form.append(selectColor, addProduct);
	selectColor.append(optionTitle);

	response.colors.forEach(function(color){ // On récupère toutes les couleurs de l'array colors avec une boucle forEach
		let optionColor = document.createElement("option");
		optionColor.setAttribute("value", color);
		optionColor.textContent = color;
		selectColor.append(optionColor); // On intègre toutes ces couleurs en option dans la liste déroulante
	});

	return response; // On retourne notre object peluche
})
.then(function(response){ // Si tout s'est bien affiché
	addToBasket(response); // On permet la fonction addToBasket

	let formBuy = document.getElementById("formBuy");
	formBuy.addEventListener("submit", function(e){ // On empêche le form d'actualiser la page pour gérer nous même le comportement
		e.preventDefault();
	}); 
})
.catch(function(error){ // Sinon on affiche un message d'erreur indiquant à l'user qu'il y a eu un problème
	let divAlert = document.createElement("div");
	divAlert.setAttribute("class", "alert alert-danger"); // On se sert des alert bootstrap
	divAlert.setAttribute("role", "alert"); // On pense à l'accessibilité
	divAlert.textContent = "Désolé, impossible d'afficher le produit demandé";
	document.getElementById("products").append(divAlert);
});

displayMiniBasket(); // On affiche quoi qu'il arrive le contenu du mini panier

document.getElementById("clean-basket").addEventListener("click", function(){ // On récupère le bouton pour vider le panier
	localStorage.clear(); // On clean le panier et donc le localStorage (On se le permet car on sait qu'il n'est utilisé que pour le panier)
	displayMiniBasket(); // On met à jour le contenu du panier dans le mini panier
});