import { post } from "./utils.js"; // On importe les fonctions nécessaires

let productsInBasket; // On initialise une variable qui contiendra notre panier
let totalPrice = 0; // On initialise notre prix total

function displayBasket(){ // Fonction servant à afficher notre panier dans la page product
	productsInBasket = JSON.parse(localStorage.getItem("panier")); // On récupère notre panier que l'on parse pour le traiter
	let sectionBasket = document.getElementById("basket"); // On récupère la section qui accueillera nos produits
	sectionBasket.textContent = ""; // On s'assure qu'elle soit vide
	let formBasket = document.getElementById("form-basket"); // On récupère notre formulaire
	formBasket.style.display = "none"; // Que l'on cache de base (si le panier est vide)

	if(productsInBasket !== null){ // Si le panier existe et donc n'est pas vide
		totalPrice = 0;
		let basketHeading = document.createElement("h2"); // On crée et intègre le titre de notre section panier
		basketHeading.textContent = "Panier";
		sectionBasket.append(basketHeading);

		productsInBasket.forEach(function(product){ // Pour chaque produit dans le panier: On les affiche sous forme de carte bootstrap

			let card = document.createElement("article");
			card.setAttribute("class", "card mb-2 mb-md-0 container-fluid");

			let cardRow = document.createElement("div");
			cardRow.setAttribute("class", "row align-items-center");

			let imgCol = document.createElement("div");
			imgCol.setAttribute("class", "col-md-4 col-2");

			let cardImage = document.createElement("img");
			cardImage.setAttribute("class", "card-img");
			cardImage.setAttribute("src", product.imageUrl);
			cardImage.setAttribute("alt", "");

			let bodyCol = document.createElement("div");
			bodyCol.setAttribute("class", "col-md-6 col-8");

			let cardBody = document.createElement("div");
			cardBody.setAttribute("class", "card-body text-center text-md-left");

			let cardTitle = document.createElement("h2");
			cardTitle.setAttribute("class", "card-title");
			cardTitle.textContent = product.name;

			let cardPrice = document.createElement("p");
			cardPrice.setAttribute("class", "card-text");
			cardPrice.textContent = `Coût/unité: ${product.price} €`;

			let cardQuantity = document.createElement("p");
			cardQuantity.setAttribute("class", "card-text");
			cardQuantity.textContent = `Quantité: ${product.quantity}`;

			let buttonCol = document.createElement("div");
			buttonCol.setAttribute("class", "col-md-2 text-center");

			let suppProduct = document.createElement("btn"); // On crée un bouton qui servira à supprimer l'article en question
			suppProduct.setAttribute("class", "btn btn-danger btn-suppProduct pr-md-2 mb-2 mb-md-0");
			suppProduct.setAttribute("value", product._id); // Grace à sa valeur = à l'id du produit en question que l'on récupèrera
			suppProduct.textContent = "Supprimer du panier";
			suppProduct.style.zIndex = "2";
			suppProduct.style.position = "relative";

			let displayProduct = document.createElement("a");
			displayProduct.setAttribute("class", "stretched-link goto-product");
			displayProduct.setAttribute("href", `./product.html?id=${product._id}`);

			sectionBasket.append(card);
			card.append(cardRow);
			cardRow.append(imgCol, bodyCol, buttonCol);
			imgCol.append(cardImage);
			bodyCol.append(cardBody);
			buttonCol.append(suppProduct);
			cardBody.append(cardTitle, cardPrice, cardQuantity, displayProduct);

			let suppButton = Array.from(document.getElementsByClassName("btn-suppProduct")); // On récupère les boutons de suppresion que l'on transforme en vrai array (pour utiliser forEach)
			suppButton.forEach(function(button){ // Pour chacun de ces boutons
				button.addEventListener("click", function(e){ // Au click 
					let idProduct = e.target.getAttribute("value"); // On défini une variable comme étant la valeur du bouton et donc l'id du produit à supprimer
					productsInBasket = productsInBasket.filter((product) => product._id !== idProduct); // On filtre notre panier pour retirer le produit ayant cet id
					localStorage.clear(); // On clean le panier
					if(productsInBasket.length > 0){ // Si ce n'était pas le seul produit dans le panier
						localStorage.setItem("panier", JSON.stringify(productsInBasket)); // Alors on réinitialise le panier avec le changement prit en compte
				}
					displayBasket(); // On réaffiche le nouveau panier
				});
			});
			totalPrice += product.price * parseFloat(product.quantity); // On assigne a totalPrice le prix * quatité (que l'on tranforme en Number) de chqua produit 
		});

		let totalPriceP = document.createElement("p"); // On crée et intègre au DOM le p qui contiendra ce totalPrice
		totalPriceP.setAttribute("class", "h3 text-center mt-2");
		totalPriceP.textContent = "Coût total: " + totalPrice + "€";
		sectionBasket.append(totalPriceP);

		formBasket.style.display = "block"; // On peut alors afficher le formulaire 

	}else{ // Si le produit est vide
		let divAlert = document.createElement("div");
		divAlert.setAttribute("class", "alert alert-info");
		divAlert.setAttribute("role", "alert");
		divAlert.textContent = "Votre panier est vide"; // On le précise à l'user
		document.getElementById("basket").append(divAlert);
	}
}

