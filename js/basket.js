import { post } from "./utils.js";
let productsInBasket;
let totalPrice = 0;
function displayBasket(){
	productsInBasket = JSON.parse(localStorage.getItem("panier"));
	let sectionBasket = document.getElementById("basket");
	sectionBasket.textContent = "";
	let formBasket = document.getElementById("form-basket");
	formBasket.style.display = "none";

	if(productsInBasket !== null){
		totalPrice = 0;
		let basketHeading = document.createElement("h2");
		basketHeading.textContent = "Panier";
		sectionBasket.append(basketHeading);
		productsInBasket.forEach(function(product){

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

			let suppProduct = document.createElement("btn");
			suppProduct.setAttribute("class", "btn btn-danger btn-suppProduct pr-md-2 mb-2 mb-md-0");
			suppProduct.setAttribute("value", product._id);
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

			let suppButton = Array.from(document.getElementsByClassName("btn-suppProduct"));
			suppButton.forEach(function(button){
				button.addEventListener("click", function(e){
					let idProduct = e.target.getAttribute("value");
					productsInBasket = productsInBasket.filter((product) => product._id !== idProduct);
					localStorage.clear();
					if(productsInBasket.length > 0){
						localStorage.setItem("panier", JSON.stringify(productsInBasket));
					}
					displayBasket();
				});
			});
			totalPrice += product.price * parseFloat(product.quantity);
		});

		let totalPriceP = document.createElement("p");
		totalPriceP.setAttribute("class", "h3 text-center mt-2");
		totalPriceP.textContent = "Coût total: " + totalPrice + "€";
		sectionBasket.append(totalPriceP);

		formBasket.style.display = "block";

	}else{
		let divAlert = document.createElement("div");
		divAlert.setAttribute("class", "alert alert-info");
		divAlert.setAttribute("role", "alert");
		divAlert.textContent = "Votre panier est vide";
		document.getElementById("basket").append(divAlert);
	}
}
displayBasket();

let inputOrder = document.getElementsByTagName("input");
document.getElementById("confirmOrder").addEventListener("click", function(e){
	e.preventDefault();
	let contact = {
		firstName: inputOrder[0].value,
		lastName: inputOrder[1].value,
		address: inputOrder[2].value,
		city: inputOrder[3].value,
		email: inputOrder[4].value
	};
	let basket = JSON.parse(localStorage.getItem("panier"));
	let products = [];
	basket.forEach(function(product){
		products.push(product._id);
	});
	let data = { contact, products };
	post("http://localhost:3000/api/teddies/order", data)
	.then(function(response){
		let orderId = response.orderId;
		localStorage.clear();
		localStorage.setItem("orderId", orderId);
		localStorage.setItem("totalPrice", totalPrice);
		window.location.href = "./confirm.html";
	}).catch(function(error){
		let divAlert = document.createElement("div");
		divAlert.setAttribute("class", "alert alert-danger mt-2");
		divAlert.setAttribute("role", "alert");
		divAlert.textContent = "Désolé, impossible de faire suivre votre demande, veuillez réessayer plus tard";
		document.getElementById("form-basket").append(divAlert);
	});
});