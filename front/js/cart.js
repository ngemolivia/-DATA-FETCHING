

let showStorage = JSON.parse(localStorage.getItem("kanape"))
let collectFromStorage = []
let someProd = []


//fuction to display cart(ie all items added to your cart and stored in local storage)
function displayCart () {

if(showStorage){
    collectFromStorage = showStorage;
    console.log(collectFromStorage);

    document.getElementById("cart__items").innerHTML =  collectFromStorage.map((item) =>

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
                                <input type="number" class="itemQuantity" data-id="${item._id}" data-color="${item.couleur}"    name="itemQuantity" min="1" max="100" value="${item.quantite}">
                            </div>
                            <div class="cart__item__content__settings__delete">
                                <p class="deleteItem"  data-id="${item._id}" data-color="${item.couleur}" name="itemQuantity" min="1" max="100" value="${item.quantite}">Supprimer</p>
                            </div>
                        </div>
                    </div>
                </article>
            </section>`)
   
        }

        totalSum()
        //addQty()
        delItem()
    }   

    displayCart ()


//delete choosen item
    function  delItem(){
       
        let Supprimer = document.querySelectorAll('.deleteItem')
        console.log(Supprimer)

        Supprimer.forEach((del) =>
           del.addEventListener('click', ()=>{
            console.log(del)

            let produit =  collectFromStorage.length
            console.log(produit)

            if(produit == 1 ){

                  alert('votre panier est VIDE!!')
                return localStorage.removeItem("kanape")

            }else{
                someProd = collectFromStorage.filter((elmt) =>{
                    if(
                        del.dataset.id !== elmt._id ||
                        del.dataset.color !== elmt.couleur
                    ){
                        return true
                    }
                   
                })

                console.log(someProd)
                localStorage.setItem("kanape", JSON.stringify(someProd))
                console.log('successful')
               
            }

        })
    )

}   

  

/*
//modify quantity choosen

    function  addQty(){
        let changeqty = document.querySelectorAll('.itemQuantity')
        console.log(changeqty)

        changeqty.forEach((add) =>
        add.addEventListener('change', ()=>{
            console.log(add)


            for(i=0; i< collectFromStorage.length; i++){
                
                if( collectFromStorage[i]._id == add.dataset.id &&
                    collectFromStorage[i].couleur == add.dataset.color )
                    {

                    return (
                             collectFromStorage[i].quantite+
                                console.log('quantite++'),
                                localStorage.setItem("kanape", JSON.stringify( collectFromStorage)),
                         ( collectFromStorage= JSON.parse(localStorage.getItem("kanape")))
                         (document.querySelector('#totalPrice')[i].textcontent = `${collectFromStorage[i].quantite * collectFromStorage[i].price}`
                         )

                    )
                      
                }
                    
            }
            
  
        })
        

        )
    }
*/

   

 //Fonction calculant la somme des quantités et la somme des prix
 function totalSum(){
    let prodPrice = [];
    let prodQty = [];

    let Totalprice = document.getElementById('totalPrice')
    let TotalQty = document.getElementById('totalQuantity')
  

    collectFromStorage.forEach((element)=>{
        prodPrice.push(element.quantite * element.price)
        prodQty.push(element.quantite)

        Totalprice.innerText = `${eval(prodPrice.join("+"))}`
        TotalQty.innerText = `${eval(prodQty.join("+"))}`

    })

 }


//fuction that checks and ensures that a field is well respected

 function checkForm(typeElmt, idElmt, idError){
    let item = document.getElementById(idElmt)
    
    item.addEventListener('focusin', () =>{
        item.style.borderColor = 'black'

       document.getElementById(idError).innerText = "Veuillez entrer les infos valides"
      
    })

    item.addEventListener('focusout', () =>{
        if(typeElmt === 'text'){
            if(item.value.length < 4){
                item.style.borderColor = 'red'

                document.getElementById(idError).innerText = "Veuillez entrer les infos valides"
            }else{
                document.getElementById(idError).innerText = ""
            }

         }else if(typeElmt === 'email'){
            var regexmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
            if(!regexmail.test(item.Value)){
                item.style.borderColor = 'red'

                document.getElementById(idError).innerText = "Veuillez entrer une adresse mail valide"

            }
        } 
          


    })

}

 
 let prenom = checkForm('text', 'firstName', 'firstNameErrorMsg')
 let nom = checkForm('text', 'lastName', 'lastNameErrorMsg')
 let address = checkForm('text', 'address','addressErrorMsg')
 let ville = checkForm('text', 'city','cityErrorMsg')
 let email = checkForm('email','email', 'emailErrorMsg')
 

 //function to post data to the API
//  function sendToApi(prenom, nom, adresse, ville, email){

    
//     let contact = {
//         'firstName': prenom,
//             'lastName': nom,
//             'address': adresse,
//             'city': ville,
//             'email': email
//     }

//     fetch('http://localhost:3000/api/products', {
//         method: 'POST',
//         headers: {
//             "Accept": "application/json",
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(contact)
//     })

//         .then(response => response.json())

//         .then(function (sentdata) {
//             console.log(sentdata)
//         })

//         .catch( function (error){
//             console.log(error)
//         } )
// }
 
// sendToApi()





