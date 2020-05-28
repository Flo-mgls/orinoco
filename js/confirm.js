let orderId = localStorage.getItem("orderId");
let totalPrice = localStorage.getItem("totalPrice");
console.log(document.getElementById("costOrder"));
document.getElementById("costOrder").textContent = totalPrice + "€";
document.getElementById("idOrder").textContent = orderId;
localStorage.clear();