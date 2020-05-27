let orderId = localStorage.getItem("orderId");
let totalPrice = localStorage.getItem("totalPrice");
document.getElementById("costOrder").textContent = totalPrice + "€";
document.getElementById("idOrder").textContent = orderId;
localStorage.clear();