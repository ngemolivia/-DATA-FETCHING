
let showStorage = JSON.parse(localStorage.getItem("sofa"))
let takeToStorage = []

function displayCart () {

        if(showStorage){
            showStorage;
            takeToStorage = showStorage;
            console.log(takeToStorage);

            document.getElementById("cart__items").innerHTML =  takeToStorage.map((item) =>

            `<section id="cart__items">
                <article class="cart__item" data-id="${item._id}" data-color="${item.couleur}">
                    <div class="cart__item__img">
                        <img src="${item.imageUrl}" alt="${item.altTxt}">
                    </div>
                    <div class="cart__item__content">
                        <div class="cart__item__content__description">
                            <h2>${item.name}</h2>
                            <p>${item.couleur}</p>
                            <p>${item.price}€</p>
                        </div>
                        <div class="cart__item__content__settings">
                            <div class="cart__item__content__settings__quantity">
                                <p>Qté : </p>
                                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantite}">
                            </div>
                            <div class="cart__item__content__settings__delete">
                                <p class="deleteItem">Supprimer</p>
                            </div>
                        </div>
                    </div>
                </article>
            </section>`);

            totalSum();
                
    }
}

displayCart()

//Fonction calculant la somme des quantités et la somme des prix

function totalSum(){
    let prodPrice = [];
    let qtyTotal = [];
    let showQty = document.getElementById('totalQuantity')
    let showPrice = document.getElementById('totalPrice')

    takeToStorage.forEach((e)=>{
        prodPrice.push(e.quantite * e.price)
        qtyTotal.push(e.quantite)
        
        showPrice.innerText = `${eval(prodPrice.join("+"))}`
        showQty.innerText = `${eval(qtyTotal.join("+"))}`
    })
}


function sendData(prenom, nom, adresse, ville, email) {

    fetch('http://192.168.10.31:8000/api/contact', {
        method: 'POST',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            'firstName': prenom,
            'lastName': nom,
            'address': adresse,
            'city': ville,
            'email': email
        })
    })

        .then(response => response.json())

        .then(function (data) {
        })

        .catch(error => console.log(error))
}
 

function send(nameElement, idElement, idError){
    let item = document.getElementById(idElement)
    item.addEventListener('focusout', ()=>{
        var mailReg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

        if(nameElement === "firstName" && (item.value.length < 3 || item.value === "")){
            document.getElementById(idError).innerText = "Veuillez entrer un prenom valide"

        }else if(nameElement === "name" && (item.value.length < 3 || item.value === "")){
            document.getElementById(idError).innerText = "Veuillez entrer un nom valide"
        }else if(nameElement === "address"  && (item.value.length < 3 || item.value === "")){
            document.getElementById(idError).innerText = "Veuillez entrer une adresse valide"
        }else if(nameElement === "city" && (item.value.length < 3 || item.value === "")){
            document.getElementById(idError).innerText = "Veuillez entrer une ville valide"
        }else if(nameElement === "email" ){
            if(!mailReg.test(item.value)){
                document.getElementById(idError).innerText = "Veuillez entrer une adresse email valide"
            }
        }else{
            document.getElementById(idError).innerText = ""
        }
    })

}

let firstName = send('firstName', 'firstName')
    let name = document.getElementById('lastName')
    let addresse = document.getElementById('address')
    let city = document.getElementById('city')
    let email = document.getElementById('email')




