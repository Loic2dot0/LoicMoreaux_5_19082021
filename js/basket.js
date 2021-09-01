var myBasket = localStorage;

function basketLength(){
    return myBasket.length;
}

function keyName(){
    return 'article' + basketLength();
}