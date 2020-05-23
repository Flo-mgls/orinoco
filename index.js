let request = new XMLHttpRequest();
request.open("GET", "http://localhost:3000/api/teddies/");
request.send();
request.onreadystatechange = function(){
	if(this.readyState == 4 && this.status == 200){
		let response = JSON.parse(this.responseText);
		console.log(response);
	}
}