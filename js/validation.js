var myOrder = JSON.parse(myBasket.order);
var myOrderId = myOrder.orderId;
var myProducts = myOrder.products;


window.addEventListener("load", function() {
    for(let i in myProducts){
        totalBasket += myProducts[i].price;
    }
    
    myBasket.clear();
    basketCount(1);
    document.getElementById('orderId').innerHTML = myOrderId;
    displayTotalPrice();
});