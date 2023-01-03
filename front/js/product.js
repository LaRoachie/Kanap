import { getCart, saveCart, fetchJson } from './utils.js'

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
        const quantity = parseInt(document.querySelector('#quantity').value)
        const color = document.querySelector('#colors').value

        if (!color || !quantity) {
            // Affichage d'un message d'erreur
            document.querySelector('.msgError').removeAttribute('hidden')
            return
        }

        const cart = getCart()
        const cartItem = cart.find(cartItem => cartItem.id === product._id && cartItem.color === color)
        if (cartItem) {
            cartItem.quantity += quantity
        }
        else {
            cart.push({
                id: product._id,
                quantity: quantity,
                color: color
            })
        }
        // On efface le message derreur
        document.querySelector('.msgError').setAttribute('hidden', '')
        saveCart(cart)
        // Affichage d'un message d'ajout au panier
        document.querySelector('.msgSuccess').removeAttribute('hidden')
        // Délai avant redirection vers la page panier
        setTimeout(() => {
            document.location.href = `./cart.html`
        }, 2000)
    })

} catch (error) {
    alert("une erreur s'est produite")
}

