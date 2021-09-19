var totalBasket = 0; //variable pour le prix total du panier
var products = [];
if(localStorage.products){
    products = JSON.parse(localStorage.products);
}


function basketLength(){ // fonction qui returne le nombre d'élément dans le panier
    return products.length;
}


function basketCount(){ //fonction pour l'affichage du compteur du nombre d'article présent dans le panier
    let count = basketLength();
    let displayCount = document.getElementById("basketCount");
    if(count == 0){
        displayCount.innerHTML = "";
    }
    else{
        displayCount.innerHTML = count;
    }
}


function addBasket(){ //fonction pour ajouter un article dans le panier
    products.push(actualProduct._id);
    let productsLinear = JSON.stringify(products); //convertion du JSON en chaine de caractère
    localStorage.setItem('products', productsLinear); //ajout du produit dans le localstorage
    
    basketCount(); //mise a jour de l'affichage du compteur
}


function removeBasket(key){ // fonction pour la suppression d'un article du panier
    products.splice(key, 1);
    console.log(products);
    let productsLinear = JSON.stringify(products); //convertion du JSON en chaine de caractère
    localStorage.setItem('products', productsLinear);
    document.location.reload(); //Recharge la page pour actualiser le panier
}


function clearBasket(){ //fonction pour vider le panier
    products = [];
    let productsLinear = JSON.stringify(products); //convertion du JSON en chaine de caractère
    localStorage.setItem('products', productsLinear);
    document.location.reload(); //Recharge la page pour actualiser le panier
}


function displayBasket(){ // fonction d'affichage du panier
    if(basketLength() == 0){ //test si le panier est vide
        voidBasket(); //appel de la fonction en cas de panier vide
    }
    else{
        for(let i in products){
            let articleId = products[i];
            getProductBasket(articleId, i);
        }
    }
}


function getProductBasket(articleId, key){
    let urlProduct = urlApi + articleId;
    fetch(urlProduct) //Requete de type GET envoyer à l'API
        .then(function(res) { //test de la promise
            if (res.ok) {
                return res.json(); //convertie le résultat en données JSON
            }
        })
        .then(function(article) {
            displayRowBasket(article, key);
        })
        .catch(function(err) {
            console.log(err);
        });
}


function displayRowBasket(article, key){ // fonction d'affichage d'une ligne du panier
    let rowBasket = document.createElement("tr");
    rowBasket.innerHTML = ('<td>' + article.name + '</td><td>' + article._id +
                        '</td><td class="text-end">' + convertDisplayPrice(article.price) +
                        '</td><td class="text-end"><button class="btn btn-light" onclick="removeBasket(\'' + key
                        + '\')">Supprimer</button></td>');
    document.getElementById("tableTbodyBasket").appendChild(rowBasket);
    totalBasket += article.price; //mise a jour du prix total du panier
    displayTotalPrice();
}


function displayTotalPrice(){ // fonction d'affichage du prix total du panier
    document.getElementById("totalBasket").innerHTML = convertDisplayPrice(totalBasket);
}


function voidBasket(){ // fonction qui gère l'affichage en cas de panier vide
    document.getElementById("tableBasket").style.display = "none";
    document.getElementById("btnClear").style.visibility = "hidden";
    document.getElementById("btnSubmit").style.backgroundColor = "#f8f9fa";
    document.getElementById("btnSubmit").setAttribute("disabled", ""); //désactive le bouton de validation de commande
    document.getElementById("containerBasket").innerHTML = '<div class="col fs-5">Votre panier est tristement vide... <b class="fs-3">:\'(</b></div>';
}


window.addEventListener("load", function() { //attente de la fin de chargement de la page pour appeler les fonctions
    basketCount();
    if(document.getElementById("containerBasket")){  //vérifie si on est sur la page panier pour lancer l'affichage du panier
        displayBasket();
    }
});