displayBasket(); // On affiche le panier dans le DOM en lançant cette fonction

let inputOrder = document.getElementsByTagName("input"); // On récupère tous les input de la page (donc ceux concernant le formulaire de commande)
let formOrder = document.getElementById("formOrder"); // On récupère le formulaire

formOrder.addEventListener("submit", function(e){ // Lorsque le formulaire est envoyé
	e.preventDefault(); // On l'empêche de changer de page pour le rediriger nous-même
});
document.getElementById("confirmOrder").addEventListener("click", function(){ // A l'envoi

	if(formOrder.checkValidity()){
		let contact = { // On crée un object contact: les propriété ayant comme valeur chacune des valeurs de nos input
			firstName: inputOrder[0].value,
			lastName: inputOrder[1].value,
			address: inputOrder[2].value,
			city: inputOrder[3].value,
			email: inputOrder[4].value
		};

		let basket = JSON.parse(localStorage.getItem("panier")); // On récupère notre panier
		let products = []; // On initialise un tableau qui contiendra les id des produits acheté et qu'on enverra au back

		basket.forEach(function(product){ // Pour chaque produits dans le panier
		products.push(product._id); // On push l'id dans le tableau à envoyer
		});

		let data = { contact, products }; // On défini la data à envoyer

		post("http://localhost:3000/api/teddies/order", data) // On envoi data au back
		.then(function(response){ // Si tout s'est bien passé on récupère la réponse du serveur
			let orderId = response.orderId; // On récupère l'id de commande présent dans la réponse
			localStorage.clear(); // On clean le panier pour les futur commandes
			localStorage.setItem("orderId", orderId); // On stock dans le localStorage notre id de commande
			localStorage.setItem("totalPrice", totalPrice); // Et le prix total
			window.location.href = "./confirm.html"; // On renvoi l'user vers la page de confirmation de commande
		})
		.catch(function(error){ // S'il y a eu une erreur
			if(document.getElementById("alertError") === null){ // On s'assure l'alert n'a pas déjà été crée pour éviter le spam
				let divAlert = document.createElement("div");
				divAlert.setAttribute("class", "alert alert-danger mt-2");
				divAlert.setAttribute("role", "alert");
				divAlert.setAttribute("id", "alertError");
				divAlert.textContent = "Désolé, impossible de faire suivre votre demande, veuillez réessayer plus tard"; // On le précise à l'user
				document.getElementById("form-basket").append(divAlert);
			}
		});
	}
});