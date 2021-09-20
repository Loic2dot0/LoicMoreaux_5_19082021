window.addEventListener("load", function() {
    var myOrder = JSON.parse(localStorage.order); // on récupère les donnée de la commande stocké dans le localStorage
    var myOrderId = myOrder.orderId;
    var myProducts = myOrder.products;
    
    for(let i in myProducts){ 
        totalBasket += myProducts[i].price; // recalcule du prix total du panier
    }
    
    localStorage.clear(); // on vide le Localstorage
    products = []; // on vide le tableau de produits
    basketCount(); // compteur du panier
    document.getElementById('orderId').innerHTML = myOrderId; // on affiche le n° de commande
    displayTotalPrice(); // on affiche le prix total de la commande
});