import { getCart, saveCart, fetchJson } from './utils.js'

// RegEx et messages d'erreur
const inputValues = {
    firstName: {
        regEx: new RegExp('^[a-zA-Z][a-zA-Z-]*[a-zA-Z]$'),
        error: 'Veuillez saisir un Prénom valide'
    },
    lastName: {
        regEx: new RegExp('^[a-zA-Z- ]+$'),
        error: 'Veuillez saisir un Nom valide'
    },
    address: {
        regEx: /.{2}/,
        error: 'Veuillez saisir une adresse valide'
    },
    city: {
        regEx: /.{2}/,
        error: 'Veuillez saisir une ville valide'
    },
    email: {
        regEx: /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
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
    }, []).map(id => fetchJson(`http://localhost:3000/api/products/${id}`))

    const products = await Promise.all(productPromises)

    const section = document.querySelector('#cart__items')
    for (const cartItem of cart) {
        const product = products.find(productCart => cartItem.id === productCart._id)
        const template = document.querySelector('#cart').content.cloneNode(true)
        template.querySelector('.productImg').src = product.imageUrl
        template.querySelector('.productImg').alt = product.altTxt
        template.querySelector('.productName').innerText = product.name
        template.querySelector('.productColor').innerText = cartItem.color
        template.querySelector('.productPrice').innerText = product.price + " €"
        template.querySelector('.itemQuantity').value = cartItem.quantity
        // Modification des quantités
        template.querySelector('.itemQuantity').addEventListener('change', (event) => {
            cartItem.quantity = parseInt(event.target.value)
            saveCart(cart)
            totalProduct(cart, products)
        })
        template.querySelector('.deleteItem').addEventListener('click', (event) => {
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

// Calcul du montant et des quantités
function totalProduct(cart, products) {
    const quantity = cart.reduce((quantity, cartItem) => quantity + cartItem.quantity, 0)
    document.querySelector('#totalQuantity').innerText = quantity
    const price = cart.reduce((price, cartItem) => {
        const product = products.find(productCart => cartItem.id === productCart._id)
        return price + product.price * cartItem.quantity

    }, 0)
    document.querySelector('#totalPrice').innerText = price
}

// Activation/Desactivation du bouton commander
const form = document.querySelector('#formValidate')

form.addEventListener('input', function (event) {
    if (verifForm()) {
        //On reactive le bouton submit
        document.querySelector('#order').removeAttribute('disabled')
    }
    else {
        //On desactive le bouton submit
        document.querySelector('#order').setAttribute('disabled', '')
    }
})

// Envoi du formulaire
form.addEventListener('submit', async function (event) {
    event.preventDefault()
    const data = {
        contact: Object.keys(inputValues).reduce((contact, key) => {
            contact[key] = form[key].value
            return contact
        }, {}),
        products: getCart().reduce((products, cartItem) => {
            for (let i = 0; i < cartItem.quantity; i++) {
                products.push(cartItem.id)
            }

            return products
        }, [])
    }

    // Génération d'un id de commande
    const order = await fetchJson('http://localhost:3000/api/products/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    document.location.href = `./confirmation.html?orderId=${order.orderId}`
})

// Validation du formulaire
function verifForm() {
    //On boucle sur tout les input du form
    return Object.keys(inputValues).every(input => {
        const value = form[input].value
        if (!value.length) return false
        if (!inputValues[input].regEx.test(value)) {
            //On affiche un message d'erreur
            document.querySelector(`#${input}ErrorMsg`).innerText = inputValues[input].error
            return false
        }
        else {
            // On efface le message d'erreur
            document.querySelector(`#${input}ErrorMsg`).innerText = ''
            return true
        }
    })
}




