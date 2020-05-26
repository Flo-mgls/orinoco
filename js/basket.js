let productsInBasket;
function displayBasket(){
	productsInBasket = JSON.parse(localStorage.getItem("panier"));
	let sectionBasket = document.getElementById("basket");
	sectionBasket.innerHTML = "";
	if(productsInBasket != null){
		for(let i = 0; i < productsInBasket.length; i++){

			let card = document.createElement("article");
			card.setAttribute("class", "card mb-2 mb-md-0");

			let cardRow = document.createElement("div");
			cardRow.setAttribute("class", "row align-items-center");

			let imgCol = document.createElement("div");
			imgCol.setAttribute("class", "col-md-4 col-2")

			let cardImage = document.createElement("img");
			cardImage.setAttribute("class", "card-img");
			cardImage.setAttribute("src", productsInBasket[i].imageUrl);
			cardImage.setAttribute("alt", "image du produit");

			let bodyCol = document.createElement("div");
			bodyCol.setAttribute("class", "col-md-6 col-8");

			let cardBody = document.createElement("div");
			cardBody.setAttribute("class", "card-body text-center text-md-left");

			let cardTitle = document.createElement("h2");
			cardTitle.setAttribute("class", "card-title");
			cardTitle.textContent = productsInBasket[i].name;

			let cardPrice = document.createElement("p");
			cardPrice.setAttribute("class", "card-text");
			cardPrice.textContent = `Coût/unité: ${productsInBasket[i].price} €`;

			let cardQuantity = document.createElement("p");
			cardQuantity.setAttribute("class", "card-text");
			cardQuantity.textContent = `Quantité: ${productsInBasket[i].quantity}`;

			let buttonCol = document.createElement("div");
			buttonCol.setAttribute("class", "col-md-2 text-center");

			let suppProduct = document.createElement("btn");
			suppProduct.setAttribute("class", "btn btn-danger btn-suppProduct mr-md-2 mb-2 mb-md-0");
			suppProduct.setAttribute("value", productsInBasket[i]._id);
			suppProduct.textContent = "Supprimer du panier"
			suppProduct.style.zIndex = "2";
			suppProduct.style.position = "relative";

			let displayProduct = document.createElement("a");
			displayProduct.setAttribute("class", "stretched-link goto-product");
			displayProduct.setAttribute("href", `./product.html?id=${productsInBasket[i]._id}`);

			sectionBasket.append(card);
			card.append(cardRow,);
			cardRow.append(imgCol, bodyCol, buttonCol);
			imgCol.append(cardImage);
			bodyCol.append(cardBody);
			buttonCol.append(suppProduct)
			cardBody.append(cardTitle, cardPrice, cardQuantity, displayProduct);

			let suppButton = document.getElementsByClassName("btn-suppProduct");

			for(let button of suppButton){
				button.addEventListener("click", function(e){
					let idProduct = e.target.getAttribute("value");
					productsInBasket = productsInBasket.filter(product => product._id != idProduct);
					localStorage.clear();
					if(productsInBasket.length > 0){
						localStorage.setItem("panier", JSON.stringify(productsInBasket));
					}
					displayBasket();
				})
			}
		}
	}else{
		let divAlert = document.createElement("div")
		divAlert.setAttribute("class", "alert alert-info");
		divAlert.setAttribute("role", "alert");
		divAlert.textContent = "Votre panier est vide";
		document.getElementById("basket").append(divAlert);
	}
}
displayBasket();




