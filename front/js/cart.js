import { getCart, saveCart, fetchJson } from './utils.js'

const inputValues = {
    firstName:{
        regEx : new RegExp('^[a-zA-Z][a-zA-Z-]*[a-zA-Z]$'),
        error: 'Veuillez saisir un Prénom valide'
    },
    lastName:{
        regEx : new RegExp('^[a-zA-Z- ]+$'),
        error: 'Veuillez saisir un Nom valide'
    },
    address:{
        regEx : /.{2}/,
        error: 'Veuillez saisir une adresse valide'
    },
    city:{
        regEx : /.{2}/,
        error: 'Veuillez saisir une ville valide'
    },
    email:{
        regEx : /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
        error: 'Veuillez saisir un Email valide'
    }
}

try {
    let cart = getCart()

    const productPromises = cart.reduce((productIds, cartItem) => {
        if (!productIds.includes(cartItem.id)) {
            productIds.push(cartItem.id)
        }
        return productIds
    },[]).map(id => fetchJson(`http://localhost:3000/api/products/${id}`))

    const products = await Promise.all(productPromises)

    const section = document.querySelector('#cart__items')
    for (const cartItem of cart) {
        const product = products.find(productCart => cartItem.id === productCart._id)
        const template = document.querySelector('#cart').content.cloneNode(true)
        template.querySelector('.productImg').src = product.imageUrl
        template.querySelector('.productImg').alt = product.altTxt
        template.querySelector('.productName').innerText = product.name
        template.querySelector('.productPrice').innerText = product.price + " €"
        template.querySelector('.itemQuantity').value = cartItem.quantity
        template.querySelector('.deleteItem').addEventListener('click', (event) =>{
            event.target.closest('.cart__item').remove()
            cart = cart.filter(_cartItem => cartItem !== _cartItem)
            saveCart(cart)
            totalProduct(cart, products)
        })
        section.appendChild(template)
    }

totalProduct(cart, products)

} catch (error) {
    alert("une erreur s'est produite")
}

function totalProduct(cart, products) {
    const quantity = cart.reduce((quantity, cartItem) => quantity + cartItem.quantity, 0)
    document.querySelector('#totalQuantity').innerText = quantity
    const price = cart.reduce((price, cartItem) => {
        const product = products.find(productCart => cartItem.id === productCart._id)
        return price + product.price*cartItem.quantity
        
    }, 0)
    document.querySelector('#totalPrice').innerText = price
}



// Validation du formulaire
const form = document.querySelector('#formValidate')

form.addEventListener('input', function(event) {
    if (verifForm()){
        //On reactive le bouton submit
        document.querySelector('#order').removeAttribute('disabled')
    }
    else{
        document.querySelector('#order').setAttribute('disabled','')
    }
})

form.addEventListener('submit', async function(event) {
    event.preventDefault()
    const data = {
        contact: Object.keys(inputValues).reduce((contact, key) => {
            contact[key] = form[key].value
            return contact
        },{}),
        products: getCart().reduce((products, cartItem) => {
            for (let i = 0; i<cartItem.quantity ;i++){
            products.push(cartItem.id)
            }

            return products
        },[])
    }
    const order = await fetchJson('http://localhost:3000/api/products/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(data)
    })
    document.location.href = `./confirmation.html?orderId=${order.orderId}`
})

function verifForm(){
    //On boucle sur tout les input du form
    return Object.keys(inputValues).every(input => {
        const value = form[input].value
        if(!value.length) return false
        if(!inputValues[input].regEx.test(value)){
            //On affiche un message d'erreur
            document.querySelector(`#${input}ErrorMsg`).innerText = inputValues[input].error
            return false
        }
        else{
            // On efface le message d'erreur
            document.querySelector(`#${input}ErrorMsg`).innerText = ''
            return true
        }
    })
}




