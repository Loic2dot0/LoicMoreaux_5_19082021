myBasket.clear();
basketCount(1);

var myOrder = JSON.parse(myBasket.order);
var myOrderId = myOrder.orderId;
var myProducts = myOrder.Products;

console.log('Order Id : ' + myOrderId);
console.log(myProducts);

document.getElementById('orderId').innerHTML = myOrderId;