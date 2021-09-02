var myBasket = localStorage;
var totalBasket = 0;
var products = [];

function basketLength(){
    return myBasket.length;
}


function keyName(){
    return 'article' + basketLength();
}


function basketCount(){
    let count = basketLength();
    let displayCount = document.getElementById("basketCount");
    if(count == 0){
        displayCount.innerHTML = "";
    }
    else{
        displayCount.innerHTML = count;
    }
}


function addBasket(){
    let key = keyName();
    let productLinear = JSON.stringify(actualProduct);
    myBasket.setItem(key, productLinear);
    debug && console.log(key+ ' = ' +myBasket.getItem(key));
    basketCount();
}


function clearBasket(){
    myBasket.clear();
    basketCount();
    displayBasket();
}


function displayBasket(){
    if(basketLength() == 0){
        voidBasket();
    }
    else{
        for(let i = 0; i < basketLength(); i++){
            let article = myBasket.getItem(myBasket.key(i));
            article = JSON.parse(article);
            debug && console.log(myBasket.key(i));
            debug && console.log(article);
            displayRowBasket(article, myBasket.key(i));
            totalBasket += article.price;
            debug && console.log("Total panier :" + convertDisplayPrice(totalBasket));
        }
        displayTotalPrice();
    }
}


function displayRowBasket(article, key){
    let rowBasket = document.createElement("tr");
    rowBasket.innerHTML = ('<td>' + article.name + '</td><td>' + article._id +
                        '</td><td class="text-end">' + convertDisplayPrice(article.price) +
                        '</td><td class="text-end"><button class="btn btn-light" onclick="removeBasket(' + key
                        + ')">Supprimer</button></td>');
    document.getElementById("tableTbodyBasket").appendChild(rowBasket);
}


function displayTotalPrice(){
    document.getElementById("totalBasket").innerHTML = convertDisplayPrice(totalBasket);
}


function voidBasket(){
    document.getElementById("tableBasket").style.display = "none";
    document.getElementById("btnClear").style.visibility = "hidden";
    document.getElementById("btnSubmit").style.backgroundColor = "#f8f9fa";
    document.getElementById("btnSubmit").setAttribute("disabled", "");
    document.getElementById("containerBasket").innerHTML = '<div class="col fs-5">Votre panier est tristement vide... <b class="fs-3">:\'(</b></div>';
}


window.addEventListener("load", function() {
    basketCount();
    if(document.getElementById("containerBasket")){
        displayBasket();
    }
});