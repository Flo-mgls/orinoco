function get(url){
	return new Promise((resolve, reject) => {
		let request = new XMLHttpRequest();
		request.open("GET", url, true);
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

function displayBasket(){
	let basket = document.getElementById("products-basket");
	basket.innerHTML = "";

	for(let i = 0; i < localStorage.length; i++){
		if (localStorage.key(i).startsWith('{"colors"')){
			let listProduct = document.createElement("li");
			listProduct.setAttribute("class", "row");

			let nameProduct = document.createElement("p");
			nameProduct.setAttribute("class", "col-8 mb-0");
			nameProduct.textContent = JSON.parse(localStorage.key(i)).name;

			let qdProduct = document.createElement("p");
			qdProduct.setAttribute("class", "col-4 mb-0");
			qdProduct.textContent = localStorage.getItem(localStorage.key(i));

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
			let storedProduct = localStorage.getItem(JSON.stringify(selectedProduct));
			if(storedProduct != null){
				localStorage.setItem(JSON.stringify(selectedProduct), `${parseFloat(storedProduct) + 1}`);
				displayBasket();
			}else{
				localStorage.setItem(JSON.stringify(selectedProduct), "1");
				displayBasket();
			}
		})
	}
}