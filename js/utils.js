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
		if (localStorage.key(i).startsWith('[{"colors"')){
			let listProduct = document.createElement("li");
			listProduct.setAttribute("class", "row");

			let nameProduct = document.createElement("p");
			nameProduct.setAttribute("class", "col-8 mb-0");
			nameProduct.textContent = JSON.parse(localStorage.key(i))[0].name;
			let qdProduct = document.createElement("p");
			qdProduct.setAttribute("class", "col-4 mb-0");
			qdProduct.textContent = localStorage.getItem(localStorage.key(i));

			basket.append(listProduct);
			listProduct.append(nameProduct, qdProduct);
		}
	}

}

