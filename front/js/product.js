import {getCart, saveCart, fetchJson} from './utils.js'

try {
    const urlParams = new URLSearchParams(window.location.search)
    const id = urlParams.get('id')
    const product = await fetchJson(`http://localhost:3000/api/products/${id}`)

    // Recupération et affichage des couleurs dns un select
    product.colors.forEach(color => {
        const option = document.createElement('option')
        option.value = color
        option.innerText = color
        document.querySelector('#colors').appendChild(option)
    })

    // Insertion des données dans la page produit
    document.querySelector('#image').src = product.imageUrl
    document.querySelector('#image').alt = product.altTxt
    document.querySelector('#title').innerText = product.name
    document.querySelector('#price').innerText = product.price
    document.querySelector('#description').innerText = product.description

    // Ajout au panier
    document.querySelector('#addToCart').addEventListener('click', () => {
        const cart = getCart()
        let cartItem = cart.find(cartItem => cartItem.id === product._id && cartItem.color === document.querySelector('#colors').value)
        if (!cartItem) {
            cartItem = {
                id: product._id,
                quantity: 0,
                color: document.querySelector('#colors').value
            }
            cart.push(cartItem)
        }
        cartItem.quantity += parseInt(document.querySelector('#quantity').value)
        saveCart(cart)
    })

} catch (error) {
    alert("une erreur s'est produite")
}

