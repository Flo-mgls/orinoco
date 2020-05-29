import {get, displayMiniBasket, addToBasket} from "./utils.js"; // On importe les fonctions nécessaires

get("http://localhost:3000/api/teddies/") // On fait une requête pour obtenir les peluches
.then(function(response) { // Si la requête a fonctionné
	response.forEach(function(product){ // On affiche chaque objet Peluche (product) dans le DOM
		let sectionProducts = document.getElementById("products"); // On récupère la section qui contiendra toutes nos peluches

		let card = document.createElement("article"); // On crée un article pour chaque produit et l'affiche sous forme de carte bootstrap
		card.setAttribute("class", "card"); // On ajoute donc la class card

		let cardRow = document.createElement("div"); // On s'occupe de la mise en page avec des row et col (bootstrap grid)
		cardRow.setAttribute("class", "row align-items-center");

		let imgCol = document.createElement("div");
		imgCol.setAttribute("class", "col-md-4");

		let cardImage = document.createElement("img"); // On crée une balise image
		cardImage.setAttribute("class", "card-img");
		cardImage.setAttribute("src", product.imageUrl); // On lui défini son attribut src comme étant la propriété imageUrl de l'objet
		cardImage.setAttribute("alt", ""); // On oublie pas les lecteurs d'écran pour l'accessibilité (présent pour éviter la lecture du nom du fichier mais vide car toutes les infos sont déjà présentes)

		let bodyCol = document.createElement("div");
		bodyCol.setAttribute("class", "col-md-8");

		let cardBody = document.createElement("div"); // On crée un div qui contiendra le corps de notre carte
		cardBody.setAttribute("class", "card-body");

		let cardTitle = document.createElement("h2"); // On crée un h2
		cardTitle.setAttribute("class", "card-title");
		cardTitle.textContent = product.name; // On lui défini son texte comme étant la propriété name de notre objet

		let cardDescription = document.createElement("p"); // On crée un élément p qui sera la description
		cardDescription.setAttribute("class", "card-text");
		cardDescription.textContent = product.description; // On lui attribut donc la propriété description de notre object comme texte

		let cardPrice = document.createElement("p"); // Un autre élément p qui sera le prix
		cardPrice.setAttribute("class", "card-text");
		cardPrice.textContent = `${product.price} €`; // On lui attribut la propriété price de notre object

		let addProduct = document.createElement("button"); // On crée un élément button qui servira à ajouter au panier
		addProduct.setAttribute("class", "btn btn-primary btn-addProduct"); // On s'occupe de son design avec bootstrap
		addProduct.setAttribute("value", product._id); // On défini sa valeur comme étant l'id de notre object, qui sera récupéré pour l'ajout au panier lors du click
		addProduct.textContent = "Ajouter au panier";
		addProduct.style.zIndex = "2"; // z-index défini à 2 pour être par dessus le stretched-link permettant d'aller à la fiche produit
		addProduct.style.position = "relative"; // position relative nécessaire pour qu'il soit au dessus

		let displayProduct = document.createElement("a"); // On crée un élément a qui mènera au produit en question
		displayProduct.setAttribute("class", "stretched-link goto-product"); // Stretched-link permet d'avoir un lien qui s'étend à son parent
		displayProduct.setAttribute("href", `./product.html?id=${product._id}`); // Son href est notre page product.html avec un paramètre: l'id de notre object

		sectionProducts.append(card); // On se charge d'intégré tous les éléments crées précédemment au DOM avec append
		card.append(cardRow, displayProduct);
		cardRow.append(imgCol, bodyCol);
		imgCol.append(cardImage);
		bodyCol.append(cardBody);
		cardBody.append(cardTitle, cardDescription, cardPrice, addProduct);
	});

	return response; // On retourne nos objects
})
.then(function(response){ // Si tout s'est bien affiché
	addToBasket(response); // On permet la fonction addToBasket 
})
.catch(function(error){ // Sinon on affiche un message d'erreur indiquant à l'user qu'il y a eu un problème
	let divAlert = document.createElement("div");
	divAlert.setAttribute("class", "alert alert-danger"); // On se sert des alert bootstrap
	divAlert.setAttribute("role", "alert"); // On pense à l'accessibilité
	divAlert.textContent = "Désolé, impossible d'afficher les produits";
	document.getElementById("products").append(divAlert);
});

displayMiniBasket(); // On affiche quoi qu'il arrive le contenu du mini panier

document.getElementById("clean-basket").addEventListener("click", function(){ // On récupère le bouton pour vider le panier
	localStorage.clear(); // On clean le panier et donc le localStorage (On se le permet car on sait qu'il n'est utilisé que pour le panier)
	displayMiniBasket(); // On met à jour le contenu du panier dans le mini panier
});





