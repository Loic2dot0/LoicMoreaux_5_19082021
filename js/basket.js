var totalBasket = 0; //variable pour le prix total du panier
var products = []; // variable pour stocker les id des produits du panier
if(localStorage.products){ //vérifie si la variable products existe déjà dans le localStorage
    products = JSON.parse(localStorage.products); // on récupère le contenu du localStorage
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
    products.push(actualProduct._id); // on ajoute l'id du produit dans le tableau products
    let productsLinear = JSON.stringify(products); //convertion du JSON en chaine de caractère
    localStorage.setItem('products', productsLinear); //ajout du produit dans le localstorage
    
    basketCount(); //mise a jour de l'affichage du compteur
}


function removeBasket(key){ // fonction pour la suppression d'un article du panier
    products.splice(key, 1); //supprime l'élement du tableau et réassigne les éléments
    let productsLinear = JSON.stringify(products); //convertion du JSON en chaine de caractère
    localStorage.setItem('products', productsLinear); //ajout du produit dans le localstorage
    document.location.reload(); //Recharge la page pour actualiser le panier
}


function clearBasket(){ //fonction pour vider le panier
    products = []; // on vide le tableau de produits
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
            getProductBasket(articleId, i); // appel de la fonction pour récupérer les article du panierd'après l'id
        }
    }
}


function getProductBasket(articleId, key){ //fonction pour récupérer les article du panierd'après l'id
    let urlProduct = urlApi + articleId;
    fetch(urlProduct) //Requete de type GET envoyer à l'API
        .then(function(res) { //test de la promise
            if (res.ok) {
                return res.json();
            }
        })
        .then(function(article) {
            displayRowBasket(article, key); // appel de la fonction d'affichage de la ligne du panier
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
    displayTotalPrice(); //appel de la fonction d'affichage du prix total du panier
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