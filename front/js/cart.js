import { getCart, saveCart, fetchJson } from './utils.js'

try {
    const cart = getCart()

    const productPromises = cart.reduce((productIds, cartItem) => {
        if (!productIds.includes(cartItem.id)) {
            productIds.push(cartItem.id)
        }
        return productIds
    },[]).map(id => fetchJson(`http://localhost:3000/api/products/${id}`))

    const products = await Promise.all(productPromises)
    console.log(products)

    const section = document.querySelector('#cart__items')
    for (const cartItem of cart) {
        const product = products.find(productCart => cartItem.id === productCart._id)
        console.log(cartItem)
        const template = document.querySelector('#cart').content.cloneNode(true)
        template.querySelector('.productImg').src = product.imageUrl
        template.querySelector('.productImg').alt = product.altTxt
        template.querySelector('.productName').innerText = product.name
        // template.querySelector('.productColor').innerText = color
        template.querySelector('.productPrice').innerText = product.price + " €"
        template.querySelector('.itemQuantity').value = cartItem.quantity
        section.appendChild(template)
    }

totalProduct(cart, products)

} catch (error) {
    console.error(error)
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