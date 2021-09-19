var myBasket = localStorage;
var totalBasket = 0; //variable pour le prix total du panier
var products = [];

function basketLength(){ // fonction qui returne le nombre d'élément dans le panier
    return myBasket.length;
}


function keyName(){ // fonction pour nommer les clés pour le localstorage
    let key = Math.floor(Math.random()*1000000); //génère une clé aléatoire
    while(myBasket.getItem(key)){ // Si la clé existe déjà on génère une nouvelle clé
        key = Math.floor(Math.random()*1000000);
    }
    return key;
}


function basketCount(init){ //fonction pour l'affichage du compteur du nombre d'article présent dans le panier
    let count = basketLength();
    if(init == 1){
        count= 0;
    }
    let displayCount = document.getElementById("basketCount");
    if(count == 0){
        displayCount.innerHTML = "";
    }
    else{
        displayCount.innerHTML = count;
    }
}


function addBasket(){ //fonction pour ajouter un article dans le panier
    let key = keyName();
    let productLinear = JSON.stringify(actualProduct); //convertion du JSON en chaine de caractère
    myBasket.setItem(key, productLinear); //ajout du produit dans le localstorage
    basketCount(); //mise a jour de l'affichage du compteur
}


function removeBasket(key){ // fonction pour la suppression d'un article du panier
    myBasket.removeItem(key); //supprime l'article du localstorage
    document.location.reload(); //Recharge la page pour actualiser le panier
}


function clearBasket(){ //fonction pour vider le panier
    myBasket.clear(); // vide le localstorage
    basketCount(); //mise a jour de l'affichage du compteur
    displayBasket(); //Actualisation de l'affichage du contenu du panier
}


function displayBasket(){ // fonction d'affichage du panier
    if(basketLength() == 0){ //test si le panier est vide
        voidBasket(); //appel de la fonction en cas de panier vide
    }
    else{
        for(let i = 0; i < basketLength(); i++){ //parcours du localstorage pour afficher le contenu
            let article = myBasket.getItem(myBasket.key(i)); // récupération d'un produit
            article = JSON.parse(article); // conversion de la chaine de caractère au format JSON
            displayRowBasket(article, myBasket.key(i)); // appel de la fonction d'affichage de la ligne du panier
            totalBasket += article.price; //mise a jour du prix total du panier
            products.push(article._id); //ajoute d'id de l'article dans un array pour la validation de la commande
        }
        displayTotalPrice(); // appel de la fonction d'affichage du prix total du panier
    }
}


function displayRowBasket(article, key){ // fonction d'affichage d'une ligne du panier
    let rowBasket = document.createElement("tr");
    rowBasket.innerHTML = ('<td>' + article.name + '</td><td>' + article._id +
                        '</td><td class="text-end">' + convertDisplayPrice(article.price) +
                        '</td><td class="text-end"><button class="btn btn-light" onclick="removeBasket(\'' + key
                        + '\')">Supprimer</button></td>');
    document.getElementById("tableTbodyBasket").appendChild(rowBasket);
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