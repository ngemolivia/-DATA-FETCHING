

function getData(){  

// get data from api

   fetch("http://localhost:3000/api/products", {method: 'GET'})
   .then(function (response){
       return response.json()
   })
   .then(function (data){
         for(let item of data){
          addElementToDom(item._id, item.imageUrl,   item.altTxt,  item.name,  item.description)
         }
    })

   .catch(function(error){

   })
}

// call the function that gets data


// function that adds elements to DOM

function addElementToDom(_id, imageUrl,  altTxt, name, description){

    let itemlink = document.createElement('a')
    itemlink.className = 'itemlinks'
    itemlink.setAttribute('href', "./product.html?id=" +_id)

    let article = document.createElement('article')
    
    let  itemimg= document.createElement('img')
    itemimg.setAttribute('src', imageUrl)
    itemimg.setAttribute('alt', altTxt)
    article.appendChild(itemimg)

    let itemname = document.createElement('h3')
    itemname.className = "productName"
   itemname.innerText = name
   article.appendChild(itemname)

   let itemdescription = document.createElement('p')
   itemdescription.className = "productDescription"
   itemdescription.innerText = description
    article.appendChild(itemdescription)

    itemlink.appendChild(article)

    document.getElementById('items').appendChild(itemlink)


}

getData()

