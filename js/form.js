var regexText =  new RegExp('[a-zA-Z0-9]+');
var regexTextOnly = new RegExp('[a-zA-Z]+');
var regexEmail = new RegExp('[a-zA-Z0-9\.-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,6}');
var regexZip = new RegExp('[0-9]{5}');


function verifyInput(idInput, regex){
    let valueInput = document.getElementById(idInput).value;
    debug && console.log("texte : " +valueInput);
    
    if(valueInput.match(regex)){
        debug &&console.log("good");
        return true;
    }
    else{
        debug && console.log("pas good");
        errorMessage("div" +idInput, "Ce champs est vide ou incorrect !");
        return false;
    }
}


function send(){

}


document.forms[0].addEventListener("submit", function(evenement) { 
    verifyInput("firstname", regexTextOnly);
    verifyInput("lastname", regexTextOnly);
    verifyInput("mail", regexEmail);
    verifyInput("address", regexText);
    verifyInput("city",regexTextOnly);
    verifyInput("zip", regexZip);
    
    evenement.preventDefault();
    
});


