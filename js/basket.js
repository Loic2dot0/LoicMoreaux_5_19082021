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