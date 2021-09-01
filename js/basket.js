var myBasket = localStorage;

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
    console.log(key+ ' = ' +myBasket.getItem(key));
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
            console.log(myBasket.key(i));
            console.log(article);
            let rowBasket = document.createElement("div");

        }
    }
}

function voidBasket(){
    document.getElementById("listBasket").innerHTML = '<div class="col fs-5">Votre panier est tristement vide... <b class="fs-3">:\'(</b></div>';
    document.getElementById("btnClear").style.visibility = "hidden";
    document.getElementById("btnSubmit").style.backgroundColor = "#f8f9fa";
    document.getElementById("btnSubmit").setAttribute("disabled", "");
}


window.addEventListener("load", function() {
    basketCount();
    if(document.getElementById("listBasket")){
        displayBasket();
    }
});