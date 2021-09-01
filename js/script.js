var actualProduct = 0;

//page Index
function connectApi(){
    fetch("http://localhost:3000/api/cameras") //Requete de type GET envoyer à l'API
        .then(function(res) { //test de la promise
            if (res.ok) {
                return res.json(); //convertie le résultat en données JSON
            }
        })
        .then(function(value) {
            console.log("Contenu de l'API V");
            console.log(value);
            displayListProducts(value); // appel de la fonction d'affichage de la liste des produits
        })
        .catch(function(err) {
            console.log('catch erreur : ' +err);
        });
}


function displayListProducts(arrayListProduct){
    for(let i in arrayListProduct){ // boucle pour parcourir le tableau
        displayCardProduct(arrayListProduct[i]); //appel de la fonction d'affichage de la carte produit
    }
}


function displayCardProduct(product){
    let cardProduct = document.createElement("div");
    cardProduct.classList.add("col", "mb-3");
    cardProduct.innerHTML = ('<div class="card"><img class="card-img-top" src="' + product.imageUrl + 
        '" alt="' + product.name + '"><div class="card-body"><h2 class="card-title">' + product.name +
        '</h2><p class="card-text">' + product.description + 
        '</p><p>' + convertDisplayPrice(product.price) + '</p><p class="text-center"><a href="produit.html?_id=' + product._id + 
        '" class="btn btn-info stretched-link">Voir le produit</a></p></div>');
        document.getElementById("listArticle").appendChild(cardProduct);
}


function convertDisplayPrice(oldPrice){ // convertion de l'affichage du prix
    let price = oldPrice /100;
    return Intl.NumberFormat('fr-FR', {style: 'currency', currency: 'EUR'}).format(price);
}


//Page produit
function getProduct(){ // fonction principale de la page produit
    let url = getUrl();
    let idProduct = getIdProduct(url);
    console.log('Id produit : ' +idProduct);
    let urlProduct = "http://localhost:3000/api/cameras/" + idProduct;
    console.log('url du prduit : ' +urlProduct);
    getApiProduct(urlProduct);
  }


function getUrl(){ // fonction pour récupérer l'url de la page actuelle
    let url = new URL(window.location.href);
    console.log('url de la page actuelle : ' +url);
    return url;
}


function getIdProduct(url){ //fonction de récupération de l'id du produit
    if(url.searchParams.has("_id")){ // Recherche du paramètre "_id" dans l'url
        return url.searchParams.get("_id"); //retourne la l'id du produit
    }
    else errorMessage("productPage", "La page demandée n'existe pas ou plus"); //Si le paramètre "_id" n'existe pas message d'erreur
}


function getApiProduct(urlProduct){
    fetch(urlProduct) //Requete de type GET envoyer à l'API
        .then(function(res) { //test de la promise
            if (res.ok) {
                return res.json(); //convertie le résultat en données JSON
            }
        })
        .then(function(value) {
            actualProduct = value;
            console.log('Produit actuel V');
            console.log(actualProduct);
            displayProduct(value);
        })
        .catch(function(err) {
            console.log(err);
        });
}


function displayProduct(product){ //Affichage de la fiche produit complète
    document.getElementById("divImg").innerHTML = '<img src="' + product.imageUrl + '" class="img-fluid rounded-start" alt="' + product.name + '"></img>'
    document.querySelector("h1.card-title").textContent = product.name;
    document.querySelector("p.card-text").textContent = product.description;
    document.querySelector("p.h3").textContent = convertDisplayPrice(product.price);

    for(let i in product.lenses){ // boucle pour parcourir le tableau
        let lensesOption = document.createElement("option");       
        lensesOption.setAttribute("value", product.lenses[i]);
        lensesOption.innerHTML = product.lenses[i];
        document.getElementById("lenses").appendChild(lensesOption);
    }
}



function errorMessage(idParent, message){ //Fonction de message d'erreur
    let divError = document.createElement("div");
    divError.classList.add("alert", "alert-danger");
    divError.setAttribute("role", "alert");
    divError.innerHTML = message;
    document.getElementById(idParent).appendChild(divError);
}


window.addEventListener("load", function() {
    if(document.getElementById("listArticle")){
        connectApi();
    }
    if(document.getElementById("productPage")){
        getProduct();
    }
});