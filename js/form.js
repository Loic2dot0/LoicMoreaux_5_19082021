var regexText =  new RegExp(/^[\w\s-']+$/g);
var regexTextOnly = new RegExp(/^[a-zA-Z\s-']+$/g);
var regexEmail = new RegExp(/^[\w-\.]+@[a-zA-Z-0-9-]+\.[a-zA-Z]{2,6}$/g); // /^.+@.+\..+$/g
var regexZip = new RegExp(/^\d{5}$/g);

var contact = {
    firstName: null,
    lastName: null,
    address: null,
    city: null,
    email: null,
    zip: null
}

const idFirstname = "firstName";
const idLastname = "lastName";
const idEmail = "email";
const idAddress = "address";
const idCity = "city";
const idZip = "zip";


function verifyInput(idInput, regex){
    let input = document.getElementById(idInput);
    let valueInput = input.value;
    removeErrorMessage("div" +idInput);
    
    if(valueInput.match(regex)){
        input.style.border = "solid 3px #c3e6cb";
        contact[idInput] = valueInput;
        debug && console.log(contact);
        return true;      
    }
    else{
        input.style.border = "solid 3px #f5c6cb";
        errorMessage("div" +idInput, "Ce champs est vide ou incorrect !");
        return false;
    }
}


function send(){
    debug && console.log(products);
    debug && console.log(contact);
    debug && console.log(JSON.stringify({contact: contact, products: products }));

    fetch("http://localhost:3000/api/cameras/order", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({contact: contact, products: products })
    })
    .then(function(res){
        if(res.ok){
            return res.json();
        }
    })
    .then(function(value){
        let validOrder = JSON.stringify(value);
        myBasket.setItem("order", validOrder);
        document.getElementById("form").submit(); //on soumet le formulaire
    })
    .catch(function(err) {
        debug && console.log('catch erreur : ');
        console.log(err);
    });
}


function listener() // fonction d'écoute des évènement sur le formulaire
{   
    document.getElementById(idFirstname).addEventListener("blur", ()=>{
        verifyInput(idFirstname, regexTextOnly); // appel de la fonction de vérification de l'input
    })
    document.getElementById(idLastname).addEventListener("blur", ()=>{
        verifyInput(idLastname, regexTextOnly);
    })
    document.getElementById(idEmail).addEventListener("blur", ()=>{
        verifyInput(idEmail, regexEmail);
    });
    document.getElementById(idAddress).addEventListener("blur", ()=>{
        verifyInput(idAddress, regexText);
    });
    document.getElementById(idCity).addEventListener("blur", ()=>{
        verifyInput(idCity, regexTextOnly);
    });
    document.getElementById(idZip).addEventListener("blur", ()=>{
        verifyInput(idZip, regexZip);
    });
    
    document.forms[0].addEventListener("submit", (evenement)=> {
        evenement.preventDefault(); // annule le comportement par défaut du formulaire
        if(verifyInput(idFirstname, regexTextOnly) &&
            verifyInput(idLastname, regexTextOnly) &&
            verifyInput(idEmail, regexEmail) &&
            verifyInput(idAddress, regexText) &&
            verifyInput(idCity, regexTextOnly) &&
            verifyInput(idZip, regexZip)){ // si tous les input sont valide
                send(); //appel de la fonction d'envoie
        }
    });    
}


listener();