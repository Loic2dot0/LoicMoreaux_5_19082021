function connectApi(){
    fetch("http://localhost:3000/api/cameras") //Requete de type GET envoyer à l'API
        .then(function(res) { //test de la promise
            if (res.ok) {
                return res.json(); //convertie le résultat en données JSON
            }
        })
        .then(function(value) {
            console.log(value);
            displayListProducts(value); // appel de la fonction d'affichage de la liste des produits
        })
        .catch(function(err) {
            console.log(err);
        });
}


function displayListProducts(arrayListProduct){
    for(let i in arrayListProduct){ // boucle pour parcourir le tableau
        displayProduct(arrayListProduct[i]); //appel de la fonction d'affichage de la carte produit
    }
}


function displayProduct(product){
    let cardProduct = document.createElement("div");
    document.getElementById("listArticle").appendChild(cardProduct);
    cardProduct.classList.add("col", "mb-3");
    cardProduct.innerHTML = ('<div class="card"><img class="card-img-top" src="' + product.imageUrl + 
        '" alt="' + product.name + '"><div class="card-body"><h2 class="card-title">' + product.name +
        '</h2><p class="card-text">' + product.description + 
        '</p><p>' + product.price + '€</p><p class="text-center"><a href="produit.html?_id=' + product._id + 
        '" class="btn btn-info stretched-link">Voir le produit</a></p></div>');
}