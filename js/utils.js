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

export {get};