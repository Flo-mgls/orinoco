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

		let addProduct = document.createElement("btn");
		addProduct.setAttribute("class", "btn btn-primary btn-addProduct");
		addProduct.setAttribute("value", response[i]._id);
		addProduct.textContent = "Ajouter au panier"
		addProduct.style.zIndex = "2";
		addProduct.style.position = "relative";

		let displayProduct = document.createElement("a");
		displayProduct.setAttribute("class", "stretched-link goto-product");
		displayProduct.setAttribute("href", `./product.html?${response[i]._id}`);
		displayProduct.setAttribute("value", response[i]._id);

		sectionProducts.append(card);
		card.append(cardRow, displayProduct);
		cardRow.append(imgCol, bodyCol);
		imgCol.append(cardImage);
		bodyCol.append(cardBody);
		cardBody.append(cardTitle, cardDescription, cardPrice, addProduct,);
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
	divAlert.textContent = "Désolé, impossible d'afficher les produits";
	document.getElementById("products").append(divAlert);
})

displayBasket();

document.getElementById("clean-basket").addEventListener("click", function(){
	localStorage.clear();
	displayBasket();
})





