let response;
function get(url){
	let request = new XMLHttpRequest();
	request.open("GET", url);
	request.send();
	request.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			response = JSON.parse(this.responseText);
		
		}
	}
}
get("http://localhost:3000/api/teddies");
document.getElementsByTagName("button")[0].addEventListener("click", function(){
	console.log(response);
	document.getElementsByTagName("div")[0].textContent = response[0].colors;

})