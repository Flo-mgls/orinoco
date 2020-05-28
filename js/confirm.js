let orderId = localStorage.getItem("orderId"); // On récupère l'id de la commande enregistrée dans le localStorage
let totalPrice = localStorage.getItem("totalPrice"); // On récupère le prix total de la commande enregistrée dans le localStorage

document.getElementById("costOrder").textContent = totalPrice + "€"; // On les affiche tout deux dans le DOM 
document.getElementById("idOrder").textContent = orderId;

localStorage.clear(); // On clean le localStorage pour les futurs commandes