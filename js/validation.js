window.addEventListener("load", function() {
    var myOrder = JSON.parse(localStorage.order);
    var myOrderId = myOrder.orderId;
    var myProducts = myOrder.products;
    
    for(let i in myProducts){
        totalBasket += myProducts[i].price;
    }
    
    localStorage.clear();
    products = [];
    basketCount();
    document.getElementById('orderId').innerHTML = myOrderId;
    displayTotalPrice();
});