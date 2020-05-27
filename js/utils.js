function get(url){
	return new Promise((resolve, reject) => {
		let request = new XMLHttpRequest();
		request.open("GET", url);
		request.send();
		request.onreadystatechange = function(){
			if(this.readyState === 4){
				if(this.status === 200){
					resolve(JSON.parse(this.responseText));
				}else{
					reject(request);
				}
			}
		}
	})
}

function post(url, data){
	return new Promise((resolve, reject) => {
		let request = new XMLHttpRequest();
		request.open("POST", url);
		request.setRequestHeader("content-type", "application/json");
		request.send(JSON.stringify(data));
		request.onreadystatechange = function(){
			if(this.readyState === 4){
				if(this.status === 201){
					resolve(JSON.parse(this.responseText));
				}else{
					reject(request);
				}
			}
		}
	})
}

function displayMiniBasket(){
	let basket = document.getElementById("products-basket");
	basket.innerHTML = "";
	let productInBasket = JSON.parse(localStorage.getItem("panier"));
	if(productInBasket != null){
		for(let i = 0; i < productInBasket.length; i++){

			let listProduct = document.createElement("li");
			listProduct.setAttribute("class", "row");

			let nameProduct = document.createElement("p");
			nameProduct.setAttribute("class", "col-8 mb-0");
			nameProduct.textContent = productInBasket[i].name;

			let qdProduct = document.createElement("p");
			qdProduct.setAttribute("class", "col-4 mb-0");
			qdProduct.textContent = productInBasket[i].quantity;

			basket.append(listProduct);
			listProduct.append(nameProduct, qdProduct);
		}
	}
}

function addToBasket(response){
	let btnAddProduct = document.getElementsByClassName("btn-addProduct");
	for(let i = 0; i < btnAddProduct.length; i++){
		let idProduct = btnAddProduct[i].getAttribute("value");

		btnAddProduct[i].addEventListener("click", function(){
			let selectedProduct;
			if(Array.isArray(response)){
				selectedProduct = response.filter(product => product._id == idProduct).shift();
			}else{
				selectedProduct = response;
			}
			let basket = localStorage.getItem("panier");
			if(basket === null){
				selectedProduct.quantity = 1;
				localStorage.setItem("panier", `[${JSON.stringify(selectedProduct)}]`);
				displayMiniBasket();
			}else{
				basket = localStorage.getItem("panier");
				let basketParsed = JSON.parse(basket);
				let productInBasketParsed = basketParsed.filter(product => product._id == selectedProduct._id);
				if(productInBasketParsed.length == 0){
					selectedProduct.quantity = 1;
					basketParsed.push(selectedProduct);
					localStorage.clear();
					localStorage.setItem("panier", JSON.stringify(basketParsed));
					displayMiniBasket();
				}else{
					productInBasketParsed[0].quantity += 1;
					let basketWithoutThis = basketParsed.filter(product => product._id != selectedProduct._id);
					basketWithoutThis.push(productInBasketParsed[0]);
					localStorage.setItem("panier", JSON.stringify(basketWithoutThis));
					displayMiniBasket();
				}
			}
		})
	}
}

export { get, post, displayMiniBasket, addToBasket};