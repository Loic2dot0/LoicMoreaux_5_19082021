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
}

function displayBasket(){
    if(basketLength() == 0){
        document.getElementById("listBasket").innerHTML = '<div class="col fs-5">Votre panier est tristement vide... <b class="fs-3">:\'(</b></div>';
        document.getElementById("btnClear").style.visibility = "hidden";
    }
}