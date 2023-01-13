
let newData

//Recuperation de l'URL de la page en cours(page produit) et affectation de cette URL dans une variable
let str = window.location.href
let url = new URL(str)
let id = url.searchParams.get("id")
console.log(id)

//function to take single item frm api
function recupSingleItem(){

    fetch("http://localhost:3000/api/products/"+id, {method: 'GET'})
    
    .then(function (response){
        return response.json()
        
    })
    .then(function (data){
        console.log(data)
        
        addToDom(data.imageUrl, data.altTxt, data.name, data.price, data.description, data.colors )
        Titre (data.name)
        newData = data
       
    })

    .catch(function(error){
        console.log(error)
    })


   
}

recupSingleItem()


function Titre (name){
    document.getElementById('titre').innerText = name
}

//function to create dom elements
function addToDom(imageUrl, altTxt, name, price, description, colors ){
    let divimg = document.getElementsByClassName("item__img")[0]

    let image = document.createElement('img')
    image.setAttribute('src', imageUrl)
    image.setAttribute('alt', altTxt)

    divimg.appendChild(image)

    document.getElementById("title").innerText= name

    document.getElementById("price").innerText= price

    document.getElementById("description").innerText= description

    let color = document.getElementById("colors")
    for(couleur of colors)

    {
        let itemcolor = document.createElement("option")
        itemcolor.innerText = couleur

        color.appendChild(itemcolor)
    }
    


}


//function to store in local storage
//const addToCart = (data) =>{

  

    let btn = document.getElementById('addToCart')
    btn.addEventListener('click', ()=>{

        alert ('successfully added!!')

        let kanapStorage = JSON.parse(localStorage.getItem("kanape")) //Variable qui nous permet de consulter le localStorage et prendre un produit (si et seulement si il s'y trouve)
      
        let  colorselect= document.getElementById('colors');
        let itemQuantity = document.getElementById('quantity');

        let qtyColorToObject = []

        const objectAssign = Object.assign({}, newData, {
            couleur :`${ colorselect.value}`,
            quantite :`${itemQuantity.value}`
        })

        qtyColorToObject.push(objectAssign);
        console.log(qtyColorToObject)

        
        if(kanapStorage == null){  //Boucle if qui ajoute grace a la propriété 'Push' les elements de "qtyColorToObject" à "kanapStorage"
            kanapStorage = [];
            kanapStorage.push(objectAssign);

            localStorage.setItem("kanape", JSON.stringify(kanapStorage))  //propriété localStorage qui permet de transformer notre tableau 'kanapStorage' en string (clé/valeur) pour le localStorage
        }else if (kanapStorage !== null) {

            for(let k in qtyColorToObject){

                var qte1 = qtyColorToObject[k].quantite
            }

            for (let i in kanapStorage) {  //Boucle for qui parcourt le localStorage

                if (kanapStorage[i]._id == objectAssign._id && kanapStorage[i].couleur ==  colorselect.value) {  // Boucle if qui nous permet de distinguer deux canapés de même id et de même couleur dans le localStorage 

                    kanapStorage[i].quantite = parseInt(kanapStorage[i].quantite) + parseInt (qte1)

                    return (kanapStorage[i].quantite,
                        localStorage.setItem("kanape", JSON.stringify(kanapStorage)),
                        (kanapStorage = JSON.parse(localStorage.getItem("kanape"))))
                }
            }

            for (var i = 0; i < kanapStorage.length; i++) {
                
                if (kanapStorage[i]._id !== objectAssign._id || kanapStorage[i].couleur !==  colorselect.value) {
                    
                    return (kanapStorage.push(objectAssign),
                        localStorage.setItem("kanape", JSON.stringify(kanapStorage)),
                        (kanapStorage = JSON.parse(localStorage.getItem("kanape"))))
                }   
            }
        }

       

    })


   

