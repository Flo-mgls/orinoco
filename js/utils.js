function get(url) { // Fonction pour récupérer les données du back en asynchrone
    return new Promise((resolve, reject) => { // La fonction renvoie une promesse pour éviter les callback
        let request = new XMLHttpRequest(); // On crée un nouvel objet XMLHttpRequest
        request.open("GET", url); // On initialise la requête en précisant le type et l'url cible
        request.send(); // On envoie la requête
        request.onreadystatechange = function() { // A chaque changement d'état de la propriété onreadystatechange
            if (this.readyState === 4) { // Si l'état vaut 4 (=DONE) la requête est terminée
                if (this.status === 200) { // On check aussi le status: si il est = 200 -> la requête est un succès
                    resolve(JSON.parse(this.responseText)); // On resolve donc la promesse en envoyant la réponse, donc nos objets
                } else {
                    reject(request); // Sinon on la rejette et on passe en argument la requête pour éventuellement récupérer les codes erreurs
                }
            }
        }
    })
}

function post(url, data) { // Fonction pour envoyer les données au back en asynchrone
    return new Promise((resolve, reject) => { // La fonction renvoie une promesse pour éviter les callback
        let request = new XMLHttpRequest(); // On crée un nouvel objet XMLHttpRequest
        request.open("POST", url); // On initialise la requête en précisant le type et l'url cible
        request.setRequestHeader("content-type", "application/json"); // On précise ce que l'on envoi
        request.send(JSON.stringify(data)); // On envoie la requête que l'on stringify
        request.onreadystatechange = function() { // A chaque changement d'état de la propriété onreadystatechange
            if (this.readyState === 4) { // Si l'état vaut 4 (=DONE) la requête est terminée
                if (this.status === 201) { // On check aussi le status: si il est = 201 -> la requête est un succès et une ressource a été crée
                    resolve(JSON.parse(this.responseText)); // On resolve donc la promesse en récupérant la réponse, notamment l'id de commande
                } else {
                    reject(request); // Sinon on la rejette et on passe en argument la requête pour éventuellement récupérer les codes erreurs
                }
            }
        }
    })
}

function displayMiniBasket() { // Fonction servant à afficher le mini panier dans le Header
    let basket = document.getElementById("products-basket"); // On récupère le contenant de nos produits affichés
    basket.innerHTML = ""; // On s'assure qu'il soit vide ou le vide pour le mettre à jour
    let productInBasket = JSON.parse(localStorage.getItem("panier")); // On récupère nos produits dans le localStorage 
    if (productInBasket != null) { // Si le panier existe bien et donc n'est pas vide: on les affiches
        for (let i = 0; i < productInBasket.length; i++) { // Pour chaque produit

            let listProduct = document.createElement("li"); // On crée une liste
            listProduct.setAttribute("class", "row");

            let nameProduct = document.createElement("p");
            nameProduct.setAttribute("class", "col-8 mb-0");
            nameProduct.textContent = productInBasket[i].name; // On affiche la propriété name de chaque object produit dans le panier

            let qdProduct = document.createElement("p");
            qdProduct.setAttribute("class", "col-4 mb-0");
            qdProduct.textContent = productInBasket[i].quantity; // On affiche la propriété quantity de chaque object produit dans le panier

            basket.append(listProduct);
            listProduct.append(nameProduct, qdProduct);
        }
    }
}

function addToBasket(response) { // Fonction servant à l'ajout au panier lors du click sur un bouton
    let btnAddProduct = document.getElementsByClassName("btn-addProduct"); // On récupère les boutons ayant la class btn-addProduct
    let pathName = window.location.pathname; // On défini sur quelle page nous sommes
    let form = document.getElementsByTagName("form"); // Et on récupère le potentiel form de la page actuelle

    for (let i = 0; i < btnAddProduct.length; i++) { // Pour chacun de ses boutons
        let idProduct = btnAddProduct[i].getAttribute("value"); // On récupère leur valeur qui est l'id de l'object qu'ils permettent d'ajouter au panier

        btnAddProduct[i].addEventListener("click", function() { // Au click sur un bouton
            if ((pathName.startsWith("/product") && form[0].checkValidity()) || pathName.startsWith("/index")) { // Si on est sur la page product on doit vérifier que l'user ait choisi une couleur
                let selectedProduct; // On défini une variable qui contiendra l'object en question
                if (Array.isArray(response)) { // Si le click vient de l'index response est un tableau de tous les produits, s'il vient d'une page produit en particulier ce n'est pas un tableau mais juste un objet
                    selectedProduct = response.filter(product => product._id == idProduct).shift(); // Si c'est un tableau: on récupère dans celui-ci l'object ayant un id = a la valeur de notre bouton 
                } else {
                    selectedProduct = response; // Sinon on a juste stocker directement le seul oject à notre disposition
                }
                let basket = localStorage.getItem("panier"); // On récupère le panier

                if (basket === null) { // S'il est inexistant
                    selectedProduct.quantity = 1; // On ajoute une propriété quantity = 1 à notre object 
                    localStorage.setItem("panier", `[${JSON.stringify(selectedProduct)}]`); // On crée notre panier et lui ajoute cet object sous forme de string
                    displayMiniBasket(); // On affiche le panier mis à jour
                } else { // Si le panier existe
                    let basketParsed = JSON.parse(basket); // On transorme le panier en object/array pour le traiter
                    let productInBasketParsed = basketParsed.filter(product => product._id == selectedProduct._id); // On récupère dans celui-ci l'object qui doit y être ajouter
                    if (productInBasketParsed.length == 0) { // Si il n'existe pas
                        selectedProduct.quantity = 1; // On crée sa propriété quantity et la défini sur 1
                        basketParsed.push(selectedProduct); // On ajoute au panier récupéré notre object
                        localStorage.setItem("panier", JSON.stringify(basketParsed)); // Et on crée un nouveau panier avec l'ajout de notre object prit en compte
                        displayMiniBasket(); // On affiche le panier mis à jour
                    } else { // Si l'object existait déjà dans le panier
                        productInBasketParsed[0].quantity += 1; // On lui ajoute 1 à sa propriété quantity
                        let basketWithoutThis = basketParsed.filter(product => product._id != selectedProduct._id); // On crée un tableau comportant notre panier SANS cet object
                        basketWithoutThis.push(productInBasketParsed[0]); // On ajoute à ce tableau notre object ayant une quantity += 1
                        localStorage.setItem("panier", JSON.stringify(basketWithoutThis)); // Et on crée un nouveau panier avec l'ajout de notre object prit en compte
                        displayMiniBasket(); // On affiche le panier mis à jour
                    }
                }
            }
        })
    }
}
// On exporte nos fonctions
export {
    get,
    post,
    displayMiniBasket,
    addToBasket
};